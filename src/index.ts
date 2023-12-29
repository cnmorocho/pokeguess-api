import express from 'express';
import router from './routes';
import './cron';
import environment from './configuration/environment';
import * as PokemonService from './services/pokemonService';

(async function (): Promise<void> {
  const app = express();
  const PORT = environment.PORT;

  await PokemonService.inicializar();
  app.use(express.json());
  app.listen(PORT, function () {
    console.log('Servidor disponible en:\n');
    console.log(`> Local: http://localhost:${PORT}/`);
  });
  app.use('/v1', router);
})();
