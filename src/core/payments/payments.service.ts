import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Order } from '../orders/order.entity';
import { User } from '../users/user.entity';
import { CreatePaymentDto } from './dtos/create-payment';
import { VerifyPaymentDto } from './dtos/verify-payment';

import { FlutterwaveService } from '../../integrations/flutterwave/flutterwave.service';
import { PaystackService } from '../../integrations/paystack/paystack.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly flutterwaveService: FlutterwaveService,
    private readonly paystackService: PaystackService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: createPaymentDto.orderId },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const user = await this.userRepository.findOne({
      where: { userID: createPaymentDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payment = this.paymentRepository.create({
      orders: [order],
      userId: createPaymentDto.userId,
      price: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      status: 'Pending',
      paymentGateway: createPaymentDto.paymentGateway,
      productIds: createPaymentDto.productIds,
      serviceIds: createPaymentDto.serviceIds,
      paymentMethod: createPaymentDto.paymentMethod,
    });

    const savedPayment = await this.paymentRepository.save(payment);

    let paymentUrl;
    if (createPaymentDto.paymentGateway === 'Flutterwave') {
      paymentUrl = await this.flutterwaveService.initiatePayment(savedPayment);
    } else if (createPaymentDto.paymentGateway === 'Paystack') {
      paymentUrl = await this.paystackService.initiatePayment(savedPayment);
    } else {
      throw new BadRequestException('Invalid payment gateway');
    }

    return {
      paymentId: savedPayment.id,
      paymentUrl,
    };
  }

  async verifyPayment(verifyPaymentDto: VerifyPaymentDto): Promise<Payment> {
    let verificationResponse;

    if (verifyPaymentDto.paymentGateway === 'Flutterwave') {
      verificationResponse = await this.flutterwaveService.verifyPayment(
        verifyPaymentDto.paymentReference,
      );
    } else if (verifyPaymentDto.paymentGateway === 'Paystack') {
      verificationResponse = await this.paystackService.verifyPayment(
        verifyPaymentDto.paymentReference,
      );
    } else {
      throw new BadRequestException('Invalid payment gateway');
    }

    const payment = await this.paymentRepository.findOne({
      where: { paymentReference: verifyPaymentDto.paymentReference },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = verificationResponse.status;
    payment.transactionId = verificationResponse.transactionId;

    return this.paymentRepository.save(payment);
  }

  async processSuccessfulPayment(payload: any) {
    console.log(payload);
    // Implement logic for handling successful payments
  }

  async processFailedPayment(payload: any) {
    console.log(payload);
    // Implement logic for handling failed payments
  }

  async getPaymentById(id: string): Promise<Payment> {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async generatePaymentLink(createPaymentDto: CreatePaymentDto): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: createPaymentDto.orderId },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const user = await this.userRepository.findOne({
      where: { userID: createPaymentDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payment = this.paymentRepository.create({
      orders: [order],
      userId: createPaymentDto.userId,
      price: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      status: 'Pending',
      paymentGateway: createPaymentDto.paymentGateway,
      productIds: createPaymentDto.productIds,
      serviceIds: createPaymentDto.serviceIds,
      paymentMethod: createPaymentDto.paymentMethod,
    });

    const savedPayment = await this.paymentRepository.save(payment);

    let paymentUrl;
    if (createPaymentDto.paymentGateway === 'Flutterwave') {
      paymentUrl = await this.flutterwaveService.initiatePayment(savedPayment);
    } else if (createPaymentDto.paymentGateway === 'Paystack') {
      paymentUrl = await this.paystackService.initiatePayment(savedPayment);
    } else {
      throw new BadRequestException('Invalid payment gateway');
    }

    savedPayment.paymentLink = paymentUrl;
    await this.paymentRepository.save(savedPayment);

    return {
      paymentId: savedPayment.id,
      paymentUrl,
    };
  }
}
