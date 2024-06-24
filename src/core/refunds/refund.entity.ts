import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Order } from '../orders/order.entity';
// import { Product } from '../products/product.entity';

@Entity()
export class ReturnAndRefund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Order, (order) => order.returnAndRefunds)
  // order: Order;

  // @ManyToOne(() => Product, (product) => product.returnAndRefunds)
  // product: Product;

  @Column()
  reason: string;

  @Column()
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  refundAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
