import { Juego, Pista } from "@prisma/client";

export type DescripcionPokemon = {
  color: string;
  descripcion: string;
  categoria: string;
};

export type EstadoJuego = {
  infoJuego: Juego,
  pistas: Pista,
};
