import { Car } from '../orm/entities/cars/Car';
import { RideOrder } from '../orm/entities/ride_orders/RideOrder';
import { Order_status, Payment_type } from '../orm/entities/ride_orders/types'
import { UserResponseDTO } from '../dto/user_response_dto';
import { Car_class, Car_status } from '../orm/entities/cars/types';

export class RideOrderResponseDTO {
  id: number;
  order_status: Order_status;
  payment_type: Payment_type;
  client: UserResponseDTO;
  start_date: Date | null;
  end_date: Date | null;
  driver: UserResponseDTO | null;

  constructor(rideOrder: RideOrder) {
    this.id = rideOrder.id;
    this.order_status = rideOrder.order_status;
    this.payment_type = rideOrder.payment_type;
    this.start_date = rideOrder.start_date;
    this.end_date = rideOrder.end_date ? new Date(rideOrder.end_date) : null;
    this.driver = rideOrder.driver ? new UserResponseDTO(rideOrder.driver) : null;
    this.client = rideOrder.client ? new UserResponseDTO(rideOrder.client) : null;
  }
}