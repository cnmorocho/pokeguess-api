import { Juego, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function crear(): Promise<Juego> {
  return await prisma.juego.create({ data: {} });
}
