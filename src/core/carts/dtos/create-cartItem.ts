import { IsString, IsUUID, IsNumber, IsDecimal } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  readonly cartId: string;

  @IsString()
  readonly productId: string;

  @IsNumber()
  readonly quantity: number;

  @IsDecimal()
  readonly price: number;
}
