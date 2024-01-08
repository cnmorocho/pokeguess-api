import { Game, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createGame(): Promise<Game> {
  return await prisma.game.create({ data: {} });
}
