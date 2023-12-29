import axios, { AxiosResponse } from 'axios';
import { PokeIndex, Pokedex } from '../types';
import { obtenerElementoAleatorio } from '../utils/functions';
import * as PokemonRepository from '../repositories/pokemonRepository';
import { PokemonAtrapado } from '@prisma/client';
import { POKEAPI_OBTENER_POKEMONS_URL, PRIMERA_GEN } from '../consts';

export async function adivinar(pokemon: string): Promise<boolean> {
  let pokemonDelDia: PokemonAtrapado = await PokemonRepository.obtenerDelDia();
  
  if (!pokemonDelDia) pokemonDelDia = await atrapar();

  return pokemonDelDia.nombre === pokemon;
}

export async function atrapar(): Promise<PokemonAtrapado> {
  const axiosResponse: AxiosResponse<Pokedex> = await axios.get(
    POKEAPI_OBTENER_POKEMONS_URL,
    { params: { limit: PRIMERA_GEN } },
  );
  const pokemonAtrapado: PokeIndex = obtenerElementoAleatorio(
    axiosResponse.data.results,
  );
  return await PokemonRepository.guardar(pokemonAtrapado.name);
}
