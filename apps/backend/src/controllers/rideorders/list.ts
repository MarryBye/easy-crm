import { Request, Response, NextFunction } from 'express';

import { RideOrderService } from 'service/RideOrderService';
import { RideOrderResponseDTO } from '../../dto/rideorder_response_dto';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const rideOrderService = new RideOrderService();
  const { result, error } = await rideOrderService.list();

  if (error) {
    return next(error);
  }

  const orderDTOs = result.map(order => new RideOrderResponseDTO(order));

  res.customSuccess(200, 'List of ride orders.', orderDTOs);
};