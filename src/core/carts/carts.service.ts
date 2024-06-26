import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/create-cart';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(Cart) private cartsService: Repository<Cart>) {}

  async addAddress(body: CreateCartDto) {
    const cart = await this.cartsService.create(body);

    return await this.cartsService.save(cart);
  }

  async getAllAddresses() {
    return await this.cartsService.find();
  }

  async getOneAddress(id: string) {
    const cart = await this.cartsService.findOneBy({ id });

    if (!cart) throw new NotFoundException('Cart does not exist');

    return cart;
  }

  async updateAddress(updates: Partial<Cart>, id: string) {
    const cart = await this.cartsService.findOneBy({ id });

    if (!cart) throw new NotFoundException('Cart does not exist');

    const updatedAddress = { ...cart, ...updates };

    return await this.cartsService.save(updatedAddress);
  }

  async deleteAddress(id: string) {
    const cart = await this.cartsService.findOneBy({ id });

    if (!cart) throw new NotFoundException('Cart does not exist');

    return await this.cartsService.remove(cart);
  }
}
