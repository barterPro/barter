import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from '../orders/order-item.entitiy';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';
import { CreateOrderDto } from './dtos/create-order';
import { Product } from '../products/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOneBy({
      userID: createOrderDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payment = await this.paymentRepository.findOneBy({
      id: createOrderDto.paymentId,
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const order = this.orderRepository.create({
      user,
      payment,
      total: createOrderDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      status: 'Pending',
    });

    const orderItems = createOrderDto.items.map((itemDto) => {
      const orderItem = this.orderItemRepository.create({
        product: { id: itemDto.productId } as Product,
        quantity: itemDto.quantity,
        price: itemDto.price,
      });
      return orderItem;
    });

    order.items = await this.orderItemRepository.save(orderItems);

    //  await this.escrowService.createEscrow(
    //    savedOrder,
    //    virtualAccountNumber,
    //    totalAmount,
    //  );

    return this.orderRepository.save(order);
  }

  //Call this when order is marked as completed
  // async completeOrder(orderId: string) {
  //   const order = await this.orderRepository.findOne(orderId, {
  //     relations: ['escrow'],
  //   });
  //   if (order && order.escrow) {
  //     await this.escrowService.releaseFunds(order.escrow.id);
  //     // Update order status to completed
  //     return this.orderRepository.save(order);
  //   }
  //   throw new Error('Order or Escrow not found');
  // }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { userID: userId } },
      relations: ['items', 'items.product', 'payment'],
    });
  }
}
