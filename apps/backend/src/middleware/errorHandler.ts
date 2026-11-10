import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = typeof err?.HttpStatusCode === 'number' ? err.HttpStatusCode : err?.status || err?.statusCode || 500;
  const responseBody = err?.JSON || {
    errorMessage: err?.message || 'Internal Server Error',
    errors: [err?.message || 'An unexpected error occurred'],
  };
  return res.status(status).json(responseBody);
};
