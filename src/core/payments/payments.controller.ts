import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment';
import { VerifyPaymentDto } from './dtos/verify-payment';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<any> {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Post('verify')
  async verifyPayment(
    @Body() verifyPaymentDto: VerifyPaymentDto,
  ): Promise<Payment> {
    return this.paymentsService.verifyPayment(verifyPaymentDto);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string): Promise<Payment> {
    const payment = await this.paymentsService.getPaymentById(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  @Post('success')
  async processSuccessfulPayment(@Body() payload: any) {
    return this.paymentsService.processSuccessfulPayment(payload);
  }

  @Post('fail')
  async processFailedPayment(@Body() payload: any) {
    return this.paymentsService.processFailedPayment(payload);
  }

  @Post('generate-link')
  async generatePaymentLink(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.generatePaymentLink(createPaymentDto);
  }
}
