import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Tag } from '../tags/tag.entity';
// import { Product } from '../products/product.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  provider: string;

  @Column()
  duration: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column('float')
  rating: number;

  @Column('float')
  discount: number;

  @Column('simple-array')
  variations: { [key: string]: string | number }[];

  @Column()
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  reviews?: {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToMany(() => Tag)
  // @JoinTable()
  // tags: Tag[];

  // @ManyToMany(() => Tag)
  // @JoinTable()
  // categories: Category[];
}
