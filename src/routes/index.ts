import { Router } from 'express';
import * as PokemonController from '../controllers/pokemonController';
import * as JuegoController from '../controllers/juegoController';

const router = Router();

router.get('/guess', PokemonController.adivinar);
router.get('/play', JuegoController.iniciar);

export default router;
