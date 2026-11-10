import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { mark, model, car_class, car_status, driverId } = req.body;
  const errors: string[] = [];

  if (!mark) {
    errors.push("Mark is required.");
  } else if (typeof mark !== 'string') {
    errors.push("Mark must be a string.");
  }

  if (!model) {
    errors.push("Model is required.");
  } else if (typeof model !== 'string') {
    errors.push("Model must be a string.");
  }

  if (!car_class) {
    errors.push("car_class is required.");
  } else if (typeof car_class !== 'string') {
    errors.push("car_class must be a string.");
  }

  if (!car_status) {
    errors.push("car_status is required.");
  } else if (typeof car_status !== 'string') {
    errors.push("car_status must be a string.");
  }

  if (driverId !== undefined && driverId !== null && typeof driverId !== 'number' && typeof driverId !== 'string') {
    errors.push("driverId must be a number or string.");
  }

  const error_string = errors.join('\n');

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', error_string));
  }

  return next();
};