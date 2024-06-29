import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistItem } from './wishlist-item.entity';
import { User } from '../users/user.entity';
import { CreateWishlistItemDto } from './dtos/create-wishlist-item';
import { UpdateWishlistDto } from './dtos/update-wishlist';
import { Product } from '../products/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createWishlist(userId: string) {
    const user = await this.userRepository.findOneBy({ userID: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const wishlist = this.wishlistRepository.create({ user });
    return await this.wishlistRepository.save(wishlist);
  }

  async addItemToWishlist(
    wishlistId: string,
    createWishlistItemDto: CreateWishlistItemDto,
  ) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: wishlistId,
      },
      relations: ['items'],
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    const product = await this.productRepository.findOneBy({
      id: createWishlistItemDto.productId,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const wishlistItem = this.wishlistItemRepository.create({
      wishlist,
      product,
    });
    return await this.wishlistItemRepository.save(wishlistItem);
  }

  async removeItemFromWishlist(wishlistId: string, wishlistItemId: string) {
    const wishlistItem = await this.wishlistItemRepository.findOne({
      where: {
        id: wishlistItemId,
      },
      relations: ['wishlist'],
    });
    if (!wishlistItem || wishlistItem.wishlist.id !== wishlistId) {
      throw new NotFoundException('Wishlist item not found');
    }
    return await this.wishlistItemRepository.remove(wishlistItem);
  }

  async updateWishlist(
    wishlistId: string,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: wishlistId,
      },
      relations: ['items'],
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    await this.wishlistItemRepository.delete({ wishlist });
    const items = updateWishlistDto.items.map((itemDto) =>
      this.wishlistItemRepository.create({
        wishlist,
        product: { id: itemDto.productId } as Product,
      }),
    );
    await this.wishlistItemRepository.save(items);
    return await this.wishlistRepository.findOne({
      where: {
        id: wishlistId,
      },
      relations: ['items'],
    });
  }

  async getWishlistByUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        userID: userId,
      },
      relations: ['wishlists', 'wishlists.items', 'wishlists.items.product'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.wishlists;
  }
}
