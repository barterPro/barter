import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
