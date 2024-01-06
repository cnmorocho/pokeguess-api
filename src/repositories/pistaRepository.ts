import { Pista, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function crear(
  idJuego: number,
  pistaInicial: string,
): Promise<Pista> {
  return await prisma.pista.create({
    data: {
      tipo: pistaInicial,
      idJuego: idJuego,
    },
  });
}
