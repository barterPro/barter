import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CouponDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  discountPercentage: number;

  @Expose()
  discountAmount: number;

  @Expose()
  expiryDate: Date;

  @Expose()
  minimumOrderValue: number;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
