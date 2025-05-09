import { PrismaClient } from '@prisma/client';

// Prevenir múltiples instancias de PrismaClient en desarrollo
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Opciones para mayor estabilidad
const prismaOptions = {
  log: ['error', 'warn'],
  connectionTimeout: 20000, // 20 segundos
};

// Crear o reutilizar la instancia de PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

// Guardar en global solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}