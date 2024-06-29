import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escrow } from './escrow.entity';
import { Order } from '../orders/order.entity';

@Injectable()
export class EscrowService {
  constructor(
    @InjectRepository(Escrow)
    private readonly escrowRepository: Repository<Escrow>,
  ) {}

  async createEscrow(
    order: Order,
    virtualAccountNumber: string,
    amount: number,
  ) {
    const escrow = this.escrowRepository.create({
      order,
      virtualAccountNumber,
      amount,
      isReleased: false,
    });
    return this.escrowRepository.save(escrow);
  }

  async releaseFunds(escrowId: string) {
    const escrow = await this.escrowRepository.findOneBy({ id: escrowId });
    if (escrow) {
      escrow.isReleased = true;
      return this.escrowRepository.save(escrow);
    }
    throw new Error('Escrow not found');
  }
}
