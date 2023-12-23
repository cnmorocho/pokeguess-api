import axios, { AxiosResponse } from 'axios';
import { PokeIndex, Pokedex } from '../types';
import { obtenerElementoAleatorio } from '../utils/functions';
import * as PokemonRepository from '../repositories/pokemonRepository';
import { PokemonAtrapado } from '@prisma/client';
import environment from '../configuration/environment';

const SIN_LIMITE = '-1';
const POKEAPI_OBTENER_POKEMONS_URL = environment.POKEAPI_OBTENER_POKEMONS_URL;

export async function adivinar(nombrePokemon: string): Promise<boolean> {
  const pokemonActual: PokemonAtrapado =
    await PokemonRepository.obtenerActual();
  if (pokemonActual.nombre !== nombrePokemon) return false;
  return true;
}

export async function atrapar(): Promise<PokemonAtrapado> {
  const axiosResponse: AxiosResponse<Pokedex> = await axios.get(
    POKEAPI_OBTENER_POKEMONS_URL,
    { params: { limit: SIN_LIMITE } },
  );
  const pokemonAtrapado: PokeIndex = obtenerElementoAleatorio(
    axiosResponse.data.results,
  );
  return await PokemonRepository.guardar(pokemonAtrapado.name);
}
