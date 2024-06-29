import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualBalance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  lockedBalance: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.balance)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.balance)
  transactions: Transaction[];
}
