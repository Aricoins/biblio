import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { KnowledgeLoader } from '../../lib/knowledge/knowledgeLoader';
import { ImprovedAIService } from '../../lib/ai/improved-ai.service';
import { ChatMessageSchema, PaginationSchema } from '../../lib/validation/schemas';
import { validateData, handleError } from '../../lib/validation/middleware';
import { dbService } from '../../lib/db/db.service';

// Configuración de la ruta
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;
  
// GET: Obtener historial de chat con autenticación opcional
export async function GET(req: NextRequest) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({
      data: [],
      pagination: { currentPage: 1, totalPages: 0, totalItems: 0 }
    });
  }

  return validateData(PaginationSchema)(req, async (req, paginationData) => {
    try {
      // Obtener usuario autenticado (opcional para el historial)
      const { userId } = await auth();
      
      const limit = paginationData.limit ?? 10;
      const [history, total] = await Promise.all([
        dbService.getInteractions({
          skip: ((paginationData.page ?? 1) - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          userId: userId || undefined // Solo mostrar historial del usuario si está autenticado
        }),
        dbService.getTotalInteractions(userId || undefined)
      ]);

      return NextResponse.json({
        data: history,
        pagination: {
          currentPage: paginationData.page,
          totalPages: Math.ceil(total / (paginationData.limit ?? 10)),
          totalItems: total
        }
      });
    } catch (error) {
      return handleError(error, 'ChatHistoryGet');
    }
  });
}

// POST: Enviar mensaje al chat con validación y autenticación opcional
export async function POST(req: NextRequest) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ reply: "Esta es una respuesta de compilación" });
  }

  return validateData(ChatMessageSchema)(req, async (req, validatedData) => {
    try {
      // Obtener usuario autenticado (opcional)
      const { userId } = await auth();
      
      const knowledgeLoader = new KnowledgeLoader();
      const aiService = new ImprovedAIService();
      
      // Cargar conocimiento con timeout y manejo de errores
      let knowledge = [];
      try {
        const knowledgePromise = knowledgeLoader.loadKnowledge();
        const timeoutPromise = new Promise<any[]>((resolve) => 
          setTimeout(() => {
            console.log("Knowledge loading timeout - using empty knowledge");
            resolve([]);
          }, 10000) // 10 segundos timeout para conocimiento
        );
        
        knowledge = await Promise.race([knowledgePromise, timeoutPromise]);
      } catch (knowledgeError) {
        console.error("Error loading knowledge:", knowledgeError);
        // Continuar con conocimiento vacío
      }

      // Generar respuesta de AI con timeout
      const aiTimeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('AI request timeout')), 25000) // 25 segundos
      );

      try {
        const replyPromise = aiService.generateResponse({
          currentQuery: validatedData.message,
          history: validatedData.history || []
        }, knowledge);

        const reply = await Promise.race([replyPromise, aiTimeoutPromise]);

        // Guardar interacción en base de datos (sin bloquear respuesta)
        if (reply) {
          dbService.saveInteraction(validatedData.message, String(reply), userId || undefined)
            .catch(dbError => console.error("Error saving interaction:", dbError));
        }

        return NextResponse.json({ 
          reply,
          timestamp: new Date().toISOString(),
          userId: userId || null
        });

      } catch (aiError) {
        console.error("AI Service Error:", aiError);
        
        let errorReply = "Disculpa, no pude procesar tu consulta en este momento. Por favor intenta nuevamente.";
        
        if (aiError instanceof Error && aiError.message === 'AI request timeout') {
          errorReply = "Lo siento, estoy tardando más de lo esperado en procesar tu consulta. Por favor, intenta una pregunta más específica o contáctanos por correo a digestoconcejo@gmail.com.";
        }
        
        // Guardar el error también para análisis
        dbService.saveInteraction(validatedData.message, `[ERROR] ${errorReply}`, userId || undefined)
          .catch(dbError => console.error("Error saving error interaction:", dbError));
        
        return NextResponse.json({ 
          reply: errorReply,
          error: true,
          timestamp: new Date().toISOString()
        });
      }

    } catch (error) {
      return handleError(error, 'ChatPost');
    }
  });
}