import { Hint, Game } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export type PokemonDescription = {
  color: string;
  description: string;
  category: string;
};

export type GameStatus = {
  game: Game;
  hint: Hint;
};

export type RequestValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
