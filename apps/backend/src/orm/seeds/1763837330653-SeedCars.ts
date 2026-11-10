import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Car } from '../entities/cars/Car';
import { User } from '../entities/users/User';

export class SeedCars1763837330653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let car = new Car();
    const carRepository = getRepository(Car);
    const userRepository = getRepository(User);

    const walter = await userRepository.findOne({ username: 'Heisenberg' });
    const jesse = await userRepository.findOne({ username: 'Jesse' });
    const hank = await userRepository.findOne({ username: 'Hank' });
    const gus = await userRepository.findOne({ username: 'Gus' });
    const mike = await userRepository.findOne({ username: 'Mike' });

    car.mark = 'BMW';
    car.model = 'X5';
    car.car_class = 'STANDARD';
    car.car_status = 'AVAILABLE';
    car.driver = walter;
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Audi';
    car.model = 'A6';
    car.car_class = 'BUSINESS';
    car.car_status = 'AVAILABLE';
    car.driver = jesse;
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Mercedes';
    car.model = 'E200';
    car.car_class = 'BUSINESS';
    car.car_status = 'AVAILABLE';
    car.driver = hank;
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Toyota';
    car.model = 'Camry';
    car.car_class = 'STANDARD';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Honda';
    car.model = 'Accord';
    car.car_class = 'STANDARD';
    car.car_status = 'UNAVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Lexus';
    car.model = 'ES300';
    car.car_class = 'LUX';
    car.car_status = 'AVAILABLE';
    car.driver = gus;
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Tesla';
    car.model = 'Model S';
    car.car_class = 'LUX';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Volkswagen';
    car.model = 'Passat';
    car.car_class = 'STANDARD';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Skoda';
    car.model = 'Superb';
    car.car_class = 'STANDARD';
    car.car_status = 'UNAVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Ford';
    car.model = 'Focus';
    car.car_class = 'STANDARD';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Hyundai';
    car.model = 'Sonata';
    car.car_class = 'STANDARD';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Kia';
    car.model = 'K5';
    car.car_class = 'STANDARD';
    car.car_status = 'UNAVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'BMW';
    car.model = '7 Series';
    car.car_class = 'LUX';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Mercedes';
    car.model = 'S500';
    car.car_class = 'LUX';
    car.car_status = 'AVAILABLE';
    await carRepository.save(car);

    car = new Car();
    car.mark = 'Toyota';
    car.model = 'Hiace';
    car.car_class = 'BUSINESS';
    car.car_status = 'AVAILABLE';
    car.driver = mike;
    await carRepository.save(car);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Not implemented');
  }
}
