import { IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  userId: string;
}
