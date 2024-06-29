import { IsString } from 'class-validator';

export class CreateWishlistItemDto {
  @IsString()
  productId: string;
}
