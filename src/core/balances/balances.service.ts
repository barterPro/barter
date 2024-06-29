import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Balance } from './balances.entity';
import { Transaction } from '../transactions/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/transaction.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BalancesService {
  constructor(
    private transactionsService: TransactionsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Balance)
    private balancesRepository: Repository<Balance>,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createBalance(userId: number): Promise<Balance> {
    const balance = this.balancesRepository.create();
    balance.user = { id: userId } as any;
    return this.balancesRepository.save(balance);
  }

  async getBalanceByUserId(userId: number | string) {
    // Will fix when I decide id vs uuid
    const user = await this.usersRepository.findOneBy({
      userID: String(userId),
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const balance = await this.balancesRepository.findOne({
      where: { user },
    });
    if (!balance) {
      throw new NotFoundException(`Balance for user ${userId} not found`);
    }
    return balance;
  }

  async lockFunds(userId: number, amount: number): Promise<Balance> {
    return await this.balancesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const balance = await this.getBalanceWithLock(
          userId,
          transactionalEntityManager,
        );

        if (amount <= 0) {
          throw new BadRequestException('Amount must be greater than zero');
        }

        if (balance.actualBalance < amount) {
          throw new ConflictException('Insufficient actual balance');
        }

        balance.actualBalance -= amount;
        balance.lockedBalance += amount;
        return transactionalEntityManager.save(balance);
      },
    );
  }

  async releaseLockedFunds(userId: number, amount: number): Promise<Balance> {
    return await this.balancesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const balance = await this.getBalanceWithLock(
          userId,
          transactionalEntityManager,
        );

        if (amount <= 0) {
          throw new BadRequestException('Amount must be greater than zero');
        }

        if (balance.lockedBalance < amount) {
          throw new ConflictException('Insufficient locked balance');
        }

        balance.lockedBalance -= amount;
        balance.actualBalance += amount;
        return transactionalEntityManager.save(balance);
      },
    );
  }

  async debitActualBalance(userId: number, amount: number): Promise<Balance> {
    return await this.balancesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const balance = await this.getBalanceWithLock(
          userId,
          transactionalEntityManager,
        );

        if (amount <= 0) {
          throw new BadRequestException('Amount must be greater than zero');
        }

        if (balance.actualBalance < amount) {
          throw new ConflictException('Insufficient actual balance');
        }

        balance.actualBalance -= amount;

        await this.transactionsService.createTransaction({
          balanceId: balance.id,
          amount,
          type: TransactionType.LOCK,
        });

        return transactionalEntityManager.save(balance);
      },
    );
  }

  private async getBalanceWithLock(
    userId: number,
    entityManager: EntityManager,
  ): Promise<Balance> {
    // Will fix when I decide id vs uuid
    const user = await this.usersRepository.findOneBy({
      userID: String(userId),
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const balance = await entityManager.findOne(Balance, {
      where: { user },
      lock: { mode: 'pessimistic_write' },
    });
    if (!balance) {
      throw new NotFoundException(`Balance for user ${userId} not found`);
    }
    return balance;
  }
}
