// src/lib/ai/improved-ai.service.ts
import { AIConfig, ConversationContext, KnowledgeChunk } from './ai.types';

interface AIProvider {
  name: string;
  endpoint: string;
  model: string;
  apiKey: string;
  headers: Record<string, string>;
}

export class ImprovedAIService {
  private readonly providers: AIProvider[] = [
    {
      name: 'OpenRouter',
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      model: 'deepseek/deepseek-chat-v3-0324:free',
      apiKey: process.env.OPENROUTER_API_KEY || '',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'DiBiase.Net Municipal Archive'
      }
    },
    {
      name: 'OpenAI',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo',
      apiKey: process.env.OPENAI_API_KEY || '',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'Anthropic',
      endpoint: 'https://api.anthropic.com/v1/messages',
      model: 'claude-3-haiku-20240307',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      headers: {
        'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    }
  ];

  private readonly config: AIConfig = {
    model: "deepseek/deepseek-chat-v3-0324:free",
    temperature: 0.1,        // Máxima precisión
    maxTokens: 1500,         // Respuestas más completas
    topP: 0.9,               
    frequencyPenalty: 0.5,   
    presencePenalty: 0.3,    
    stopSequences: ["\n\n\n"], // Menos restrictivo
    maxContextLength: 8      // Más contexto histórico
  };

  async generateResponse(
    context: ConversationContext,
    knowledge: KnowledgeChunk[]
  ): Promise<string> {
    const relevantKnowledge = await this.findRelevantKnowledge(context.currentQuery, knowledge);
    const messages = this.buildMessages(context, relevantKnowledge);
    
    // Intentar con múltiples proveedores en orden de preferencia
    for (const provider of this.providers) {
      if (!provider.apiKey) continue;
      
      try {
        console.log(`Attempting to use ${provider.name} for AI response`);
        const response = await this.queryProvider(provider, messages);
        if (response) {
          console.log(`Successfully got response from ${provider.name}`);
          return response;
        }
      } catch (error) {
        console.error(`${provider.name} failed:`, error);
        continue; // Intentar siguiente proveedor
      }
    }
    
    // Si todos los proveedores fallan, usar respuesta de fallback
    return this.getFallbackResponse(context.currentQuery);
  }

  private async queryProvider(provider: AIProvider, messages: any[]): Promise<string | null> {
    const timeoutMs = 20000; // 20 segundos por proveedor
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      let requestBody: any = {
        model: provider.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      };

      // Configuración específica para Anthropic
      if (provider.name === 'Anthropic') {
        requestBody = {
          model: provider.model,
          max_tokens: this.config.maxTokens,
          messages: messages.filter(m => m.role !== 'system'), // Anthropic maneja system messages diferente
          system: messages.find(m => m.role === 'system')?.content || ''
        };
      }

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: provider.headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`${provider.name} API Error (${response.status}): ${errorText}`);
        return null;
      }
      
      const data = await response.json();
      
