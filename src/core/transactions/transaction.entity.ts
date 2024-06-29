import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Balance } from '../balances/balances.entity';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  LOCK = 'LOCK',
  RELEASE = 'RELEASE',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Balance, (balance) => balance.transactions)
  balance: Balance;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ nullable: true })
  referenceId?: string;

  @CreateDateColumn()
  createdAt: Date;
}
