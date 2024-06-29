import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refund } from './refund.entity';
import { Order } from '../orders/order.entity';
import { User } from '../users/user.entity';
import { CreateRefundDto } from './dtos/create-refund';
import { UpdateRefundDto } from './dtos/update-refund';

@Injectable()
export class RefundsService {
  constructor(
    @InjectRepository(Refund)
    private readonly refundRepository: Repository<Refund>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRefund(createRefundDto: CreateRefundDto): Promise<Refund> {
    const order = await this.orderRepository.findOneBy({
      id: createRefundDto.orderId,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const user = await this.userRepository.findOneBy({
      userID: createRefundDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const refund = this.refundRepository.create({
      order,
      user,
      amount: createRefundDto.amount,
      reason: createRefundDto.reason,
      status: 'Pending',
    });

    return this.refundRepository.save(refund);
  }

  async updateRefund(
    id: string,
    updateRefundDto: UpdateRefundDto,
  ): Promise<Refund> {
    const refund = await this.refundRepository.findOneBy({ id });
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }

    refund.status = updateRefundDto.status;

    return this.refundRepository.save(refund);
  }

  async getRefundsByOrder(orderId: string): Promise<Refund[]> {
    return this.refundRepository.find({
      where: { order: { id: orderId } },
    });
  }
}
