import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.shipments, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  trackingNumber: string;

  @Column()
  carrier: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  shippedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
