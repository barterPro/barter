import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Transaction,
  // TransactionType,
} from '../transactions/transaction.entity';
import { Balance } from '../balances/balances.entity';
import { CreateTransactionDto } from './dtos/create-transaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { balanceId, amount, type, referenceId } = createTransactionDto;

    const balance = await this.balanceRepository.findOneBy({ id: balanceId });
    if (!balance) {
      throw new NotFoundException('Balance not found');
    }

    const transaction = this.transactionRepository.create({
      balance,
      amount,
      type,
      referenceId,
    });

    // if (type === TransactionType.CREDIT) {
    //   balance.amount += amount;
    // } else if (type === TransactionType.DEBIT) {
    //   balance.amount -= amount;
    // }

    // await this.balanceRepository.save(balance);
    return this.transactionRepository.save(transaction);
  }

  async getTransactionsByBalance(balanceId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { balance: { id: balanceId } },
      relations: ['balance'],
    });
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: ['balance'],
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
}
