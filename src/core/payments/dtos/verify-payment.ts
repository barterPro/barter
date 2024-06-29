import { IsString } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  paymentReference: string;

  @IsString()
  paymentGateway: string;
}
