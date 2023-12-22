import axios, { AxiosResponse } from "axios";
import { PokeIndex, Pokedex } from "../types";
import { obtenerElementoAleatorio } from "../utils/functions";
import * as PokemonRepository from '../repositories/pokemonRepository';
import { PokemonAtrapado } from "@prisma/client";

const SIN_LIMITE = '-1';
const POKEAPI_OBTENER_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function adivinar(nombrePokemon: string): Promise<boolean> {
    try {
        const pokemonActual: PokemonAtrapado = await PokemonRepository.obtenerActual();
        if (pokemonActual.nombre !== nombrePokemon) return false;
        return true;
    } catch (error) {
        throw error;
    }
}

export async function atrapar(): Promise<PokemonAtrapado> {
    try {
        const axiosResponse: AxiosResponse<Pokedex> = await axios.get(POKEAPI_OBTENER_POKEMONS_URL, { params: { limit: SIN_LIMITE } });
        const pokemonAtrapado: PokeIndex = obtenerElementoAleatorio(axiosResponse.data.results);
        return await PokemonRepository.guardar(pokemonAtrapado.name);
    } catch (error) {
        throw error;    
    }
}
