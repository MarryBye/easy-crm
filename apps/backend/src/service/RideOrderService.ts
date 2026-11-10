import { getRepository } from 'typeorm';

import { RideOrder } from '../orm/entities/ride_orders/RideOrder';
import { User } from '../orm/entities/users/User';
import { Order_status, Payment_type } from '../orm/entities/ride_orders/types';
import { CustomError } from 'utils/response/custom-error/CustomError';

class RideOrderService {
  private rideOrderRepository = getRepository(RideOrder);
  private userRepository = getRepository(User);

  private makeCustomError(errors: string[]) {
    return new CustomError(404, "Raw", errors.join("\n"));
  }

  async list(): Promise<{ result: RideOrder[] | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    const rideorders = await this.rideOrderRepository.find({
      relations: ['driver', 'client'],
    });

    if (rideorders.length === 0) {
      errors.push("No ride orders found.");
    }

    if (errors.length === 0) {
      data.result = rideorders;
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;
  }

  async show(id: number | string): Promise<{ result: RideOrder | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    const rideorder = await this.rideOrderRepository.findOne(id, {
      relations: ['driver', 'client'],
    });

    if (!rideorder) {
      errors.push("Ride order not found.");
    }

    if (errors.length === 0) {
      data.result = rideorder;
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;
  }

  async create(
    order_status: Order_status, 
    payment_type: Payment_type, 
    clientId: number | string, 
    driverId?: number | string, 
    start_date?: Date, 
    end_date?: Date
  ): Promise<{ result: RideOrder | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    try {
      const rideorder = this.rideOrderRepository.create();
      rideorder.order_status = order_status;
      rideorder.payment_type = payment_type;
      
      const client = await this.userRepository.findOne(clientId);
      if (!client) {
        errors.push(`Client with id ${clientId} not found.`);
      } else {
        rideorder.client = client;
      }

      if (driverId !== undefined) {
        const driver = await this.userRepository.findOne(driverId);
        if (!driver) {
          errors.push(`Driver with id ${driverId} not found.`);
        } else {
          rideorder.driver = driver;
        }
      }

      if (start_date !== undefined) {
        rideorder.start_date = new Date(start_date);
      }
      
      if (end_date !== undefined) {
        rideorder.end_date = new Date(end_date);
      }

      if (errors.length === 0) {
        data.result = rideorder;
        await this.rideOrderRepository.save(rideorder);
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
    order_status?: Order_status, 
    payment_type?: Payment_type, 
    clientId?: number | string, 
    driverId?: number | string, 
    start_date?: Date, 
    end_date?: Date
  ): Promise<{ result: RideOrder | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors = [];

    try {
      const rideorder = await this.rideOrderRepository.findOne(id);
      
      if (!rideorder) {
        errors.push("Ride order not found.");
        data.error = this.makeCustomError(errors);
        return data;
      }

      if (order_status !== undefined) {
        rideorder.order_status = order_status;
      }

      if (payment_type !== undefined) {
        rideorder.payment_type = payment_type;
      }

      if (clientId !== undefined) {
        const client = await this.userRepository.findOne(clientId);
        if (!client) {
          errors.push(`Client with id ${clientId} not found.`);
        } else {
          rideorder.client = client;
        }
      }

      if (driverId !== undefined) {
        const driver = await this.userRepository.findOne(driverId);
        if (!driver) {
          errors.push(`Driver with id ${driverId} not found.`);
        } else {
          rideorder.driver = driver;
        }
      }

      if (start_date !== undefined && start_date !== null) {
        rideorder.start_date = new Date(start_date);
      }

      if (end_date !== undefined && end_date !== null) {
        rideorder.end_date = new Date(end_date);
      }

      if (errors.length === 0) {
        data.result = rideorder;
        await this.rideOrderRepository.save(rideorder);
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

  async destroy(id: number | string): Promise<{ result: RideOrder | null; error: CustomError | null }> {
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
        await this.rideOrderRepository.delete(id);
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

export { RideOrderService };