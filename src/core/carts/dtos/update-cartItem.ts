import {
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  IsDecimal,
} from 'class-validator';

export class UpdateCartItemDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly productId?: string;

  @IsNumber()
  @IsOptional()
  readonly quantity?: number;

  @IsDecimal()
  @IsOptional()
  readonly price?: number;
}
