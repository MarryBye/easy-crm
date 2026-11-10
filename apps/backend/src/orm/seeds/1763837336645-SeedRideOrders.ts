import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { RideOrder } from '../entities/ride_orders/RideOrder';
import { User } from '../entities/users/User';

export class SeedRideOrders1763837336645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rideOrderRepository = getRepository(RideOrder);
    const userRepository = getRepository(User);

    const walter = await userRepository.findOne({ username: 'Heisenberg' });
    const jesse = await userRepository.findOne({ username: 'Jesse' });
    const skyler = await userRepository.findOne({ username: 'Sky' });
    const hank = await userRepository.findOne({ username: 'Hank' });
    const marie = await userRepository.findOne({ username: 'Marie' });
    const saul = await userRepository.findOne({ username: 'The Lawyer' });
    const gus = await userRepository.findOne({ username: 'Gus' });
    const mike = await userRepository.findOne({ username: 'Mike' });
    const tio = await userRepository.findOne({ username: 'Tio' });
    const tuco = await userRepository.findOne({ username: 'Tuco' });

    let rideorder = new RideOrder();
    rideorder.order_status = 'Completed';
    rideorder.payment_type = 'Credit Card';
    rideorder.driver = walter;
    rideorder.client = jesse;
    rideorder.start_date = new Date('2024-10-10T10:00:00');
    rideorder.end_date = new Date('2024-10-10T10:25:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'In Progress';
    rideorder.payment_type = 'Cash';
    rideorder.driver = jesse;
    rideorder.client = skyler;
    rideorder.start_date = new Date('2024-11-02T18:00:00');
    rideorder.end_date = null;
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'Cancelled';
    rideorder.payment_type = 'Credit Card';
    rideorder.driver = hank;
    rideorder.client = marie;
    rideorder.start_date = new Date('2024-10-05T14:00:00');
    rideorder.end_date = new Date('2024-10-05T14:05:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'Completed';
    rideorder.payment_type = 'Cash';
    rideorder.driver = mike;
    rideorder.client = saul;
    rideorder.start_date = new Date('2024-11-12T09:40:00');
    rideorder.end_date = new Date('2024-11-12T10:05:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'Completed';
    rideorder.payment_type = 'Credit Card';
    rideorder.driver = tuco;
    rideorder.client = tio;
    rideorder.start_date = new Date('2024-10-28T20:10:00');
    rideorder.end_date = new Date('2024-10-28T20:30:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'In Progress';
    rideorder.payment_type = 'Cash';
    rideorder.driver = gus;
    rideorder.client = walter;
    rideorder.start_date = new Date('2024-11-20T12:00:00');
    rideorder.end_date = null;
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'Cancelled';
    rideorder.payment_type = 'Credit Card';
    rideorder.driver = skyler;
    rideorder.client = jesse;
    rideorder.start_date = new Date('2024-09-22T07:00:00');
    rideorder.end_date = new Date('2024-09-22T07:02:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'Completed';
    rideorder.payment_type = 'Cash';
    rideorder.driver = marie;
    rideorder.client = mike;
    rideorder.start_date = new Date('2024-11-01T15:00:00');
    rideorder.end_date = new Date('2024-11-01T15:22:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'Completed';
    rideorder.payment_type = 'Credit Card';
    rideorder.driver = saul;
    rideorder.client = hank;
    rideorder.start_date = new Date('2024-10-15T16:20:00');
    rideorder.end_date = new Date('2024-10-15T16:45:00');
    await rideOrderRepository.save(rideorder);

    rideorder = new RideOrder();
    rideorder.order_status = 'In Progress';
    rideorder.payment_type = 'Cash';
    rideorder.driver = mike;
    rideorder.client = tuco;
    rideorder.start_date = new Date('2024-12-01T08:30:00');
    rideorder.end_date = null;
    await rideOrderRepository.save(rideorder);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Not implemented');
  }
}
