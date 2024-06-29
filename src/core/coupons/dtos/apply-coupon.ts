import { IsString } from 'class-validator';

export class ApplyCouponCodeDto {
  @IsString()
  couponCode: string;
}
