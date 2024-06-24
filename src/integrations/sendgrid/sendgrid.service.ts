import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import config from '../../../sendgrid.config';

@Injectable()
export class SendGridService {
  constructor() {
    sgMail.setApiKey(config.apiKey);
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: config.fromEmail,
      subject,
      text,
      html,
    };
    try {
      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Error sending email', error);
      if (error.response) {
        console.error(error.response.body);
      }
      return { success: false, error };
    }
  }
}
