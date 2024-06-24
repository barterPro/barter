import {
  Controller,
  // Post,
  // Param,
  // Body,
  // Get,
  // Put
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @Post()
  // async createNotification(
  //   @Body('userId') userId: string,
  //   @Body('type') type: string,
  //   @Body('content') content: string,
  // ) {
  //   await this.notificationService.createNotification(userId, type, content);
  // }

  // @Put(':id/read')
  // async markAsRead(@Param('id') id: string) {
  //   await this.notificationService.markAsRead(id);
  // }

  // @Get('user/:userId')
  // async getUserNotifications(@Param('userId') userId: string) {
  //   return this.notificationService.getUserNotifications(userId);
  // }
}
