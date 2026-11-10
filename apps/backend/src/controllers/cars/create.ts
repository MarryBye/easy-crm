// filepath: /Users/marrybye/Documents/Универ/КПЗ/KPZ-4/src/controllers/cars/create.ts
import { Request, Response, NextFunction } from 'express';

import { CarService } from 'service/CarService';
import { CarResponseDTO } from '../../dto/car_response_dto';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const carService = new CarService();
  const { mark, model, car_class, car_status, driverId } = req.body;

  const { result, error } = await carService.create(mark, model, car_class, car_status, driverId);

  if (error) {
    return next(error);
  }

  const carDTO = new CarResponseDTO(result);

  res.customSuccess(201, 'Car successfully created.', carDTO);
};