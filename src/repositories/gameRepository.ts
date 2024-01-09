import { Game, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNewGame(): Promise<Game> {
  return await prisma.game.create({ data: { tries: 1} });
}

export async function updateGameById(id: number, game: Partial<Game>): Promise<Game> {
  return await prisma.game.update({ data: game, where: { id: id }  })
}

export async function getGameById(id: number): Promise<Game> {
  return await prisma.game.findUnique({ where: { id: id} });
}
