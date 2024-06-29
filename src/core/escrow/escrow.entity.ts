import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from '../orders/order.entity';
// import { User } from '../users/user.entity';

@Entity()
export class Escrow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  virtualAccountNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: false })
  isReleased: boolean;

  @ManyToOne(() => Order, (order) => order.escrow)
  order: Order;

  // @ManyToOne(() => User, (user) => user.escrow)
  // seller: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
