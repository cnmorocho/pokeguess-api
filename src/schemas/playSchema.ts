import { z } from 'zod';

export const queryParamsSchema = z.object({
  pokemon: z.string({
    required_error: 'pokemon is required',
  }),
  gameId: z
    .number({
      invalid_type_error: 'gameId have to be number',
    })
    .optional(),
});
