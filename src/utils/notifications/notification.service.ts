import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../../core/users/user.entity';

import { TwilioService } from 'src/integrations/twilio/twilio.service';
import { SendGridService } from 'src/integrations/sendgrid/sendgrid.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TwilioService)
    private twilioService: TwilioService,
    @InjectRepository(SendGridService)
    private sendGridService: SendGridService,
  ) {}

  async createNotification(userId: string, type: string, content: string) {
    const user = await this.userRepository.findOneBy({ userID: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const subject = 'Placeholder';
    const htmlContent = 'Placeholder';

    const notification = this.notificationRepository.create({
      user,
      type,
      content,
    });
    await this.notificationRepository.save(notification);

    if (type == 'SMS') {
      // Send SMS
      await this.twilioService.sendSms(user.phone, content);
    } else if (type == 'email') {
      const result = await this.sendGridService.sendEmail(
        user.email,
        subject,
        content,
        htmlContent,
      );

      return result;
    }
  }

  async markAsRead(notificationId: string) {
    const notification = await this.notificationRepository.findOneBy({
      id: notificationId,
    });
    if (notification) {
      notification.isRead = true;
      await this.notificationRepository.save(notification);
    }
  }

  async getUserNotifications(userId: string) {
    return this.notificationRepository.find({
      where: { user: { userID: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
