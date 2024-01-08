import { Router } from 'express';
import { guessPokemon } from '../controllers/pokemonController';
// import { startGame } from '../controllers/juegoController';

const router = Router();

router.get('/guess', guessPokemon);
// router.get('/play', startGame);

export default router;
