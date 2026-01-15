import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: any) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata: metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Payment Intent creation error:', error);
      throw error;
    }
  }

  async createCheckoutSession(items: any[], successUrl: string, cancelUrl: string, shippingInfo?: any) {
    try {
      console.log('Creating Stripe session with items:', items);

      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));

      const sessionConfig: any = {
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        locale: 'en',
        metadata: {
          userId: items[0]?.userId || '',
        },
      };

      // Add shipping if provided
      if (shippingInfo && shippingInfo.email) {
        sessionConfig.customer_email = shippingInfo.email;
        sessionConfig.shipping_address_collection = {
          allowed_countries: ['US', 'CA', 'GB', 'AU']
        };
      }

      console.log('Session config:', sessionConfig);

      const session = await this.stripe.checkout.sessions.create(sessionConfig);

      console.log('Created session:', { id: session.id, url: session.url });

      return session;
    } catch (error) {
      console.error('Stripe session creation error:', error);
      throw error;
    }
  }

  async retrieveSession(sessionId: string) {
    return await this.stripe.checkout.sessions.retrieve(sessionId);
  }
}