// src/lib/ai/aiService.ts
import { AIConfig, ConversationContext, KnowledgeChunk } from './ai.types';

export class AIService {
  private readonly config: AIConfig = {
    model: "openai/gpt-4o",
    maxTokens: 3000,
    temperature: 0.7,
    maxContextLength: 5
  };

  async generateResponse(
    context: ConversationContext,
    knowledge: KnowledgeChunk[]
  ): Promise<string> {
    const relevantKnowledge = await this.findRelevantKnowledge(context.currentQuery, knowledge);
    const messages = this.buildMessages(context, relevantKnowledge);
    
    return this.queryAIAPI(messages);
  }

  private async findRelevantKnowledge(
    query: string,
    knowledge: KnowledgeChunk[],
    topN = 3
  ): Promise<KnowledgeChunk[]> {
    // Implementar lógica de búsqueda semántica aquí
    // Ejemplo temporal: selección simple basada en coincidencia de palabras clave
    const queryKeywords = query.toLowerCase().split(/\W+/);
    
    return knowledge
      .filter(chunk => 
        queryKeywords.some(keyword => 
          chunk.content.toLowerCase().includes(keyword)
        )
      )
      .slice(0, topN);
  }

  private buildMessages(
    context: ConversationContext,
    knowledge: KnowledgeChunk[]
  ): Array<{ role: string; content: string }> {
    const systemMessage = this.createSystemMessage(knowledge);
    const history = context.history.slice(-this.config.maxContextLength);
    
    return [systemMessage, ...history];
  }

  private createSystemMessage(knowledge: KnowledgeChunk[]): { role: string; content: string } {
    const knowledgeText = knowledge
      .map(k => `[Fuente: ${k.source}]\n${k.content}`)
      .join('\n\n');

    return {
      role: "system",
      content: `Eres un asistente experto en la normativa y proyectos del Concejo Deliberante de Bariloche.
        Usa exclusivamente esta información oficial:
        ${knowledgeText}
        
        Reglas:
        1. Si no hay información suficiente, indica que no puedes responder
        2. Cita las fuentes de información relevantes
        3. Sé preciso y usa lenguaje formal pero claro`
    };
  }

  private async queryAIAPI(messages: Array<{ role: string; content: string }>): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('API key no configurada');

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          messages
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error en AI Service:', error);
      throw new Error('Error al generar respuesta');
    }
  }
}