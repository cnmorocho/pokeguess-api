import { z } from 'zod';

export const queryParamsSchema = z.object({
  pokemon: z.string({
    required_error: 'pokemon is required',
  }),
  gameId: z
    .string()
    .optional(),
});
