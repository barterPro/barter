import { CreateOrderItemDto } from './create-order-item';

export class CreateOrderDto {
  userId: string;
  items: CreateOrderItemDto[];
  paymentId: string;
}
