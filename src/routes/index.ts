import { Router } from 'express';
import { guessPokemon } from '../controllers/pokemonController';
import { playGame } from '../controllers/gameController';
import { validateRequestQueries } from '../middlewares/requestValidator';
import { queryParamsSchema } from '../schemas/playSchema';

const router = Router();

router.get('/guess', guessPokemon);
router.post('/play', validateRequestQueries(queryParamsSchema), playGame);

export default router;
