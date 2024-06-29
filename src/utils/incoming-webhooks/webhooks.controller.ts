// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { WebhooksService } from './webhooks.service';

// @Controller('webhooks')
// export class WebhooksController {
//   constructor(private readonly webhooksService: WebhooksService) {}

//   @Post('flutterwave')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   async handleFlutterwaveWebhook(@Body() payload: any): Promise<void> {
//     const eventType = payload.event; // Adjust based on Flutterwave's payload structure
//     await this.webhooksService.handleWebhook({
//       source: 'Flutterwave',
//       eventType,
//       payload,
//     });
//   }

//   @Post('paystack')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   async handlePaystackWebhook(@Body() payload: any): Promise<void> {
//     const eventType = payload.event; // Adjust based on Paystack's payload structure
//     await this.webhooksService.handleWebhook({
//       source: 'Paystack',
//       eventType,
//       payload,
//     });
//   }

//   @Post('shipments')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   async handleShipmentWebhook(@Body() payload: any): Promise<void> {
//     const eventType = payload.event; // Adjust based on shipment service's payload structure
//     await this.webhooksService.handleWebhook({
//       source: 'Shipments',
//       eventType,
//       payload,
//     });
//   }

//   // Add more webhook endpoints as needed
// }
