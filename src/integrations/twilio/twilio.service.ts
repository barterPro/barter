import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import config from '../../../twilio.config';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;

  constructor() {
    this.client = Twilio(config.accountSid, config.authToken);
  }

  async sendSms(to: string, body: string) {
    return this.client.messages.create({
      body,
      from: config.from,
      to,
    });
  }
}
