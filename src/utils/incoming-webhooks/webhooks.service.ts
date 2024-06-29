// import { Injectable, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Webhook } from './webhook.entity';
// import { CreateWebhookDto } from './dtos/create-webhook';
// import { PaymentsService } from '../../core/payments/payments.service';
// import { ShipmentsService } from '../../core/shipments/shipments.service';
// import { InventoriesService } from '../../core/inventories/inventories.service';

// @Injectable()
// export class WebhooksService {
//   private readonly logger = new Logger(WebhooksService.name);

//   constructor(
//     @InjectRepository(Webhook)
//     private readonly webhookRepository: Repository<Webhook>,
//     private readonly paymentsService: PaymentsService,
//     private readonly shipmentsService: ShipmentsService,
//     private readonly inventoriesService: InventoriesService,
//   ) {}

//   async handleWebhook(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
//     const { source, eventType, payload } = createWebhookDto;
//     const webhook = this.webhookRepository.create(createWebhookDto);
//     await this.webhookRepository.save(webhook);

//     switch (source) {
//       case 'Paystack':
//       case 'Flutterwave':
//         await this.handlePaymentWebhook(eventType, payload);
//         break;
//       case 'Shipments':
//         await this.handleShipmentWebhook(eventType, payload);
//         break;
//       case 'Inventory':
//         await this.handleInventoryWebhook(eventType, payload);
//         break;
//       default:
//         this.logger.warn(`Unhandled webhook source: ${source}`);
//     }

//     return webhook;
//   }

//   private async handlePaymentWebhook(eventType: string, payload: any) {
//     // switch (eventType) {
//     //   case 'charge.success':
//     //     await this.paymentsService.processSuccessfulPayment(payload);
//     //     break;
//     //   case 'charge.failed':
//     //     await this.paymentsService.processFailedPayment(payload);
//     //     break;
//     //   default:
//     //     this.logger.warn(`Unhandled payment event type: ${eventType}`);
//     // }

//     const { source, eventType, payload } = createWebhookDto;

//     // Log the incoming webhook
//     // this.auditLogService.logWebhook(createWebhookDto);

//     // Process the webhook based on source and eventType
//     switch (source) {
//       case 'Flutterwave':
//         await this.handleFlutterwaveWebhook(eventType, payload);
//         break;
//       case 'Paystack':
//         await this.handlePaystackWebhook(eventType, payload);
//         break;
//       case 'Shipments':
//         await this.handleShipmentWebhook(eventType, payload);
//         break;
//       default:
//         this.logger.warn(`Unhandled webhook source: ${source}`);
//     }
//   }

//   private async handleFlutterwaveWebhook(eventType: string, payload: any) {
//     if (eventType === 'charge.completed' && payload.status === 'successful') {
//       const payment = await this.paymentRepository.findOne({
//         paymentReference: payload.txRef,
//       });
//       if (payment) {
//         payment.status = 'completed';
//         await this.paymentRepository.save(payment);
//         await this.updateOrderStatus(payment.orderId, 'paid');
//       }
//     }
//   }

//   private async handlePaystackWebhook(eventType: string, payload: any) {
//     if (eventType === 'charge.success' && payload.data.status === 'success') {
//       const payment = await this.paymentRepository.findOne({
//         paymentReference: payload.data.reference,
//       });
//       if (payment) {
//         payment.status = 'completed';
//         await this.paymentRepository.save(payment);
//         await this.updateOrderStatus(payment.orderId, 'paid');
//       }
//     }
//   }

//   private async handleShipmentWebhook(eventType: string, payload: any) {
//     switch (eventType) {
//       case 'shipment.created':
//         await this.shipmentsService.processShipmentCreated(payload);
//         break;
//       case 'shipment.delivered':
//         await this.shipmentsService.processShipmentDelivered(payload);
//         break;
//       default:
//         this.logger.warn(`Unhandled shipment event type: ${eventType}`);
//     }
//   }

//   private async handleInventoryWebhook(eventType: string, payload: any) {
//     switch (eventType) {
//       case 'inventory.updated':
//         await this.inventoriesService.processInventoryUpdated(payload);
//         break;
//       default:
//         this.logger.warn(`Unhandled inventory event type: ${eventType}`);
//     }
//   }
// }
