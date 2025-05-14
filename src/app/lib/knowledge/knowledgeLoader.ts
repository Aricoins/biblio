// src/lib/knowledge/knowledgeLoader.ts
import fs from 'fs';
import path from 'path';
import { KnowledgeChunk } from '../ai/ai.types';

const KNOWLEDGE_FILES = ['datos.json', 'proyectos.json'];
// Update the KNOWLEDGE_PATHS array to include the location of your JSON files:

const KNOWLEDGE_PATHS = [
  path.join(process.cwd(), 'knowledge'),
  path.join(process.cwd(),  'data'),
  path.join(process.cwd(),  'chat')
];

export class KnowledgeLoader {
  private cache: KnowledgeChunk[] = [];
  private lastLoaded: Date | null = null;

  async loadKnowledge(): Promise<KnowledgeChunk[]> {
    if (this.isBuildPhase()) return [];
    if (this.isCacheValid()) return this.cache;

    const loadedData: KnowledgeChunk[] = [];
    
    for (const file of KNOWLEDGE_FILES) {
      const content = await this.loadFile(file);
      if (content) {
        loadedData.push(...this.processContent(content, file));
      }
    }

    this.cache = loadedData;
    this.lastLoaded = new Date();
    return this.cache;
  }

  private async loadFile(fileName: string): Promise<KnowledgeChunk[]> {
    for (const basePath of KNOWLEDGE_PATHS) {
      const filePath = path.join(basePath, fileName);
      try {
        if (fs.existsSync(filePath)) {
          console.log(`Cargando conocimiento desde: ${filePath}`);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return Array.isArray(data) ? data : [data];
        }
      } catch (error) {
        console.warn(`Error al intentar leer ${filePath}:`, error);
      }
    }
    
    // Maneja el caso donde no se encuentra el archivo de manera más elegante
    console.warn(`Archivo de conocimiento no encontrado: ${fileName}`);
    return []; // Devuelve un array vacío en lugar de fallar
  }

  private processContent(content: any, source: string): KnowledgeChunk[] {
    if (!Array.isArray(content)) content = [content];
    interface KnowledgeItem {
        [key: string]: any;
    }

    interface ProcessedKnowledgeChunk extends KnowledgeChunk {
        id: string;
        content: string;
        source: string;
        metadata: KnowledgeItem;
    }

            return content.map((item: KnowledgeItem, index: number): ProcessedKnowledgeChunk => ({
                id: `${source}-${index}-${Date.now()}`,
                content: JSON.stringify(item),
                source,
                metadata: item
            }));
  }

  private isCacheValid(): boolean {
    return this.lastLoaded !== null && 
      (Date.now() - this.lastLoaded.getTime()) < 1000 * 60 * 5; 
  }

  private isBuildPhase(): boolean {
    return process.env.NODE_ENV === 'production';
  }
}