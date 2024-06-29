import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { WishlistItem } from './wishlist-item.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist, {
    cascade: true,
  })
  items: WishlistItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
