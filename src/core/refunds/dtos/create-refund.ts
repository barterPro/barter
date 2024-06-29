export class CreateRefundDto {
  orderId: string;
  userId: string;
  amount: number;
  reason: string;
}
