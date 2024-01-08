// import { createGame } from '../repositories/gameRepository';
// import { createHint } from '../repositories/hintRepository';
// import { getDailyPokemon } from '../repositories/pokemonRepository';
// // import { guessPokemon }from '../services/pokemonService';
// import { GameStatus } from '../types';

// export async function startGame(idJuego?: number): Promise<GameStatus> {
//   // if (idJuego) {
//   // }
//   const nuevoJuego = await createGame();
//   const pokemonDelDia = await getDailyPokemon();
//   const { id, type } = pokemonDelDia;
//   const hint = await createHint(id, String(type));
//   return {
//     game: nuevoJuego,
//     hint: hint,
//   };
}

// async function evaluateAnswer(idJuego: number) {
//   try {
//     // const juego = await JuegoRepository.obtenerJuego();
//     await guessPokemon(idJuego)
//   } catch (error) {

//   }
// }
