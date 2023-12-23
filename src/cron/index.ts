import cron from 'node-cron';
import * as PokemonService from '../services/pokemonService';
import { PokemonAtrapado } from '@prisma/client';

cron.schedule('0 0 0 * * *', async () => {
    const pokemonAtrapado: PokemonAtrapado = await PokemonService.atrapar();
    console.log(pokemonAtrapado);
});
