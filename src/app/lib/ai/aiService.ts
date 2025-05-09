// src/lib/ai/aiService.ts
import { AIConfig, ConversationContext, KnowledgeChunk } from './ai.types';
import Papa from 'papaparse';

export class AIService {
  private readonly config: AIConfig = {
    model: "deepseek/deepseek-prover-v2:free",
    maxTokens: 3000,
    temperature: 0.7,
    maxContextLength: 5
  };

  async generateResponse(
    context: ConversationContext,
    knowledge: KnowledgeChunk[]
  ): Promise<string> {
    // Obtener conocimiento adicional de ordenanzas
    const ordenanzas = await this.fetchOrdenanzas();
    const combinedKnowledge = [...knowledge, ...ordenanzas];
    
    const relevantKnowledge = await this.findRelevantKnowledge(context.currentQuery, combinedKnowledge);
    const messages = this.buildMessages(context, relevantKnowledge);
    
    return this.queryAIAPI(messages);
  }

  private async fetchOrdenanzas(): Promise<KnowledgeChunk[]> {
    try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRG6dLsp3OS5Yh7KafIfj989OB-kQXxXJdlZ_loCJ1aKk8cBdXddrwCMpnHdtIqtnQidWIjyPsoLynv/pub?output=csv');
      
      if (!response.ok) {
        console.error(`Error fetching ordenanzas: ${response.statusText}`);
        return [];
      }
      
      const csvText = await response.text();
      const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      
      if (result.errors && result.errors.length > 0) {
        console.error('Error parsing CSV:', result.errors);
        return [];
      }

      // Convertir los datos CSV a KnowledgeChunk
      return result.data.map((row: any, index: number) => ({
        id: `ordenanza-${index}`,
        content: `Ordenanza ${row.numero || 'N/D'}: ${row.titulo || 'Sin título'} ${row.descripcion ? `- ${row.descripcion}` : ''} (Fecha: ${row.fecha || 'N/D'})`,
        source: 'Registro de Ordenanzas',
        metadata: { ...row }
      }));
    } catch (error) {
      console.error('Error fetching ordenanzas:', error);
      return [];
    }
  }

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
      content: `Eres un asistente especializado en normativa y proyectos del Concejo Deliberante de Bariloche.
        Usa únicamente la siguiente información oficial:
        ${knowledgeText}
        
        Instrucciones importantes:
        1. Si te preguntan sobre algún tema del que no tienes información específica en los datos proporcionados, indica claramente: "No tengo información suficiente sobre ese tema en la base de datos del Concejo Deliberante"
        2. Sé preciso y cita los numero de norma pero no las fuentes de donde obtienes la información (número de ordenanza, proyecto, etc.)
        3. Organiza tu respuesta de manera estructurada con títulos y subtítulos cuando sea apropiado
        4. Usa lenguaje formal, claro y accesible para el ciudadano promedio`
    };
  }
  
  async queryAIAPI(messages: any[]): Promise<string> {
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
      // Devuelve un mensaje de error amigable en lugar de lanzar una excepción
      return "No pude generar una respuesta. Por favor, intenta nuevamente.";
    }
  }
}