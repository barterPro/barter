import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { User } from '../users/user.entity';

@Entity()
export class Refund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.refunds, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => User, (user) => user.refunds, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  reason: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
