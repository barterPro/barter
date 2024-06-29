import { CouponsService } from './../coupons/coupons.service';
import {
  Controller,
  Post,
  Delete,
  Patch,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartItemDto } from './dtos/create-cartItem';
import { UpdateCartItemDto } from './dtos/update-cartItem';
import { ApplyCouponCodeDto } from '../coupons/dtos/apply-coupon';

@Controller('carts')
export class CartsController {
  constructor(
    private cartsService: CartsService,
    private couponsService: CouponsService,
  ) {}

  @Get()
  async getCart() {
    return await this.cartsService.initCart();
  }

  @Post('/:id/items')
  async addItemToCart(
    @Body() body: CreateCartItemDto,
    @Param('id') id: string,
  ) {
    return await this.cartsService.addItemsToCart(body, id);
  }

  @Post('/:id/apply-coupon')
  async applyCouponToCart(
    @Body() body: ApplyCouponCodeDto,
    @Param('id') id: string,
  ) {
    return await this.couponsService.applyCoupon(id, body.couponCode);
  }

  @Delete('/:id/items/:cartItemId')
  async deleteCartItem(@Param('cartItemId') cartItemId: string) {
    return await this.cartsService.deleteCartItem(cartItemId);
  }

  @Patch('/:id/items/:cartItemId')
  async updateCartItem(
    @Body() body: UpdateCartItemDto,
    @Param('cartItemId') cartItemId: string,
  ) {
    return await this.cartsService.updateCartItem(body, cartItemId);
  }

  @Delete('/:id')
  async deleteCart(@Param('id') id: string) {
    return await this.cartsService.deleteCart(id);
  }
}
