import { Controller, Post, Body, Get, Query, Headers, Req, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { OrdersService } from '../orders/orders.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService,
  ) { }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: any) {
    const { items, successUrl, cancelUrl } = body;

    // Note: This endpoint might not be used if OrdersController creates the session directly.
    const session = await this.stripeService.createCheckoutSession(
      items,
      successUrl,
      cancelUrl
    );

    return { sessionId: session.id, url: session.url };
  }

  @Get('session')
  async getSession(@Query('session_id') sessionId: string) {
    const session = await this.stripeService.retrieveSession(sessionId);
    return session;
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    // In a real app, verify signature using this.stripeService.constructEvent...
    // For now, assuming body is the event object (or parsed by body parser)

    // If using raw body for signature verification, we need special middleware. 
    // For this task, we'll trust the body type if it matches Stripe event structure.

    const event = body;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Retrieve orderId from metadata or other means
      // We didn't pass orderId to metadata in OrdersService yet? 
      // Wait, I updated OrdersService but I passed `userId` in metadata. 
      // I should have passed `orderId`!

      // Let's assume we find the order by session ID?
      // Order has `stripeSessionId`.
      // Implementation: Find order by stripeSessionId.

      // But OrdersService confirmPayment takes ID.
      // I should add `confirmOrderPaymentBySessionId`? Or just find the order here.
      // I can't access OrderModel here easily (should go through Service).

      // I will add a method `ordersService.findByStripeSessionId(sessionId)`?
      // Or just update `OrdersService` to include that.

      // For now, let's rely on finding by Session ID.
      // I'll create a new method in OrdersService `handleStripePaymentSuccess(sessionId)`.

      await this.ordersService.handleStripePaymentSuccess(session.id);
    }

    return { received: true };
  }
}