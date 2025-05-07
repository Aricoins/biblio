// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { KnowledgeLoader } from '../../lib/knowledge/knowledgeLoader';
import { AIService } from '../../lib/ai/aiService';
import { dbService } from '../../lib/db/db.service';

export const POST = async (req: NextRequest) => {
  try {
    const { message, history = [] } = await req.json();
    
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
    await dbService.saveInteraction(message, reply);

    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error('Error en el endpoint /api/chat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
};