import axios, { AxiosResponse } from 'axios';
import environment from '../configuration/environment';
import { Pokedex, Pokemon, PokemonDescription, PokemonSpecie } from '../types';
import { CaughtPokemon } from '@prisma/client';

export async function getPokedexByGeneration(
  generation: string,
): Promise<Pokedex> {
  return (
    await axios.get(environment.POKEAPI_GET_POKEMONS_URL, {
      params: { limit: generation },
    })
  ).data;
}

export async function getPokemonInformationById(
  pokemonId: number,
): Promise<CaughtPokemon> {
  const res: AxiosResponse<Pokemon> = await axios.get(
    `${environment.POKEAPI_GET_POKEMONS_URL}/${pokemonId}`,
  );
  const { sprites, types, name } = res.data;
  const pokemonDescription: PokemonDescription =
    await getPokemonDescriptionById(pokemonId);

  return {
    pokemonId: pokemonId,
    name: name,
    sprite: sprites.other['official-artwork'].front_default,
    type: types.map((tipo) => tipo.type.name).toString(),
    color: pokemonDescription.color,
    category: pokemonDescription.category,
    description: pokemonDescription.description,
  } as CaughtPokemon;
}

export async function getPokemonDescriptionById(
  pokemonId: number,
): Promise<PokemonDescription> {
  const res: AxiosResponse<PokemonSpecie> = await axios.get(
    `${environment.POKEAPI_GET_POKEMON_SPECIES_URL}/${pokemonId}`,
  );
  const { color, flavor_text_entries, genera } = res.data;

  const description = flavor_text_entries.find(
    (textEntry) =>
      textEntry.language.name === 'en' && textEntry.version.name === 'red',
  );
  const category = genera.find((category) => category.language.name === 'en');

  return {
    color: color.name,
    description: description.flavor_text,
    category: category.genus,
  };
}
