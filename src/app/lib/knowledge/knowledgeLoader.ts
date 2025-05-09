// src/lib/knowledge/knowledgeLoader.ts
import fs from 'fs';
import path from 'path';
import { KnowledgeChunk } from '../ai/ai.types';

const KNOWLEDGE_FILES = ['datos.json', 'proyectos.json'];
// Update the KNOWLEDGE_PATHS array to include the location of your JSON files:

const KNOWLEDGE_PATHS = [
  path.join(process.cwd(), 'knowledge'),
  path.join(process.cwd(), 'src', 'data'),
  path.join(process.cwd(), 'src', 'app', 'api', 'chat')
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

  private async loadFile(filename: string): Promise<any> {
    for (const basePath of KNOWLEDGE_PATHS) {
      const filePath = path.join(basePath, filename);
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    }
    throw new Error(`Archivo de conocimiento no encontrado: ${filename}`);
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