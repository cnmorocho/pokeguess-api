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
