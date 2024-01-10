import { Hint } from "@prisma/client";
import { updateHintById } from "../repositories/hintRepository";
import { getDailyPokemon } from "../repositories/pokemonRepository";

export async function updateHint(hintId: number, tries: number): Promise<Hint> {
  const { category, color, description, sprite, type } = await getDailyPokemon();
  
  switch(tries) {
    case 1: return await updateHintById(hintId, { type });
    case 2: return await updateHintById(hintId, { color });
    case 3: return await updateHintById(hintId, { category });
    case 4: return await updateHintById(hintId, { description });
    case 5: return await updateHintById(hintId, { sprite });
    default: return await updateHintById(hintId, { });
  }
}
