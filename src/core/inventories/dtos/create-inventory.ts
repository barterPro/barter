import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  storageId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
