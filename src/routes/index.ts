import { Router } from 'express';
import { guessPokemon } from '../controllers/pokemonController';
import { playGame } from '../controllers/gameController';

const router = Router();

router.get('/guess', guessPokemon);
router.post('/play', playGame);

export default router;
