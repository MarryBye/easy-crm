// filepath: /Users/marrybye/Documents/Универ/КПЗ/KPZ-4/src/controllers/cars/edit.ts
import { Request, Response, NextFunction } from 'express';

import { CarService } from 'service/CarService';
import { CarResponseDTO } from '../../dto/car_response_dto';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { mark, model, car_class, car_status, driverId } = req.body;
  const carService = new CarService();

  const { result, error } = await carService.edit(id, mark, model, car_class, car_status, driverId);

  if (error) {
    return next(error);
  }

  const carDTO = new CarResponseDTO(result);

  res.customSuccess(200, 'Car successfully saved.', carDTO);
};