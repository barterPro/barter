import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Storage } from '../storage/storage.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.inventories, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Storage, (storage) => storage.inventories, {
    onDelete: 'CASCADE',
  })
  storage: Storage;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  reserved: number;

  @Column({ type: 'int', default: 0 })
  available: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
