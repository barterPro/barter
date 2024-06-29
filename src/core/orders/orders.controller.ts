import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get('/user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }
}
