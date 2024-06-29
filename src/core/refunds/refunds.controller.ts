import { Controller, Post, Param, Body, Get, Patch } from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { CreateRefundDto } from './dtos/create-refund';
import { UpdateRefundDto } from './dtos/update-refund';

@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundService: RefundsService) {}

  @Post()
  async createRefund(@Body() createRefundDto: CreateRefundDto) {
    return this.refundService.createRefund(createRefundDto);
  }

  @Patch('/:id')
  async updateRefund(
    @Param('id') id: string,
    @Body() updateRefundDto: UpdateRefundDto,
  ) {
    return this.refundService.updateRefund(id, updateRefundDto);
  }

  @Get('/order/:orderId')
  async getRefundsByOrder(@Param('orderId') orderId: string) {
    return this.refundService.getRefundsByOrder(orderId);
  }
}
