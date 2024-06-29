import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Product } from '../products/product.entity';

@Entity()
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items, {
    onDelete: 'CASCADE',
  })
  wishlist: Wishlist;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