      // Manejo de respuesta específico por proveedor
      if (provider.name === 'Anthropic') {
        return data.content?.[0]?.text || null;
      } else {
        return data.choices?.[0]?.message?.content || null;
      }
      
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.error(`${provider.name} request timeout`);
      } else {
        console.error(`${provider.name} request failed:`, error);
      }
      return null;
    }
  }

  private getFallbackResponse(query: string): string {
    const fallbackResponses = [
      "Lo siento, estoy experimentando dificultades técnicas en este momento. Por favor, intenta reformular tu pregunta o contáctanos directamente.",
      "El servicio de inteligencia artificial está temporalmente fuera de línea. Para consultas urgentes, por favor comunícate con digestoconcejo@gmail.com.",
      "Estoy teniendo problemas para procesar tu consulta en este momento. Te sugiero intentar nuevamente en unos minutos o contactar a nuestro equipo de soporte."
    ];
    
    // Seleccionar respuesta basada en el contenido de la consulta
    if (query.toLowerCase().includes('urgente') || query.toLowerCase().includes('importante')) {
      return `${fallbackResponses[1]}\n\nTu consulta parece ser importante. Te recomendamos llamar al 442 9100 (días hábiles de 7 a 17h) para asistencia inmediata.`;
    }
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  private async findRelevantKnowledge(
    query: string,
    knowledge: KnowledgeChunk[],
    topN = 15  // Más conocimiento relevante
  ): Promise<KnowledgeChunk[]> {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\W+/).filter(w => w.length > 2);
    
    const getRelevanceScore = (chunk: KnowledgeChunk): number => {
      let score = 0;
      const contentLower = chunk.content.toLowerCase();
      
      // Coincidencias exactas tienen alta prioridad
      if (chunk.metadata?.numero_norma && queryLower.includes(String(chunk.metadata.numero_norma).toLowerCase())) {
        score += 100;
      }
      
      if (chunk.metadata?.numero_proyecto && queryLower.includes(String(chunk.metadata.numero_proyecto).toLowerCase())) {
        score += 100;
      }
      
      // Coincidencias en título
      if (chunk.metadata?.titulo_proyecto) {
        const titulo = String(chunk.metadata.titulo_proyecto).toLowerCase();
        if (titulo.includes(queryLower)) score += 50;
        
        // Coincidencias parciales en título
        queryWords.forEach(word => {
          if (titulo.includes(word)) score += 10;
        });
      }
      
      // Coincidencias en contenido
      queryWords.forEach(word => {
        const wordCount = (contentLower.match(new RegExp(word, 'g')) || []).length;
        score += wordCount * 3;
      });
      
      // Proximidad temporal (dar más peso a documentos recientes)
      if (chunk.metadata?.anio_proyecto) {
        const year = parseInt(String(chunk.metadata.anio_proyecto));
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - year;
        if (yearDiff <= 2) score += 5; // Documentos de últimos 2 años
      }
      
      return score;
    };

    return knowledge
      .map(chunk => ({ chunk, score: getRelevanceScore(chunk) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map(item => item.chunk);
  }

  private buildMessages(
    context: ConversationContext,
    knowledge: KnowledgeChunk[]
  ): Array<{ role: string; content: string }> {
    const systemMessage = this.createSystemMessage(knowledge);
    const history = context.history.slice(-this.config.maxContextLength);
    
    const messages = [systemMessage];
    
    // Agregar historial de conversación
    history.forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    });
    
    // Agregar consulta actual
    messages.push({
      role: 'user',
      content: context.currentQuery
    });
    
    return messages;
  }

  private createSystemMessage(knowledge: KnowledgeChunk[]): { role: string; content: string } {
    const knowledgeText = knowledge
      .slice(0, 10) // Limitar para evitar context overflow
      .map(k => `[${k.source}]\n${k.content}`)
      .join('\n\n---\n\n');
  
    return {
      role: "system",
      content: `Eres "DiBiase IA", el asistente virtual oficial de la Biblioteca y Archivo "Graciela Di Biase" del Concejo Municipal de San Carlos de Bariloche.

MISIÓN:
Proporcionar información precisa y útil sobre documentación municipal, proyectos legislativos, ordenanzas, comunicaciones y servicios del archivo municipal.

CONOCIMIENTO BASE:
${knowledgeText}

DIRECTRICES DE RESPUESTA:

1. IDENTIDAD: Preséntate como asistente de DiBiase.Net

2. PRECISIÓN: 
   - Cita números exactos de normas cuando estén disponibles considerando la propiedad  "numero_norma" de los objetos de conocimiento.
   - Usa títulos de proyectos y ordenanzas cuando estén disponibles considerando la propiedad "titulo_proyecto" de los objetos de conocimiento.
   - Incluye fechas específicas cuando sea posible.
   - Diferencia claramente entre información confirmada y estimaciones.
   - Considera que cuentas con información de proyectos y de normas, pero no todos los proyectos están aprobados y solo son normas (resoluciones, comunicaciones, ordenanzas y declaraciones) los proyectos que fueron aprobados.

3. ESTRUCTURA:
   - Usa títulos y subtítulos para organizar respuestas largas
   - Numera los puntos cuando sea apropiado
   - Incluye información de contacto cuando sea relevante

4. LIMITACIONES:
   - Si no tienes información específica: "No encontré información específica sobre [tema] en mis datos actuales. Te recomiendo contactar directamente a digestoconcejo@gmail.com o al 442 9100 (días hábiles de 7 a 17h) para obtener información actualizada."

5. TONO: Profesional, servicial y accesible

6. CONTEXTO MUNICIPAL:
   - Recuerda que trabajas para el gobierno municipal de Bariloche
   - Enfócate en servicios públicos y transparencia gubernamental
   - Mantén el respeto por los procesos democráticos

7. INFORMACIÓN DE CONTACTO:
   - Email: digestoconcejo@gmail.com
   - Teléfono: 442 9100 (días hábiles de 7 a 17h)
   - Ubicación: Concejo Municipal de San Carlos de Bariloche

Responde de manera clara, precisa y útil.`
    };
  }

  // Método para verificar la salud de los proveedores
  async checkProvidersHealth(): Promise<Record<string, boolean>> {
    const healthStatus: Record<string, boolean> = {};
    
    for (const provider of this.providers) {
      if (!provider.apiKey) {
        healthStatus[provider.name] = false;
        continue;
      }
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(provider.endpoint, {
          method: 'POST',
          headers: provider.headers,
          body: JSON.stringify({
            model: provider.model,
            messages: [{ role: 'user', content: 'test' }],
            max_tokens: 1
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        healthStatus[provider.name] = response.status < 500;
      } catch (error) {
        healthStatus[provider.name] = false;
      }
    }
    
    return healthStatus;
  }
}