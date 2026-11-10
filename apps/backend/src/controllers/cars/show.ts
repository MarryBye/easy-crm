// filepath: [show.ts](http://_vscodecontentref_/2)
import { Request, Response, NextFunction } from 'express';

import { CarService } from 'service/CarService';
import { CarResponseDTO } from '../../dto/car_response_dto';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const carService = new CarService();

  const { result, error } = await carService.show(id);

  if (error) {
    return next(error);
  }

  const carDTO = new CarResponseDTO(result);

  res.customSuccess(200, 'Car found.', carDTO);
};