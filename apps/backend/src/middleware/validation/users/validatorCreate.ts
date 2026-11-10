import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { username, name, email, password } = req.body;
  const errors: string[] = [];

  if (!email) {
    errors.push("Email is required.");
  } else if (typeof email !== 'string') {
    errors.push("Email must be a string.");
  }

  if (!name) {
    errors.push("Name is required.");
  } else if (typeof name !== 'string') {
    errors.push("Name must be a string.");
  }

  if (!username) {
    errors.push("Username is required.");
  } else if (typeof username !== 'string') {
    errors.push("Username must be a string.");
  }

  if (!password) {
    errors.push("Password is required.");
  } else if (typeof password !== 'string') {
    errors.push("Password must be a string.");
  }

  const error_string = errors.join('\n');

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', error_string));
  }

  return next();
};