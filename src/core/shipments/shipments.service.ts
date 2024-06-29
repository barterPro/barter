import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { Order } from '../orders/order.entity';
import { CreateShipmentDto } from './dtos/create-shipment';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentsRepository: Repository<Shipment>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async createShipment(createShipmentDto: CreateShipmentDto) {
    const order = await this.ordersRepository.findOneBy({
      id: createShipmentDto.orderId,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const shipment = this.shipmentsRepository.create({
      order,
      trackingNumber: createShipmentDto.trackingNumber,
      carrier: createShipmentDto.carrier,
      status: createShipmentDto.status,
      shippedDate: createShipmentDto.shippedDate,
    });

    return await this.shipmentsRepository.save(shipment);
  }

  async getShipmentsByOrder(orderId: string) {
    return await this.shipmentsRepository.find({
      where: { order: { id: orderId } },
    });
  }
}
