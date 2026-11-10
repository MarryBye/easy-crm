import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { username, name } = req.body;
  const errors: string[] = [];

  if (!id) {
    errors.push("No id parameter provided.");
  }

  if (username !== undefined && typeof username !== 'string') {
    errors.push("Username must be a string.");
  }

  if (name !== undefined && typeof name !== 'string') {
    errors.push("Name must be a string.");
  }

  const error_string = errors.join('\n');

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', error_string));
  }

  return next();
};