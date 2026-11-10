import { Request, Response, NextFunction } from 'express';

import { RideOrderService } from 'service/RideOrderService';
import { RideOrderResponseDTO } from '../../dto/rideorder_response_dto';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const rideOrderService = new RideOrderService();

  const { result, error } = await rideOrderService.destroy(id);

  if (error) {
    return next(error);
  }

  const orderDTO = new RideOrderResponseDTO(result);

  res.customSuccess(200, 'Ride order successfully deleted.', orderDTO);
};