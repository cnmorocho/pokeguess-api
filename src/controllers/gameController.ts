import { Request, Response } from 'express';
import * as JuegoService from '../services/gameService';

export async function startGame(_req: Request, res: Response): Promise<void> {
  const nuevoJuego = await JuegoService.startGame();
  res.status(200).json(nuevoJuego);
}
