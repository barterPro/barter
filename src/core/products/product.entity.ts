import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
  // JoinColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Category } from '../categories/category.entity';
// import { Tag } from '../tags/tag.entity';
// import { Order } from '../orders/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: true })
  reference: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  manufacturer?: string;

  @Column({ nullable: true })
  weight?: string;

  @Column({ nullable: true })
  dimensions?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: 0 })
  views: number;

  @Column('simple-array', { nullable: true })
  specifications?: {
    key: string;
    value: string;
  }[];

  @Column('simple-array', { nullable: true })
  reviews?: {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
  }[];

  // @ManyToOne(() => Category, (category) => category.products)
  // @JoinColumn()
  // category: Category;

  // @ManyToMany(() => Tag)
  // @JoinTable()
  // tags: Tag[];

  // @ManyToOne(() => Order, (order) => order.products, { nullable: true })
  // order?: Order;

  @Column({ nullable: true })
  discount?: number;

  @Column({ nullable: true })
  isFeatured?: boolean;

  @Column('simple-array', { nullable: true })
  variations?: {
    name: string;
    options: string[];
  }[];

  @Column({ nullable: true })
  availabilityStatus: string;

  @Column({ type: 'simple-array', nullable: true })
  attributes: { [key: string]: string | number }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
