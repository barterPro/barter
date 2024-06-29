import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReleaseStockDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
