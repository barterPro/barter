import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaystackService {
  private readonly baseUrl = 'https://api.paystack.co';
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY;

  async initiatePayment(payment) {
    const response = await axios.post(
      `${this.baseUrl}/transaction/initialize`,
      {
        reference: payment.id,
        amount: payment.amount * 100, // Paystack expects amount in kobo
        email: payment.user.email,
        currency: payment.currency,
        callback_url: 'http://your-redirect-url.com',
      },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      },
    );

    return response.data.data.authorization_url;
  }

  async verifyPayment(paymentReference: string) {
    const response = await axios.get(
      `${this.baseUrl}/transaction/verify/${paymentReference}`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      },
    );

    return response.data.data;
  }
}
