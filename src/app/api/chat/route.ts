// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

// IMPORTANTE: Declarar esto al inicio del archivo
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Importaciones que podrían causar problemas en build, moverlas dentro de las funciones
// para cargarlas solo cuando se ejecuten realmente
const importDependencies = () => {
  const { KnowledgeLoader } = require('../../lib/knowledge/knowledgeLoader');
  const { AIService } = require('../../lib/ai/aiService');
  const { dbService } = require('../../lib/db/db.service');
  return { KnowledgeLoader, AIService, dbService };
};

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

export async function GET(req: NextRequest) {
  // Comprobación inmediata para el build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([]);
  }

  try {
    // Importaciones dinámicas
    const { dbService } = importDependencies();
    
    // Resto de la lógica GET
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit')) || 20;
    const page = Number(searchParams.get('page')) || 1;

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
}

export async function POST(req: NextRequest) {
  // Comprobación inmediata para el build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ reply: 'Servicio en mantenimiento durante la compilación' });
  }
  
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    // Importaciones dinámicas
    const { KnowledgeLoader, AIService, dbService } = importDependencies();
    
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
      console.error("Error guardando en base de datos:", dbError);
    }

    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error('Error en el endpoint /api/chat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}