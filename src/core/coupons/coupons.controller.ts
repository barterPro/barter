import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dtos/create-coupon';
import { UpdateCouponDto } from './dtos/update-coupon';

@Controller('coupons')
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Post()
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return await this.couponsService.createCoupon(createCouponDto);
  }

  @Put(':id')
  async updateCoupon(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return await this.couponsService.updateCoupon(id, updateCouponDto);
  }

  @Get(':id')
  async getCoupon(@Param('id') id: string) {
    return await this.couponsService.getCoupon(id);
  }
}
