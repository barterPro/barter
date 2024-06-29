import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { Cart } from '../carts/cart.entity';
import { CreateCouponDto } from './dtos/create-coupon';
import { UpdateCouponDto } from './dtos/update-coupon';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async createCoupon(couponDto: CreateCouponDto): Promise<Coupon> {
    const coupon = this.couponRepository.create(couponDto);

    return await this.couponRepository.save(coupon);
  }

  async updateCoupon(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.findOneBy({ id });

    if (!coupon) throw new NotFoundException('Coupon does not exist');

    const updatedCoupon = { ...coupon, updateCouponDto };

    return await this.couponRepository.save(updatedCoupon);
  }

  async getCoupon(id: string) {
    const coupon = await this.couponRepository.findOneBy({ id });

    if (!coupon) throw new NotFoundException('Coupon does not exist');

    return coupon;
  }

  async applyCoupon(cartId: string, couponCode: string): Promise<Cart> {
    const coupon = await this.couponRepository.findOne({
      where: { code: couponCode, isActive: true },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found or inactive');
    }

    if (coupon.expiryDate < new Date()) {
      throw new BadRequestException('Coupon has expired');
    }

    const cart = await this.cartRepository.findOneBy({ id: cartId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    if (total < coupon.minimumOrderValue) {
      throw new BadRequestException(
        `Minimum order value to apply this coupon is ${coupon.minimumOrderValue}`,
      );
    }

    const discount =
      coupon.discountPercentage > 0
        ? (total * coupon.discountPercentage) / 100
        : coupon.discountAmount;

    cart.total = total - discount;

    return await this.cartRepository.save(cart);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expireCoupons() {
    const expiredCoupons = await this.couponRepository
      .createQueryBuilder('coupon')
      .where('coupon.expiryDate < :now', { now: new Date() })
      .andWhere('coupon.isActive = :isActive', { isActive: true })
      .getMany();

    for (const coupon of expiredCoupons) {
      coupon.isActive = false;
      await this.couponRepository.save(coupon);
    }
  }
}
