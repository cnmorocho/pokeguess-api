import { NextFunction, Request, Response } from 'express';
import * as PokemonService from '../services/pokemonService';

export async function guessPokemon(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const pokemon = req.query.pokemon as string;
    const result = await PokemonService.guessPokemon(pokemon);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
