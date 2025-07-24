// src/lib/db/db.service.ts
import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

interface InteractionParams {
  skip?: number;
  take?: number;
  orderBy?: {
    createdAt: "asc" | "desc";
  };
  userId?: string;
}

interface LibroParams {
  skip?: number;
  take?: number;
  orderBy?: {
    fechaCreacion?: "asc" | "desc";
    titulo?: "asc" | "desc";
  };
  where?: {
    creadoPor?: string;
    activo?: boolean;
  };
}

interface CreateLibroData {
  titulo: string;
  autor: string;
  descripcion?: string | null;
  imagen?: string | null;
  creadoPor: string;
  fechaCreacion?: Date;
}

class DBService {
  private prisma: PrismaClient;
  private static instance: DBService;

  private constructor() {
    this.prisma =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: ["query", "info", "warn", "error"],
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = this.prisma;
    }

    this.setupMiddleware();
  }

  static getInstance(): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance;
  }

  private setupMiddleware() {
    this.prisma.$use(
      async (
        params: { model?: string; action: string },
        next: (params: any) => Promise<any>
      ): Promise<any> => {
        const start: number = Date.now();
        const result: any = await next(params);
        const duration: number = Date.now() - start;

        if (duration > 1000) {
          console.warn(
            `Slow query detected: ${params.model}.${params.action} took ${duration}ms`
          );
        }

        return result;
      }
    );
  }

  // Métodos para mensajes/chat
  async getInteractions(params: InteractionParams = {}) {
    const {
      skip = 0,
      take = 20,
      orderBy = { createdAt: "desc" },
      userId,
    } = params;

    return await this.prisma.message.findMany({
      skip,
      take,
      orderBy,
      where: userId ? { userId } : undefined,
      select: {
        id: true,
        userInput: true,
        botReply: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async getTotalInteractions(userId?: string) {
    return await this.prisma.message.count({
      where: userId ? { userId } : undefined,
    });
  }

  async saveInteraction(userInput: string, botReply: string, userId?: string) {
    return await this.prisma.message.create({
      data: {
        userInput,
        botReply,
        userId,
      },
    });
  }

  // Métodos para libros
  async createLibro(data: CreateLibroData) {
    return await this.prisma.libro.create({
      data: {
        titulo: data.titulo,
        autor: data.autor,
        descripcion: data.descripcion,
        imagen: data.imagen,
        creadoPor: data.creadoPor,
        fechaCreacion: data.fechaCreacion || new Date(),
      },
    });
  }

  async getLibros(params: LibroParams = {}) {
    const {
      skip = 0,
      take = 20,
      orderBy = { fechaCreacion: "desc" },
      where = { activo: true },
    } = params;

    return await this.prisma.libro.findMany({
      skip,
      take,
      orderBy,
      where,
      select: {
        id: true,
        titulo: true,
        autor: true,
        descripcion: true,
        imagen: true,
        fechaCreacion: true,
        creadoPor: true,
        activo: true,
      },
    });
  }

  async getLibroById(id: number) {
    return await this.prisma.libro.findUnique({
      where: {
        id,
        activo: true,
      },
    });
  }

  async updateLibro(id: number, data: Partial<CreateLibroData>) {
    return await this.prisma.libro.update({
      where: { id },
      data: {
        ...data,
        fechaActualiz: new Date(),
      },
    });
  }

  async deleteLibro(id: number) {
    // Soft delete
    return await this.prisma.libro.update({
      where: { id },
      data: {
        activo: false,
        fechaActualiz: new Date(),
      },
    });
  }

  async countLibros(
    where: { creadoPor?: string; activo?: boolean } = { activo: true }
  ) {
    return await this.prisma.libro.count({ where });
  }

  // Métodos para proyectos
  async getProyectos(
    params: {
      skip?: number;
      take?: number;
      where?: Prisma.proyectosWhereInput;
      orderBy?: Prisma.proyectosOrderByWithRelationInput;
    } = {}
  ) {
    const {
      skip = 0,
      take = 50,
      where,
      orderBy = { created_at: "desc" },
    } = params;

    return await this.prisma.proyectos.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createProyecto(data: Prisma.proyectosCreateInput) {
    return await this.prisma.proyectos.create({ data });
  }

  async updateProyecto(id: number, data: Prisma.proyectosUpdateInput) {
    return await this.prisma.proyectos.update({
      where: { id },
      data,
    });
  }

  async getProyectoByNumero(numero: string, anio: string) {
    return await this.prisma.proyectos.findFirst({
      where: {
        numero_proyecto: numero,
        anio_proyecto: anio,
      },
    });
  }

  // Método de búsqueda general
  async searchProyectos(
    searchTerm: string,
    options: {
      skip?: number;
      take?: number;
    } = {}
  ) {
    const { skip = 0, take = 20 } = options;

    return await this.prisma.proyectos.findMany({
      skip,
      take,
      where: {
        OR: [
          { titulo_proyecto: { contains: searchTerm, mode: "insensitive" } },
          { numero_proyecto: { contains: searchTerm, mode: "insensitive" } },
          { numero_norma: { contains: searchTerm, mode: "insensitive" } },
          { observaciones: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      orderBy: { created_at: "desc" },
    });
  }

  // Métodos de utilidad
  async healthCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "healthy", timestamp: new Date() };
    } catch (error) {
      return {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

// Función helper para reintentos
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
      console.error(`Database attempt ${attempt + 1} failed:`, error);
      lastError = error;

      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, attempt))
        );
      }
    }
  }

  throw lastError;
}

export const dbService = DBService.getInstance();
export { withRetry };
