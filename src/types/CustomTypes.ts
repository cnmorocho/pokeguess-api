import { Juego, Pista } from "@prisma/client";

export type PokemonDescription = {
  color: string;
  description: string;
  category: string;
};

export type GameStatus = {
  game: Juego,
  hint: Pista,
};
