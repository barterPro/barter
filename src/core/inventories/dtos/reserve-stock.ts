import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReserveStockDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
