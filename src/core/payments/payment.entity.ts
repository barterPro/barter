import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @Column()
  paymentGateway: string;

  @Column({ nullable: true })
  paymentReference?: string;

  @Column({ nullable: true })
  virtualAccountNumber?: string;

  @Column({ nullable: true, type: 'text' })
  transactionDate?: Date;

  @Column({ nullable: true })
  cardType?: string;

  @Column({ nullable: true })
  last4Digits?: string;

  @Column()
  userId: number;

  @Column('uuid', { array: true })
  productIds: string[];

  @Column('uuid', { array: true })
  serviceIds: string[];

  @Column()
  paymentMethod: string;

  @Column()
  transactionId: string;

  @Column()
  provider: string;

  @Column({ nullable: true })
  virtualAccountId?: string;

  @Column({ nullable: true })
  refundId?: string;

  @Column({ type: 'simple-array', nullable: true })
  additionalInfo?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
