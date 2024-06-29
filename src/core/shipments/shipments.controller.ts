import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dtos/create-shipment';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentService: ShipmentsService) {}

  @Post()
  async createShipment(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.createShipment(createShipmentDto);
  }

  @Get('/order/:orderId')
  async getShipmentsByOrder(@Param('orderId') orderId: string) {
    return this.shipmentService.getShipmentsByOrder(orderId);
  }
}
