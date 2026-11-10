import { Order_status } from './../../../orm/entities/ride_orders/types';
import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { order_status, payment_type, start_date, end_date, driverId, clientId } = req.body;
  const errors = [];

  if (!id) {
    errors.push("No id parameter provided.");
  }

  if (order_status !== undefined && !order_status) {
    errors.push("order_status must be a valid Order_status.");
  }

  if (payment_type !== undefined && !payment_type) {
    errors.push("payment_type must be a valid Payment_type.");
  }

  if (driverId !== undefined && !driverId) {
    errors.push("driverId must be a number or string.");
  }

  if (clientId !== undefined && !clientId) {
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

  if (end_date !== undefined && !end_date) {
    errors.push("end_date must be a valid date.");
  }
  
  const error_string = errors.join('\n');

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', error_string));
  }

  return next();
};