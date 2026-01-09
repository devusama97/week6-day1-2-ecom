import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { LoyaltyService } from '../loyalty/loyalty.service';
import { NotificationsService } from '../notifications/notifications.service';
import { StripeService } from '../stripe/stripe.service';
import { OrderStatus } from '../common/enums/order-status.enum';
import { PointsUtil } from '../common/utils/points.util';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private loyaltyService: LoyaltyService,
    private notificationsService: NotificationsService,
    @Inject(forwardRef(() => StripeService)) private stripeService: StripeService,
  ) { }


  async create(userId: string, createOrderDto: CreateOrderDto): Promise<any> {
    const user = await this.usersService.findOne(userId);

    if (!createOrderDto.items.length) {
      throw new BadRequestException('No items in order');
    }

    // Check if points are being used and validate
    if (createOrderDto.pointsUsed && createOrderDto.pointsUsed > 0) {
      if (user.loyaltyPoints < createOrderDto.pointsUsed) {
        throw new BadRequestException('Insufficient loyalty points');
      }
    }

    // Check if order contains loyalty-only products and validate
    let hasLoyaltyOnlyProducts = false;
    let totalPointsRequired = 0;
    const orderItemsForStripe = [];

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.product);
      if (product.type === 'loyalty_only') {
        hasLoyaltyOnlyProducts = true;
        totalPointsRequired += (product.pointsPrice || 0) * item.quantity;
      }

      // Prepare item for Stripe
      orderItemsForStripe.push({
        title: product.name,
        image: product.images?.[0] || '', // Assuming images array
        price: item.price,
        quantity: item.quantity,
        userId: userId, // Passed for metadata
      });
    }

    // For loyalty-only orders, validate points and set correct values
    if (hasLoyaltyOnlyProducts) {
      if (user.loyaltyPoints < totalPointsRequired) {
        throw new BadRequestException(`Insufficient points. Required: ${totalPointsRequired}, Available: ${user.loyaltyPoints}`);
      }
      createOrderDto.pointsUsed = totalPointsRequired;
    }

    // Update product stock (Reserve stock)
    for (const item of createOrderDto.items) {
      await this.productsService.updateStock(item.product, item.quantity);
    }

    // Calculate points earned (only for non-loyalty-only products)
    const pointsEarned = hasLoyaltyOnlyProducts ? 0 : PointsUtil.calculatePointsEarned(createOrderDto.total);

    // Determine if Stripe payment is needed
    // logic: If final amount > 0, we use Stripe.
    // If paid fully by points or price is 0, we skip Stripe.
    // Note: createOrderDto.total should be the final amount to pay (subtotal - points value + shipping + tax).
    const needsStripe = createOrderDto.total > 0 && createOrderDto.paymentMethod !== 'points';

    const order = new this.orderModel({
      user: userId,
      items: createOrderDto.items,
      totalAmount: createOrderDto.total,
      pointsUsed: createOrderDto.pointsUsed || 0,
      pointsEarned,
      shippingAddress: createOrderDto.shippingAddress,
      paymentMethod: createOrderDto.paymentMethod,
      status: createOrderDto.paymentMethod === 'card' ? OrderStatus.CONFIRMED : (needsStripe ? OrderStatus.PENDING : OrderStatus.CONFIRMED),
      paymentStatus: createOrderDto.paymentMethod === 'card' ? 'paid' : (needsStripe ? 'pending' : 'paid'),
    });

    const savedOrder = await order.save();

    // For card payments (Stripe Elements), payment is already successful
    if (createOrderDto.paymentMethod === 'card') {
      // Deduct points if used
      if (createOrderDto.pointsUsed && createOrderDto.pointsUsed > 0) {
        await this.usersService.updateLoyaltyPoints(userId, -createOrderDto.pointsUsed);
        await this.loyaltyService.recordPointsSpent(userId, createOrderDto.pointsUsed, savedOrder._id.toString());
      }

      // Add points earned
      if (pointsEarned > 0) {
        await this.usersService.updateLoyaltyPoints(userId, pointsEarned);
        await this.loyaltyService.recordPointsEarned(userId, pointsEarned, savedOrder._id.toString());
      }

      // Send notification
      await this.notificationsService.sendOrderConfirmation(userId, savedOrder._id.toString());
      
      return { order: savedOrder };
    }

    if (needsStripe && createOrderDto.paymentMethod !== 'card') {
      const successUrl = `http://localhost:3000/checkout/success?orderId=${savedOrder._id}`;
      const cancelUrl = `http://localhost:3000/checkout/cancel?orderId=${savedOrder._id}`;

      const session = await this.stripeService.createCheckoutSession(
        orderItemsForStripe,
        successUrl,
        cancelUrl,
      );

      savedOrder.stripeSessionId = session.id;
      await savedOrder.save();

      return {
        order: savedOrder,
        checkoutUrl: session.url,
      };
    }

    // If NO Stripe (Paid by points or free)
    // Deduct points immediately
    if (createOrderDto.pointsUsed && createOrderDto.pointsUsed > 0) {
      await this.usersService.updateLoyaltyPoints(userId, -createOrderDto.pointsUsed);
      await this.loyaltyService.recordPointsSpent(userId, createOrderDto.pointsUsed, savedOrder._id.toString());
    }

    // Add points earned immediately
    if (pointsEarned > 0) {
      await this.usersService.updateLoyaltyPoints(userId, pointsEarned);
      await this.loyaltyService.recordPointsEarned(userId, pointsEarned, savedOrder._id.toString());
    }

    // Send notification
    await this.notificationsService.sendOrderConfirmation(userId, savedOrder._id.toString());

    return { order: savedOrder };
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('user items.product')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findUserOrders(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('user items.product')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('user items.product')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async confirmOrderPayment(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    if (order.paymentStatus === 'paid') return order; // Already processed

    order.status = OrderStatus.CONFIRMED;
    order.paymentStatus = 'paid';
    await order.save();

    const userId = order.user.toString();

    // Deduct points if used
    if (order.pointsUsed && order.pointsUsed > 0) {
      await this.usersService.updateLoyaltyPoints(userId, -order.pointsUsed);
      await this.loyaltyService.recordPointsSpent(userId, order.pointsUsed, order._id.toString());
    }

    // Add points earned
    if (order.pointsEarned > 0) {
      await this.usersService.updateLoyaltyPoints(userId, order.pointsEarned);
      await this.loyaltyService.recordPointsEarned(userId, order.pointsEarned, order._id.toString());
    }

    // Send notification
    await this.notificationsService.sendOrderConfirmation(userId, order._id.toString());

    return order;
  }

  async handleStripePaymentSuccess(sessionId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ stripeSessionId: sessionId });
    if (!order) throw new NotFoundException('Order not found for session ' + sessionId);
    return this.confirmOrderPayment(order._id.toString());
  }
}