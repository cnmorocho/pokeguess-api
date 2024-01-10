import express from 'express';
import router from './routes';
import './cron';
import environment from './configuration/environment';
import * as PokemonService from './services/pokemonService';

(async function (): Promise<void> {
  const app = express();
  const PORT = environment.PORT;

  await PokemonService.init();
  app.use(express.json());
  app.listen(PORT, function () {
    console.log('Server listening on:\n');
    console.log(`> Local: http://localhost:${PORT}/`);
  });
  app.use('/v1', router);
})();
