import * as JuegoRepository from '../repositories/gameRepository';
import * as PistaRepository from '../repositories/hintRepository';
import { getDailyPokemon } from '../repositories/pokemonRepository';
// import { guessPokemon }from '../services/pokemonService';
import { GameStatus } from '../types';

export async function startGame(idJuego?: number): Promise<GameStatus> {
  if (idJuego) {

  }
  const nuevoJuego = await JuegoRepository.crear();
  const pokemonDelDia = await getDailyPokemon();
  const { id, type } = pokemonDelDia;
  const pistas = await PistaRepository.crear(id, String(type));
  return {
    game: nuevoJuego,
    hint: pistas,
  };
}

// async function evaluateAnswer(idJuego: number) {
//   try {
//     // const juego = await JuegoRepository.obtenerJuego();
//     await guessPokemon(idJuego)
//   } catch (error) {
    
//   }
// }
