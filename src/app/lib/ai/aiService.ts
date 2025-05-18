// src/lib/ai/aiService.ts
import { AIConfig, ConversationContext, KnowledgeChunk } from './ai.types';
import Papa from 'papaparse';

export class AIService {
  private readonly config: AIConfig = {
  model: "deepseek/deepseek-chat-v3-0324:free",
  temperature: 0.1,        // Máxima precisión
  maxTokens: 1000,         // Respuestas concisas pero completas
  topP: 0.9,               // Balance entre creatividad y control
  frequencyPenalty: 0.5,   // Reduce repeticiones
  presencePenalty: 0.3,    // Evita divagaciones
  stopSequences: ["\n\n"], // Detiene generación en párrafos
  maxContextLength: 5      // Mantiene foco en última consulta
};


  async generateResponse(
    context: ConversationContext,
    knowledge: KnowledgeChunk[]
  ): Promise<string> {
   const combinedKnowledge = [...knowledge];
    
    const relevantKnowledge = await this.findRelevantKnowledge(context.currentQuery, combinedKnowledge);
    const messages = this.buildMessages(context, relevantKnowledge);
    
    return this.queryAIAPI(messages);
  }

  // private async fetchOrdenanzas(): Promise<KnowledgeChunk[]> {
  //   try {
  //     const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRG6dLsp3OS5Yh7KafIfj989OB-kQXxXJdlZ_loCJ1aKk8cBdXddrwCMpnHdtIqtnQidWIjyPsoLynv/pub?output=csv');
      
  //     if (!response.ok) {
  //       console.error(`Error fetching ordenanzas: ${response.statusText}`);
  //       return [];
  //     }
      
  //     const csvText = await response.text();
  //     const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      
  //     if (result.errors && result.errors.length > 0) {
  //       console.error('Error parsing CSV:', result.errors);
  //       return [];
  //     }

  //     // Convertir los datos CSV a KnowledgeChunk
  //     return result.data.map((row: any, index: number) => ({
  //       id: `ordenanza-${index}`,
  //       content: `Ordenanza ${row.numero || 'N/D'}: ${row.titulo || 'Sin título'} ${row.descripcion ? `- ${row.descripcion}` : ''} (Fecha: ${row.fecha || 'N/D'})`,
  //       source: 'Registro de Ordenanzas',
  //       metadata: { ...row }
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching ordenanzas:', error);
  //     return [];
  //   }
  // }

