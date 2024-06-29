import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';
import { CreateCartItemDto } from './dtos/create-cartItem';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
  ) {}

  async initCart() {
    const activeCart = await this.cartsRepository.findOne({
      where: { isActive: true, isExpired: false },
    });

    if (!activeCart) {
      const newCart = this.cartsRepository.create();

      return await this.cartsRepository.save(newCart);
    }

    return activeCart;
  }

  async addItemsToCart(body: CreateCartItemDto, id: string) {
    const cartItem = await this.cartItemsRepository.create(body);
    const savedCartItem = await this.cartItemsRepository.save(cartItem);

    const cart = await this.cartsRepository.findOneBy({ id });
    const updatedCart = { ...cart, productId: savedCartItem.productId };

    return await this.cartItemsRepository.save(updatedCart);
  }

  async deleteCartItem(id: string) {
    const cartItem = await this.cartItemsRepository.findOneBy({ id });

    if (cartItem)
      throw new BadRequestException(
        'An error occurred deleting this item, please try again',
      );

    return await this.cartItemsRepository.remove(cartItem);
  }

  async updateCartItem(updates: Partial<CartItem>, id: string) {
    const cartItem = await this.cartItemsRepository.findOneBy({ id });

    if (cartItem)
      throw new BadRequestException('An error occurred, please try again');

    const udpatedCartItem = { ...cartItem, updates };

    return await this.cartItemsRepository.save(udpatedCartItem);
  }

  async deleteCart(id: string) {
    const cart = await this.cartsRepository.findOneBy({ id });

    if (!cart)
      throw new NotFoundException('An error occurred, please try again');

    const cartItems = cart.items.map((cartItem) => cartItem.id);

    await this.cartItemsRepository.delete(cartItems);

    return await this.cartsRepository.remove(cart);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expireOldCarts() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const expiredCarts = await this.cartsRepository.find({
      where: { createdAt: LessThan(oneWeekAgo) },
    });

    for (const cart of expiredCarts) {
      cart.isExpired = true;
      await this.cartsRepository.save(cart);
    }
  }
}
