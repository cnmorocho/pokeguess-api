import * as JuegoRepository from '../repositories/juegoRepository';
import * as PistaRepository from '../repositories/pistaRepository';
import * as PokemonRepository from '../repositories/pokemonRepository';
import * as PokemonService from '../services/pokemonService';
import { EstadoJuego } from '../types';

export async function iniciar(idJuego?: number): Promise<EstadoJuego> {
  if (idJuego) {

  }
  const nuevoJuego = await JuegoRepository.crear();
  const pokemonDelDia = await PokemonRepository.obtenerDelDia();
  const { id, tipos } = pokemonDelDia;
  const pistas = await PistaRepository.crear(id, String(tipos));
  return {
    infoJuego: nuevoJuego,
    pistas: pistas,
  };
}

async function evaluarRespuesta(idJuego: number) {
  try {
    // const juego = await JuegoRepository.obtenerJuego();
    await PokemonService.adivinar()
  } catch (error) {
    
  }
}
