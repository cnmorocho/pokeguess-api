import { Game, Hint } from '@prisma/client';
import { createNewGame, getGameById, updateGameById } from '../repositories/gameRepository';
import { createHint, getHintByGameId } from '../repositories/hintRepository';
import { getDailyPokemon } from '../repositories/pokemonRepository';
import { GameStatus } from '../types';
import { updateHint } from './hintService';

export async function playGame(pokemon: string, gameId?: number): Promise<GameStatus> {
  const dailyPokemon = await getDailyPokemon();
  if (!gameId) {
    return await startNewGame(pokemon);
  }
  const game: Game = await getGameById(gameId);
  const hint: Hint = await getHintByGameId(gameId);
  const { id, tries } = game;
  if (tries > 6) {
    return await updateToFinishedGame(id, hint);
  }
  if (game.isFinished) return { game, hint };
  if (dailyPokemon.name === pokemon) {
    return await updateToWonGame(id, tries + 1, hint);
  }
  const updatedHint: Hint = await updateHint(hint.id, tries + 1);
  const updatedGame: Game = await updateGameById(id, { tries: tries + 1 });
  return { game: updatedGame, hint: updatedHint };
}

async function startNewGame(pokemon: string): Promise<GameStatus> {
  const dailyPokemon = await getDailyPokemon();
  const game: Game = await createNewGame();
  const { type } = dailyPokemon;
  const { id, tries } = game;
  if (dailyPokemon.name === pokemon){
    return await updateToWonGame(id, tries);
  }
  const updatedGame: Game = await updateGameById(id, { tries: tries + 1 });
  const createdHint: Hint = await createHint(id, String(type));
  return { game: updatedGame, hint: createdHint };
}

async function updateToWonGame(id: number, tries: number, hint?: Hint): Promise<GameStatus> {
  const updatedGame: Game = await updateGameById(id, { isFinished: true, won: true, tries: tries });
  return {
    game: updatedGame,
    hint: hint ?? {} as Hint,
  }
}

async function updateToFinishedGame(id: number, hint: Hint): Promise<GameStatus> {
  const updatedGame: Game = await updateGameById(id, { isFinished: true });
  return {
    game: updatedGame,
    hint: hint,
  }
}