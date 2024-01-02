import { PrismaClient, PokemonAtrapado } from '@prisma/client';

const prisma = new PrismaClient();

export async function guardar(
  pokemon: PokemonAtrapado,
): Promise<PokemonAtrapado> {
  return await prisma.pokemonAtrapado.create({
    data: pokemon,
  });
}

export async function obtenerDelDia(): Promise<PokemonAtrapado> {
  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);
  const fechaHoyISOString = fechaHoy.toISOString();
  const fechaManana = new Date(fechaHoy);
  fechaManana.setDate(fechaManana.getDate() + 1);
  const fechaMananaISOString = fechaManana.toISOString();

  return await prisma.pokemonAtrapado.findFirst({
    where: { fecha: { gte: fechaHoyISOString, lte: fechaMananaISOString } },
  });
}
