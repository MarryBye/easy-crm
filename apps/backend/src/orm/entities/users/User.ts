import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Car } from '../cars/Car';
import { RideOrder } from '../ride_orders/RideOrder';

import { Role, Language } from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    default: 'STANDARD' as Role,
    length: 30,
  })
  role: string;

  @Column({
    default: 'en-US' as Language,
    length: 15,
  })
  language: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Car, (car) => car.driver)
  car: Car;

  @OneToMany(() => RideOrder, (order) => order.driver)
  orders_as_driver: RideOrder[];

  @OneToMany(() => RideOrder, (order) => order.client)
  orders_as_client: RideOrder[];

  setLanguage(language: Language) {
    this.language = language;
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
