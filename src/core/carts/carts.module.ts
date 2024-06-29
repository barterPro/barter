import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartItem } from './cart-item.entity';
import { CouponsModule } from '../coupons/coupons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), CouponsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
