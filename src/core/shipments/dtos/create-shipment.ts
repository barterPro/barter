export class CreateShipmentDto {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  shippedDate: Date;
}
