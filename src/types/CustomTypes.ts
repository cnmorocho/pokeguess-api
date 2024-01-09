import { Hint, Game } from '@prisma/client';

export type PokemonDescription = {
  color: string;
  description: string;
  category: string;
};

export type GameStatus = {
  game: Game;
  hint: Hint;
};