  private async findRelevantKnowledge(
    query: string,
    knowledge: KnowledgeChunk[],
    topN = 10  // Aumentado para incluir más contexto
  ): Promise<KnowledgeChunk[]> {
    // Ampliar los sinónimos para incluir términos relacionados a ordenanzas
    const keywordSynonyms: {[key: string]: string[]} = {
      'vertedero': ['basura', 'residuos', 'desechos', 'relleno sanitario', 'disposición final', 'recolección'],
      'ambiente': ['ambiental', 'ecología', 'ecológico', 'naturaleza', 'medioambiente', 'contaminación'],
      'ordenanza': ['norma', 'regulación', 'legislación', 'normativa', 'reglamentación', 'ley municipal'],
      'tasa': ['impuesto', 'tributo', 'arancel', 'contribución', 'tarifa', 'gravamen'],
      'concejo': ['deliberante', 'municipalidad', 'legislativo', 'municipal', 'ayuntamiento'],
    };
    
    const queryLower = query.toLowerCase();
    
    // Función para calcular una puntuación de relevancia
    const getRelevanceScore = (chunk: KnowledgeChunk): number => {
      const contentLower = chunk.content.toLowerCase();
      let score = 0;
      
      // Buscar palabras clave exactas
      for (const keyword of Object.keys(keywordSynonyms)) {
        if (queryLower.includes(keyword)) {
          // Palabra clave exacta en la consulta
          if (contentLower.includes(keyword)) {
            score += 10;
          }
          
          // Sinónimos en el contenido
          for (const synonym of keywordSynonyms[keyword]) {
            if (contentLower.includes(synonym)) {
              score += 5;
            }
          }
        }
      }
      
      // Palabras individuales de la consulta
      const queryWords = queryLower.split(/\W+/).filter(w => w.length > 3);
      for (const word of queryWords) {
        if (contentLower.includes(word)) {
          score += 2;
        }
      }
      
      return score;
    };
    
    // Ordenar por puntuación de relevancia
    return knowledge
      .map(chunk => ({ chunk, score: getRelevanceScore(chunk) }))
      .filter(item => item.score > 0)  // Solo mantener coincidencias
      .sort((a, b) => b.score - a.score)  // Ordenar por puntuación descendente
      .slice(0, topN)  // Limitar a los top N resultados
      .map(item => item.chunk);
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
      content: `Eres "DiBiase IA", asistente virutal en desarrollo de la biblioteca y archivo "Graciela Di Biase" del Concejo Municipal de San Carlos de Bariloche.
  
      FUNCIÓN:
      Dar respuesta fundada a las consultas de los usuarios buscando en los datos información relevante vinculada tanto temáticamente como por proximidad temporal.
      Tu objetivo es ayudar a los usuarios a encontrar información precisa y útil sobre el Concejo Municipal.
      
      CONOCIMIENTOS:
      Usá especialemente esta información para responder a las consultas:
      ${knowledgeText}
      
      DIRECTRICES DE RESPUESTA:
      1. IDENTIDAD: Siempre preséntate como asesor vitual en desarrollo de DibiaseNet.
      2. TONO: Sé cordial, respetuoso y servicial en todo momento.
 3.  Brindá respuestas técnicas precisas, citando números de normas y fechas exactas cuando sea posible.
      5. LIMITACIONES: Si te preguntan sobre un tema del que no tienes información, responde: "No encontré una respuesta adecuada en los datos a los que tengo acceso. Dejanos un correo electrónico y te responderemos a la brevedad. Gracias por tu consulta."
      6. ESTRUCTURA: Organiza tus respuestas con títulos y subtítulos cuando sea apropiado.
      7. CONTACTO: Si te piden más información que no puedes proporcionar, sugiere contactar a digestoconcejo@gmail.com o al teléfono 442 9100 (días hábiles de 7 a 17h).
      8. Revisa tus respuestas antes de enviarlas para asegurarte de que sean claras y útiles.
      Directrices Estrictas de Respuesta:
1. PRIORIDAD ABSOLUTA a coincidencias literales de: 
   - Nombres completos de juntas vecinales 
   - Números exactos de ordenanza
   - Direcciones específicas

2. Estructura Obligatoria:
   [Tipo de Norma] [Número] - [Nombre Exacto]:
   Fecha: [AAAA-MM-DD]
   Norma: [Texto literal relevante]

3. Si hay coincidencia exacta:
   - NO mencionar otros items
   - Citación textual de los 3 artículos más relevantes

4. Sin coincidencias exactas:
   - Listar máx 3 items relacionados
   - Especificar "No se encontró coincidencia exacta" 
         `
    };
  }
 
  async queryAIAPI(messages: any[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('API key no configurada');

  // Set a reasonable timeout (20 seconds)
  const timeoutMs = 50000;
  
  try {
    // Create an AbortController for timeout management
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
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
      signal: controller.signal, // Add the abort signal here
    });
    
    // Clear the timeout as soon as the response is received
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`Error de API: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Respuesta completa de API:", JSON.stringify(data, null, 2));
    
    // Validación adecuada de la respuesta
    if (!data) {
      throw new Error("No se recibió respuesta del API");
    }

    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error("Formato de respuesta inválido");
    }
    
    if (!data.choices[0].message || !data.choices[0].message.content) {
      throw new Error("No se encontró contenido en la respuesta");
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error en AI Service:', error);
    
    // Specific error message for timeout
    if (error instanceof DOMException && error.name === 'AbortError') {
      return "La consulta está tomando más tiempo del esperado. Por favor, intenta una pregunta más específica o contacta a digestoconcejo@gmail.com para asistencia.";
    }
    
    // General error message for other issues
    return "Hemos excedido el limite de uso del LLM gratuito. Por favor, intenta nuevamente más tarde.";
  }
}
}