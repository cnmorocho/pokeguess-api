import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';
import { RequestValidationMiddleware } from '../types/CustomTypes';

export function validateRequestQueries(schema: AnyZodObject): RequestValidationMiddleware {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = req.query;
      await schema.parseAsync(queryParams);
      next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }
      res.status(400).json({
        status: 'failed',
        error: err,
      });
    }
  };
}
