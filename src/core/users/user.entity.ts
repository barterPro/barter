import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Address } from '../addresses/address.entity';
import { Product } from '../products/product.entity';
import { Service } from '../services/service.entity';
import { Payment } from '../payments/payment.entity';
import { Cart } from '../carts/cart.entity';
import { Wishlist } from '../wishlists/wishlist.entity';
import { Order } from '../orders/order.entity';
import { Balance } from '../balances/balances.entity';
import { Refund } from '../refunds/refund.entity';
import { Notification } from 'src/utils/notifications/notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string | number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  googleID?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ default: 'active' })
  accountStatus: string;

  @Column({ default: false })
  verificationStatus: boolean;

  @Column('text', { array: true })
  roles: string[];

  @Column('simple-array', { nullable: true })
  notificationPreferences?: {
    email: boolean;
    SMS: boolean;
    pushNotifications: boolean;
  };

  @Column({ default: 'en' })
  language: string;

  @Column({ default: 'USD' })
  currency: string;

  @CreateDateColumn()
  signupDate: Date;

  @UpdateDateColumn()
  lastLogin: Date;

  @ManyToOne(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Product)
  @JoinTable()
  purchaseHistory: Product[];

  @ManyToMany(() => Service)
  @JoinTable()
  serviceHistory: Service[];

  @OneToMany(() => Payment, (payment) => payment.userId)
  paymentHistory: Payment[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Refund, (cart) => cart.user)
  refunds?: Refund[];

  @Column('text', { array: true, nullable: true })
  favorites?: string[];

  @Column('text', { array: true, nullable: true })
  reviews?: string[];

  @Column({ default: false })
  twoFactorAuth: boolean;

  @Column('simple-array', { nullable: true })
  privacySettings?: {
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
  };

  @Column('simple-array', { nullable: true })
  ratings?: {
    buyer: number;
    seller: number;
  };

  @Column('text', { array: true, nullable: true })
  followers?: string[];

  @Column('text', { array: true, nullable: true })
  following?: string[];

  @Column({ default: 'free' })
  membershipLevel: string;

  @Column('text', { array: true, nullable: true })
  subscriptions?: string[];

  @Column({ default: 0 })
  adCredits: number;

  @Column({ default: 'individual' })
  accountType: 'individual' | 'company';

  @Column({ nullable: true })
  companyName?: string;

  @Column({ nullable: true })
  companyWebsite?: string;

  @Column({ nullable: true })
  companyAddress?: string;

  @Column({ nullable: true })
  companyPhone?: string;

  @Column('simple-array', { nullable: true })
  companyVerificationDocuments?: {
    documentType: string;
    documentURL: string;
  }[];

  @Column({ nullable: true })
  companyRepresentative?: string;

  @Column({ nullable: true })
  riskRating?: number;

  @Column({ nullable: true })
  isSuspended?: boolean;

  @Column({ nullable: true })
  isBanned?: boolean;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Balance)
  @JoinColumn()
  balance: Balance;
}
