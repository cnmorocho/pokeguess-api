import cron from 'node-cron';
import { catchPokemon } from '../services/pokemonService';
import { CaughtPokemon } from '@prisma/client';

cron.schedule('0 0 0 * * *', async () => {
  const caughtPokemon: CaughtPokemon = await catchPokemon();
  console.log(caughtPokemon);
});
