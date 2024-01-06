import { Request, Response } from 'express';
import * as JuegoService from '../services/juegoService';

export async function iniciar(_req: Request, res: Response): Promise<void> {
  const nuevoJuego = await JuegoService.iniciar();
  res.status(200).json(nuevoJuego);
}
