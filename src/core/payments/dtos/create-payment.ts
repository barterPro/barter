import {
  IsNumber,
  IsString,
  IsUUID,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  paymentGateway: string;

  @IsNumber()
  userId: number;

  @IsUUID()
  orderId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  productIds: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  serviceIds: string[];

  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  provider?: string;
}
