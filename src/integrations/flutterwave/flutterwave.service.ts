import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FlutterwaveService {
  private readonly baseUrl = 'https://api.flutterwave.com/v3';
  private readonly secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

  async initiatePayment(payment) {
    const response = await axios.post(
      `${this.baseUrl}/payments`,
      {
        tx_ref: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        redirect_url: 'http://your-redirect-url.com',
        customer: {
          email: payment.user.email,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      },
    );

    return response.data.data.link;
  }

  async verifyPayment(paymentReference: string) {
    const response = await axios.get(
      `${this.baseUrl}/transactions/${paymentReference}/verify`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      },
    );

    return response.data.data;
  }
}
