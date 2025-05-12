// src/lib/db/db.service.ts
import { PrismaClient } from '@prisma/client';
import { prisma } from './prisma';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};
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

  async getInteractions(options?: {
    skip?: number;
    take?: number;
    orderBy?: Record<string, 'asc' | 'desc'>;
  }) {
    return this.prisma.message.findMany({
      skip: options?.skip,
      take: options?.take,
      orderBy: options?.orderBy,
      select: {
        id: true,
        userInput: true,
        botReply: true,
        createdAt: true
      }
    });
  }

  async getTotalInteractions() {
    return this.prisma.message.count();
  }
}

// Función helper para reintentar operaciones de BD
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Intento ${attempt + 1} fallido:`, error);
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

export const dbService = DBService.getInstance();