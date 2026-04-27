import { PrismaClient } from '@prisma/client';

// Esto evita que TypeScript se queje de la variable global
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Exportamos todo lo demás (tipos de modelos, enums, etc.)
export * from '@prisma/client';
