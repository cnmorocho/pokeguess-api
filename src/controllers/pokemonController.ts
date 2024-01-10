import { Request, Response } from 'express';
import * as PokemonService from '../services/pokemonService';

export async function guessPokemon(req: Request, res: Response): Promise<void> {
  const pokemon = req.query.pokemon as string;
  const result = await PokemonService.guessPokemon(pokemon);
  res.status(200).json(result);
}
