import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../core/users/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // async createNotification(userId: string, type: string, content: string) {
  //   const user = await this.userRepository.findOne(userId);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   const notification = this.notificationRepository.create({
  //     user,
  //     type,
  //     content,
  //   });
  //   await this.notificationRepository.save(notification);

  //   if (type == 'SMS') {
  //     // Send SMS
  //     await this.twilioService.sendSms(user.phoneNumber, content);
  //   } else if (type == 'email') {
  //     const result = await this.sendGridService.sendEmail(
  //       user.email,
  //       subject,
  //       content,
  //       htmlContent,
  //     );

  //     return result;
  //   }
  // }

  // async markAsRead(notificationId: string) {
  //   const notification =
  //     await this.notificationRepository.findOne(notificationId);
  //   if (notification) {
  //     notification.isRead = true;
  //     await this.notificationRepository.save(notification);
  //   }
  // }

  // async getUserNotifications(userId: string) {
  //   return this.notificationRepository.find({
  //     where: { user: { id: userId } },
  //     order: { createdAt: 'DESC' },
  //   });
  // }
}
