import axios, { AxiosResponse } from 'axios';
import {
  PokemonSpecie,
  PokemonDescription,
  PokeIndex,
  Pokedex,
  Pokemon,
} from '../types';
import { getRandomItem } from '../utils/functions';
import { getDailyPokemon, savePokemon, } from '../repositories/pokemonRepository';
import { CaughtPokemon } from '@prisma/client';
import { FIRST_GENERATION } from '../consts';
import environment from '../configuration/environment';

export async function guessPokemon(pokemon: string): Promise<boolean> {
  const dailyPokemon: CaughtPokemon =
    await getDailyPokemon();
  return dailyPokemon.name === pokemon;
}

export async function catchPokemon(): Promise<CaughtPokemon> {
  const res: AxiosResponse<Pokedex> = await axios.get(
    environment.POKEAPI_GET_POKEDEX_URL,
    { params: { limit: FIRST_GENERATION } },
  );

  const caughtPokemonIndex: PokeIndex = getRandomItem(res.data.results);

  const { url } = caughtPokemonIndex;

  const pokemonInformation = await getPokemonInformationByURL(url);

  return await savePokemon(pokemonInformation);
}

export async function init(): Promise<void> {
  console.info('Verifying Daily Pokemon existence...');
  const dailyPokemon: CaughtPokemon =
    await getDailyPokemon();
  if (!dailyPokemon) {
    console.info('Daily Pokemon not found.');
    console.info('Catching a pokemon ...');
    await catchPokemon();
  }
  console.info('Starting game...');
}

async function getPokemonInformationByURL(url: string): Promise<CaughtPokemon> {
  const res: AxiosResponse<Pokemon> = await axios.get(url);
  const { id, sprites, types, species, name } = res.data;
  const pokemonDescription: PokemonDescription = await getPokemonDescriptionByURL(
    species.url,
  );

  return {
    pokemonId: id,
    name: name,
    sprite: sprites.other['official-artwork'].front_default,
    type: types.map((tipo) => tipo.type.name).toString(),
    color: pokemonDescription.color,
    category: pokemonDescription.category,
    description: pokemonDescription.description,
  } as CaughtPokemon;
}

async function getPokemonDescriptionByURL(
  url: string,
): Promise<PokemonDescription> {
  const res: AxiosResponse<PokemonSpecie> = await axios.get(url);
  const { color, flavor_text_entries, genera } = res.data;

  const description = flavor_text_entries.find(
    (textEntry) =>
    textEntry.language.name === 'en' &&
    textEntry.version.name === 'red',
  );
  const category = genera.find(
    (category) => category.language.name === 'en',
  );

  return {
    color: color.name,
    description: description.flavor_text,
    category: category.genus,
  };
}
