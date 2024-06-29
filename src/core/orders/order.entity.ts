import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Shipment } from '../shipments/shipment.entity';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entitiy';
import { Payment } from '../payments/payment.entity';
import { Refund } from '../refunds/refund.entity';
import { Escrow } from '../escrow/escrow.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  status: string;

  @ManyToOne(() => Payment, (payment) => payment.orders, { nullable: true })
  payment: Payment;

  @OneToMany(() => Refund, (refund) => refund.order)
  refunds: Refund[];

  @OneToMany(() => Product, (product) => product.order)
  products: Product[];

  @OneToOne(() => Escrow, (escrow) => escrow.order)
  escrow: Escrow;

  @OneToMany(() => Shipment, (shipment) => shipment.order, { cascade: true })
  shipments: Shipment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
