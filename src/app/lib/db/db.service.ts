// src/lib/db/db.service.ts
import { PrismaClient } from '@prisma/client';

class DBService {
  private prisma: PrismaClient;
  private static instance: DBService;

  private constructor() {
    this.prisma = new PrismaClient();
    this.setupMiddleware();
  }

  static getInstance(): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance;
  }

  private setupMiddleware() {
    this.prisma.$use(async (params, next) => {
      const start = Date.now();
      const result = await next(params);
      const duration = Date.now() - start;
      console.log(`Query ${params.model}.${params.action} took ${duration}ms`);
      return result;
    });
  }

  async saveInteraction(userInput: string, botReply: string) {
    return this.prisma.message.create({
      data: {
        userInput,
        botReply,
        createdAt: new Date()
      }
    });
  }
}

export const dbService = DBService.getInstance();