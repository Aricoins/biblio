import { KnowledgeLoader } from "../knowledge/knowledgeLoader";
import { AIService } from "../ai/aiService";
import { dbService } from "../db/db.service";
import { KnowledgeChunk } from "../ai/ai.types";

export class ChatService {
  private loader = new KnowledgeLoader();
  private ai = new AIService();

  async ask(
    message: string,
    history: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    // 1. Carga de conocimiento (timeout 5s)
    const knowledge = await Promise.race([
      this.loader.loadKnowledge(),
      new Promise<KnowledgeChunk[]>(res => setTimeout(() => res([]), 5000))
    ]);

    // 2. Llamada a la IA (timeout 25s)
    const reply = await Promise.race([
      this.ai.generateResponse({ currentQuery: message, history }, knowledge),
      new Promise<string>(res => setTimeout(() => res(
        "Disculpa, no pude procesar tu consulta en este momento."
      ), 25000))
    ]);

    // 3. Guardado en BD sin bloquear
    dbService
      .saveInteraction(message, reply)
      .catch(err => console.error("DB error:", err));

    return reply;
  }
}