import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  discountPercentage: number;

  @IsDecimal()
  discountAmount: number;

  @IsDate()
  expiryDate: Date;

  @IsDecimal()
  minimumOrderValue: number;

  @IsOptional()
  @IsString()
  isActive?: boolean;
}
