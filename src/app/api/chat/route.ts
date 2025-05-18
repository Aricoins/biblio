import { NextRequest, NextResponse } from 'next/server';
import { KnowledgeLoader } from '../../lib/knowledge/knowledgeLoader';
import { AIService } from '../../lib/ai/aiService';

// Marcamos la ruta como dinámica
export const dynamic = 'force-dynamic';

export const runtime = 'nodejs'; // o 'edge' si prefieres
export const maxDuration = 30; // Aumentar tiempo disponible

// Importación condicional para evitar que Prisma se inicialice durante la compilación
async function getDbService() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {
      getInteractions: async () => [],
      getTotalInteractions: async () => 0,
      saveInteraction: async () => null
    };
  }
  try {
    const { dbService } = await import('../../lib/db/db.service');
    return dbService;
  } catch (error) {
    console.error('Error al importar dbService:', error);
    return {
      getInteractions: async () => [],
      getTotalInteractions: async () => 0,
      saveInteraction: async () => null
    };
  }
}
  
export async function GET(req: NextRequest) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({
      data: [],
      pagination: { currentPage: 1, totalPages: 0, totalItems: 0 }
    });
  }
  
  try {
    const dbService = await getDbService();
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit')) || 20;
    const page = Number(searchParams.get('page')) || 1;

    try {
      const [history, total] = await Promise.all([
        dbService.getInteractions({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        dbService.getTotalInteractions()
      ]);

      return NextResponse.json({
        data: history,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total
        }
      });
    } catch (dbError) {
      console.error("Error accessing database:", dbError);
      return NextResponse.json({
        data: [],
        pagination: { currentPage: 1, totalPages: 0, totalItems: 0 }
      });
    }
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener historial' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ reply: "Esta es una respuesta de compilación" });
  }
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('AI request timeout')), 500000)
  );
  try {
    const body = await req.json();
    
    if (!body.message) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const knowledgeLoader = new KnowledgeLoader();
    const aiService = new AIService();
  // Cargar el conocimiento con manejo de errores independiente
    let knowledge = [];
    try {
      knowledge = await Promise.race([
        knowledgeLoader.loadKnowledge(),
        new Promise((resolve) => setTimeout(() => {
          console.log("Knowledge loading timeout - using empty knowledge");
          resolve([]);
        }, 500000))
      ]) as any[];
    } catch (knowledgeError) {
      console.error("Error loading knowledge:", knowledgeError);
      // Continuar con conocimiento vacío
    }

    // Generar respuesta con timeout más largo
    try {
      const replyPromise = aiService.generateResponse({
        currentQuery: body.message,
        history: body.history || []
      }, knowledge);

      // Si tenemos respuesta antes del timeout, úsala
      const reply = await Promise.race([replyPromise, timeoutPromise]);

      // Guardar en DB sin bloquear respuesta
      const dbService = await getDbService();
      dbService.saveInteraction(body.message, String(reply))
        .catch(dbError => console.error("Error saving to database:", dbError));

      return NextResponse.json({ reply });
    } catch (aiError) {
      console.error("AI Error:", aiError);
      
      // Si el error es timeout, dar respuesta predefinida
      if (aiError instanceof Error && aiError.message === 'AI request timeout') {
        return NextResponse.json({
          reply: "Lo siento, estoy tardando más de lo esperado en procesar tu consulta. Por favor, intenta una pregunta más específica o contáctanos por correo a digestoconcejo@gmail.com."
        });
      }
      
      return NextResponse.json(
        { reply: "Disculpa, no pude procesar tu consulta en este momento. Por favor intenta nuevamente." },
        { status: 200 } // Usar 200 para que el cliente lo maneje adecuadamente
      );
    }
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { reply: "Hubo un problema técnico. Por favor, intenta nuevamente en unos momentos." },
      { status: 200 } // Usar 200 en lugar de 500 para que el cliente maneje mejor
    );
  }
}