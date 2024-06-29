import {
  Controller,
  Post,
  Param,
  Body,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { WishlistService } from './wishlists.service';
import { CreateWishlistItemDto } from './dtos/create-wishlist-item';
import { UpdateWishlistDto } from './dtos/update-wishlist';

@Controller('wishlists')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post()
  async createWishlist(@Body('userId') userId: string) {
    return await this.wishlistService.createWishlist(userId);
  }

  @Post('/:wishlistId/items')
  async addItemToWishlist(
    @Param('wishlistId') wishlistId: string,
    @Body() createWishlistItemDto: CreateWishlistItemDto,
  ) {
    return await this.wishlistService.addItemToWishlist(
      wishlistId,
      createWishlistItemDto,
    );
  }

  @Delete('/:wishlistId/items/:itemId')
  async removeItemFromWishlist(
    @Param('wishlistId') wishlistId: string,
    @Param('itemId') itemId: string,
  ) {
    return await this.wishlistService.removeItemFromWishlist(
      wishlistId,
      itemId,
    );
  }

  @Patch('/:wishlistId')
  async updateWishlist(
    @Param('wishlistId') wishlistId: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistService.updateWishlist(wishlistId, updateWishlistDto);
  }

  @Get('/user/:userId')
  async getWishlistByUser(@Param('userId') userId: string) {
    return this.wishlistService.getWishlistByUser(userId);
  }
}
