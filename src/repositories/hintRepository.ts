import { Hint, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createHint(
  gameId: number,
  firstHint: string,
): Promise<Hint> {
  return await prisma.hint.create({
    data: {
      type: firstHint,
      gameId: gameId,
    },
  });
}

export async function getHintByGameId(gameId: number): Promise<Hint> {
  return await prisma.hint.findUnique({ where: { gameId: gameId } });
}

export async function updateHintById(
  id: number,
  game: Partial<Hint>,
): Promise<Hint> {
  return await prisma.hint.update({ data: game, where: { id: id } });
}
