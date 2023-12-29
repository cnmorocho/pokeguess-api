import { Request, Response } from 'express';
import * as PokemonService from '../services/pokemonService';

export async function adivinar(req: Request, res: Response): Promise<void> {
  const pokemon = req.query.pokemon as string;
  const resultado = await PokemonService.adivinar(pokemon);
  res.status(200).json(resultado);
}
