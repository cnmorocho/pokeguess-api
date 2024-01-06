import axios, { AxiosResponse } from 'axios';
import {
  DescripcionPokemon,
  EspeciePokemon,
  PokeIndex,
  Pokedex,
  Pokemon,
} from '../types';
import { obtenerElementoAleatorio } from '../utils/functions';
import * as PokemonRepository from '../repositories/pokemonRepository';
import { PokemonAtrapado } from '@prisma/client';
import { PRIMERA_GEN } from '../consts';
import environment from '../configuration/environment';

export async function adivinar(pokemon: string): Promise<boolean> {
  const pokemonDelDia: PokemonAtrapado =
    await PokemonRepository.obtenerDelDia();
  return pokemonDelDia.nombre === pokemon;
}

export async function atrapar(): Promise<PokemonAtrapado> {
  const res: AxiosResponse<Pokedex> = await axios.get(
    environment.POKEAPI_OBTENER_POKEMONS_URL,
    { params: { limit: PRIMERA_GEN } },
  );

  const pokemonAtrapado: PokeIndex = obtenerElementoAleatorio(res.data.results);

  const { url } = pokemonAtrapado;

  const informacionPokemon = await obtenerPorURL(url);

  return await PokemonRepository.guardar(informacionPokemon);
}

export async function inicializar(): Promise<void> {
  console.info('Verificando que exista pokemon del dia...');
  const pokemonDelDia: PokemonAtrapado =
    await PokemonRepository.obtenerDelDia();
  if (!pokemonDelDia) {
    console.info('No se encontró un pokemon.');
    console.info('Capturando pokemon...');
    await atrapar();
  }
  console.info('Iniciando el juego...');
}

async function obtenerPorURL(url: string): Promise<PokemonAtrapado> {
  const res: AxiosResponse<Pokemon> = await axios.get(url);
  const { id, sprites, types, species, name } = res.data;
  const descripcionPokemon: DescripcionPokemon = await obtenerDescripcionPorURL(
    species.url,
  );

  return {
    idPokedex: id,
    nombre: name,
    imagen: sprites.other['official-artwork'].front_default,
    tipos: types.map((tipo) => tipo.type.name).toString(),
    color: descripcionPokemon.color,
    categoria: descripcionPokemon.categoria,
    descripcion: descripcionPokemon.descripcion,
  } as PokemonAtrapado;
}

async function obtenerDescripcionPorURL(
  url: string,
): Promise<DescripcionPokemon> {
  const res: AxiosResponse<EspeciePokemon> = await axios.get(url);
  const { color, flavor_text_entries, genera } = res.data;

  const descripcion = flavor_text_entries.find(
    (entradaTexto) =>
      entradaTexto.language.name === 'en' &&
      entradaTexto.version.name === 'red',
  );
  const categoria = genera.find(
    (categoria) => categoria.language.name === 'en',
  );

  return {
    color: color.name,
    descripcion: descripcion.flavor_text,
    categoria: categoria.genus,
  };
}
