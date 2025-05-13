import { NextRequest, NextResponse } from 'next/server';
import { KnowledgeLoader } from '../../lib/knowledge/knowledgeLoader';
import { AIService } from '../../lib/ai/aiService';

// Marcamos la ruta como dinámica
export const dynamic = 'force-dynamic';

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
  
  try {
    const body = await req.json();
    
    if (!body.message) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const knowledgeLoader = new KnowledgeLoader();
    const aiService = new AIService();
    const dbService = await getDbService();
    
    try {
      const knowledge = await knowledgeLoader.loadKnowledge();
      const reply = await aiService.generateResponse({
        currentQuery: body.message,
        history: body.history || []
      }, knowledge);

      try {
        await dbService.saveInteraction(body.message, reply);
      } catch (dbError) {
        console.error("Error saving to database:", dbError);
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