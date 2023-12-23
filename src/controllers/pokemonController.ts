import { Request, Response } from "express";
import * as PokemonService from "../services/pokemonService";

export async function adivinar(req: Request, res: Response): Promise<void> {
    try {
        const pokemon = req.query.pokemon as string;
        const resultado = await PokemonService.adivinar(pokemon);
        res.status(200).json(resultado);
    } catch (error: any) {
        console.error(error.message);
        throw error;
    }
}

export async function atrapar(_req: Request, res: Response): Promise<void> {
    try {
        const pokemonAtrapado = await PokemonService.atrapar();
        res.status(201).json(pokemonAtrapado);
    } catch (error) {
        throw error;
    }
}
