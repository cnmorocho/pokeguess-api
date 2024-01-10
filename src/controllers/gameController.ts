import { Request, Response } from 'express';
import * as GameService from '../services/gameService';

export async function playGame(req: Request, res: Response): Promise<void> {
  const { pokemon, gameId } = req.query;
  const nuevoJuego = await GameService.playGame(
    String(pokemon),
    Number(gameId),
  );
  res.status(200).json(nuevoJuego);
}
