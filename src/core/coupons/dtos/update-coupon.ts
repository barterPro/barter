import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsDate,
  IsOptional,
} from 'class-validator';

export class UpdateCouponDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDecimal()
  discountPercentage?: number;

  @IsOptional()
  @IsDecimal()
  discountAmount?: number;

  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @IsOptional()
  @IsDecimal()
  minimumOrderValue?: number;

  @IsOptional()
  @IsString()
  isActive?: boolean;
}
