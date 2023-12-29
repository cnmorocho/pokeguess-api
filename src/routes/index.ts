import { Router } from 'express';
import * as PokemonController from '../controllers/pokemonController';

const router = Router();

router.get('/guess', PokemonController.adivinar);

export default router;
