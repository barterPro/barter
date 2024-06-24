import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logAction(userId: string, action: string, details: string) {
    const logEntry = this.auditLogRepository.create({
      userId,
      action,
      details,
    });
    await this.auditLogRepository.save(logEntry);
  }
}

//usage
// @Injectable()
// export class OrderService {
//   constructor(private loggingService: LoggingService) {}

//   async placeOrder(userId: string, productId: string) {
//     // Place order logic...
//     await this.loggingService.logAction(
//       userId,
//       'PLACE_ORDER',
//       `User placed an order for product ${productId}`,
//     );
//   }
// }
