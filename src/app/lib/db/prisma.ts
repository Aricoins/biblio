import { PrismaClient, Prisma } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaOptions: Prisma.PrismaClientOptions = {
  log: [
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' }
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
};

// Crear o reutilizar la instancia de PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

// Guardar en global solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}