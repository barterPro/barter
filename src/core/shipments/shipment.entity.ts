import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Order } from '../orders/order.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Order, (order) => order.shipments)
  // order: Order;

  @Column()
  carrier: string;

  @Column()
  trackingNumber: string;

  @Column({ type: 'text' })
  shippedDate: Date;

  @Column({ type: 'text', nullable: true })
  deliveredDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
