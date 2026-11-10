import { getRepository } from 'typeorm';

import { Car } from '../orm/entities/cars/Car';
import { User } from '../orm/entities/users/User';
import { Car_class, Car_status } from '../orm/entities/cars/types';
import { CustomError } from 'utils/response/custom-error/CustomError';

class CarService {
  private carRepository = getRepository(Car);
  private userRepository = getRepository(User);

  private makeCustomError(errors: string[]) {
    return new CustomError(404, "Raw", errors.join("\n"));
  }

  async list(): Promise<{ result: Car[] | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    const cars = await this.carRepository.find({
      relations: ['driver'],
    });

    if (cars.length === 0) {
      errors.push("No cars found.");
    }

    if (errors.length === 0) {
      data.result = cars;
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;
  }

  async show(id: number | string): Promise<{ result: Car | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    const car = await this.carRepository.findOne(id, {
      relations: ['driver'],
    });

    if (!car) {
      errors.push("Car not found.");
    }

    if (errors.length === 0) {
      data.result = car;
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;
  }

  async create(
    mark: string,
    model: string,
    car_class: Car_class,
    car_status: Car_status,
    driverId?: number | string,
  ): Promise<{ result: Car | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];
    try {
      const car = this.carRepository.create();
      car.mark = mark;
      car.model = model;
      car.car_class = car_class;
      car.car_status = car_status;

    if (driverId !== undefined) {
      const driver = await this.userRepository.findOne(driverId);
      if (!driver) {
        errors.push(`Driver with id ${driverId} not found.`);
      } else {
        car.driver = driver;
      }
    }

    if (errors.length === 0) {
      data.result = car;
      await this.carRepository.save(car);
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;

    } catch (error) {
      errors.push(error.message);
      data.error = this.makeCustomError(errors);
      return data;
    }
  }

  async edit(
    id: number | string,
    mark?: string,
    model?: string,
    car_class?: Car_class,
    car_status?: Car_status,
    driverId?: number | string,
  ): Promise<{ result: Car | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    try {
      const car = await this.carRepository.findOne(id, {
        relations: ['driver'],
      });

      if (!car) {
        errors.push("Car not found.");
        data.error = this.makeCustomError(errors);
        return data;
      }

      if (mark !== undefined) {
        car.mark = mark;
      }

      if (model !== undefined) {
        car.model = model;
      }

      if (car_class !== undefined) {
        car.car_class = car_class;
      }

      if (car_status !== undefined) {
        car.car_status = car_status;
      }

      if (driverId !== undefined) {
        const driver = await this.userRepository.findOne(driverId);
        if (!driver) {
          errors.push(`Driver with id ${driverId} not found.`);
        } else {
          car.driver = driver;
        }
      }

      if (errors.length === 0) {
        data.result = car;
        await this.carRepository.save(car);
      } else {
        data.error = this.makeCustomError(errors);
      }

      return data;
    } catch (error) {
      errors.push(error.message);
      data.error = this.makeCustomError(errors);
      return data;
    }
  }

  async destroy(id: number | string): Promise<{ result: Car | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    try {
      const { result, error } = await this.show(id);

      if (error) {
        data.error = error;
        return data;
      }

      if (errors.length === 0) {
        data.result = result;
        await this.carRepository.delete(id);
      } else {
        data.error = this.makeCustomError(errors);
      }

      return data;
    } catch (error) {
      errors.push(error.message);
      data.error = this.makeCustomError(errors);
      return data;
    }
  }
}

export { CarService };