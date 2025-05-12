import { NextRequest, NextResponse } from 'next/server';
import { KnowledgeLoader } from '../../lib/knowledge/knowledgeLoader';
import { AIService } from '../../lib/ai/aiService';
import { dbService } from '../../lib/db/db.service';

// Marcamos la ruta como dinámica - CRUCIAL para evitar errores de compilación
export const dynamic = 'force-dynamic';

// No se necesita inicializar DB - la clase DBService ya se inicializa
// cuando se importa por primera vez
let dbInitialized = true; // Cambiado a true directamente

export async function GET(req: NextRequest) {
  // Evitamos accesos a DB durante la fase de build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({
      data: [],
      pagination: { currentPage: 1, totalPages: 0, totalItems: 0 }
    });
  }
  
  try {
    // Eliminamos la llamada a initializeDB ya que no es necesaria
    
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit')) || 20;
    const page = Number(searchParams.get('page')) || 1;

    // Tratamos de obtener los datos con manejo de errores adicional
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
  // Evitamos accesos a DB durante la fase de build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ reply: "Esta es una respuesta de compilación" });
  }
  
  try {
    const body = await req.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    const knowledgeLoader = new KnowledgeLoader();
    const aiService = new AIService();
    
    try {
      const knowledge = await knowledgeLoader.loadKnowledge();
      const reply = await aiService.generateResponse({
        currentQuery: body.message,
        history: body.history || []
      }, knowledge);

      // Capturamos errores específicamente de la base de datos
      try {
        await dbService.saveInteraction(body.message, reply);
      } catch (dbError) {
        console.error("Error saving to database:", dbError);
        // Continuamos aunque falle el guardado
      }

      return NextResponse.json({ reply });
    } catch (processingError) {
      console.error("Error processing message:", processingError);
      return NextResponse.json(
        { error: 'Error procesando mensaje' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Error procesando solicitud' },
      { status: 500 }
    );
  }
}