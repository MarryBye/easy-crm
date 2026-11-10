import { Car } from '../orm/entities/cars/Car';
import { UserResponseDTO } from '../dto/user_response_dto';
import { Car_class, Car_status } from '../orm/entities/cars/types';

export class CarResponseDTO {
  id: number;
  mark: string;
  model: string;
  car_class?: Car_class;
  car_status?: Car_status;
  driver: UserResponseDTO | null;

  constructor(car: Car) {
    this.id = car.id;
    this.mark = car.mark;
    this.model = car.model;
    this.car_class = car.car_class ?? undefined;
    this.car_status = car.car_status ?? undefined;
    this.driver = car.driver ? new UserResponseDTO(car.driver) : null;
  }
};