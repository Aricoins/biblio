// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { KnowledgeLoader } from '../../lib/knowledge/knowledgeLoader';
import { AIService } from '../../lib/ai/aiService';
import { dbService } from '../../lib/db/db.service';
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Para ISR
export interface Knowledge {
  id: number;
  titulo?: string;
  descripcion?: string;
  numero_proyecto?: string;
  anio_proyecto?: string;
  tipo_proyecto?: string;
  autor?: string[] | string;
  observaciones?: string;
  [key: string]: any;
}
export const GET = async (req: NextRequest) => {
  try {
    // Evitar ejecución durante el build
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json([]);
    }

    // Obtener parámetros de paginación
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit')) || 20;
    const page = Number(searchParams.get('page')) || 1;

    // Obtener historial de la base de datos
    const history = await dbService.getInteractions({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { timestamp: 'desc' }
    });

    return NextResponse.json({
      data: history,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(history.length / limit),
        totalItems: await dbService.getTotalInteractions()
      }
    });

  } catch (error) {
    console.error('Error obteniendo historial:', error);
    return NextResponse.json(
      { error: 'Error al obtener el historial de conversaciones' },
      { status: 500 }
    );
  }
};


export const POST = async (req: NextRequest) => {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ reply: 'Servicio en mantenimiento' });
  }
  try {
    const { message, history = [] } = await req.json();
      if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ reply: 'Servicio en mantenimiento' });
  }
    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    // Cargar conocimiento
    const knowledgeLoader = new KnowledgeLoader();
    const knowledge = await knowledgeLoader.loadKnowledge();
    
    // Generar respuesta
    const aiService = new AIService();
    const context = {
      currentQuery: message,
      history: history
    };
    
    const reply = await aiService.generateResponse(context, knowledge);
    
    // Guardar en base de datos
    try {
      await dbService.saveInteraction(message, reply);
    } catch (dbError) {
      // Si falla la BD, aún devolvemos la respuesta pero logueamos el error
      console.error("Error guardando en base de datos:", dbError);
      // Continúa la ejecución - no queremos que el usuario no reciba respuesta
    }

    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error('Error en el endpoint /api/chat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
};