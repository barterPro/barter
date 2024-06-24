import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  // OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { User } from '../users/user.entity';
// import { Payment } from '../payments/payment.entity';
// import { Product } from '../products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.orders)
  // user: User;

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  // items: OrderItem[];

  // @ManyToOne(() => Payment, (payment) => payment.orders)
  // payment: Payment;

  @Column('decimal')
  totalAmount: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Order, (order) => order.items)
  // order: Order;

  // @ManyToOne(() => Product, (product) => product.orders)
  // product: Product;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;
}
