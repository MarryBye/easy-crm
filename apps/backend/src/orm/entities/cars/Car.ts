import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/User';

import { Car_class, Car_status } from './types';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  model: string;

  @Column({
    length: 32,
  })
  mark: string;

  @Column({
    default: 'AVAILABLE' as Car_status,
    length: 16,
  })
  car_status: Car_status;

  @Column({
    default: 'STANDARD' as Car_class,
    length: 16,
  })
  car_class: Car_class;

  @OneToOne(() => User, (user) => user.car, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  driver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
