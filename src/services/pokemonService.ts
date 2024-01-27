import { PokeIndex, Pokedex } from '../types';
import { getPokemonIdFromPokeapiURL, getRandomItem } from '../utils/functions';
import { getDailyPokemon, savePokemon } from '../repositories/pokemonRepository';
import { CaughtPokemon } from '@prisma/client';
import { FIRST_GENERATION } from '../consts';
import { getPokedexByGeneration, getPokemonInformationById } from '../thirdParty/pokeApiService';

export async function guessPokemon(pokemon: string): Promise<boolean> {
  const dailyPokemon: CaughtPokemon = await getDailyPokemon();
  return dailyPokemon.name === pokemon;
}

export async function catchPokemon(): Promise<CaughtPokemon> {
  const pokedex: Pokedex = await getPokedexByGeneration(FIRST_GENERATION);

  const caughtPokemonIndex: PokeIndex = getRandomItem(pokedex.results);

  const { url } = caughtPokemonIndex;

  const pokemonId: number = getPokemonIdFromPokeapiURL(url);

  const pokemonInformation = await getPokemonInformationById(pokemonId);

  return await savePokemon(pokemonInformation);
}

export async function init(): Promise<void> {
  console.info('Verifying Daily Pokemon existence...');
  const dailyPokemon: CaughtPokemon = await getDailyPokemon();
  if (!dailyPokemon) {
    console.info('Daily Pokemon not found.');
    console.info('Catching a pokemon ...');
    await catchPokemon();
  }
  console.info('Starting game...');
}
