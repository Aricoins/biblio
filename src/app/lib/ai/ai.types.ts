// src/lib/ai/ai.types.ts
export type KnowledgeChunk = {
    id: string;
    content: string;
    source: string;
    embeddings?: number[];
    metadata?: Record<string, any>;
  };
  
  export type AIConfig = {
    model: string;
    maxTokens: number;
    temperature: number;
    maxContextLength: number;
  };
  
  export type ConversationContext = {
    history: Array<{ role: string; content: string }>;
    currentQuery: string;
  };