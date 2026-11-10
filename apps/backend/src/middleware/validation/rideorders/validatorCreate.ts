import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { order_status, payment_type, start_date, end_date, driverId, clientId } = req.body;
  const errors = [];

  if (!order_status) {
    errors.push("order_status must be a string.");
  }

  if (!payment_type) {
    errors.push("payment_type must be a string.");
  }

  if (!clientId) {
    errors.push("clientId must be a number or string.");
  }

  if (isNaN(start_date as any) === false) {
    errors.push("start_date must be a valid date.");
  }

  if (start_date !== undefined && !start_date) {
    errors.push("start_date must be a valid date.");
  }

  if (isNaN(end_date as any) === false) {
    errors.push("end_date must be a valid date.");
  }

  if (driverId !== undefined && !driverId) {
    errors.push("driverId must be a number or string.");
  }

  if (end_date !== undefined && !end_date) {
    errors.push("end_date must be a valid date.");
  }
  
  const error_string = errors.join('\n');

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', error_string));
  }

  return next();
};
