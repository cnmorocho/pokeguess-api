import { PrismaClient, CaughtPokemon } from '@prisma/client';

const prisma = new PrismaClient();

export async function savePokemon(
  pokemon: CaughtPokemon,
): Promise<CaughtPokemon> {
  return await prisma.caughtPokemon.create({
    data: pokemon,
  });
}

export async function getDailyPokemon(): Promise<CaughtPokemon> {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayDateISOString = todayDate.toISOString();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowDateISOString = tomorrowDate.toISOString();

  return await prisma.caughtPokemon.findFirst({
    where: {
      dateOfCapture: { gte: todayDateISOString, lte: tomorrowDateISOString },
    },
  });
}
