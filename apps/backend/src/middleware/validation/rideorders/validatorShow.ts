import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorShow = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const errors = [];

  if (!id) {
    errors.push("No id parameter provided.");
  }

  const error_string = errors.join('\n');

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', error_string));
  }

  return next();
};
