import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const createPaymentIntent = async (amount: number, metadata?: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  try {
    const response = await fetch(`${apiUrl}/stripe/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'usd',
        metadata
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const data = responseData.data || responseData;
    
    return data;
  } catch (error) {
    console.error('Payment Intent error:', error);
    throw error;
  }
};

export const createCheckoutSession = async (items: any[], shippingInfo?: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  try {
    console.log('Making request to:', `${apiUrl}/stripe/create-checkout-session`);
    console.log('Items:', items);
    
    const response = await fetch(`${apiUrl}/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        shippingInfo,
        successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Session response:', responseData);
    
    // Handle wrapped response from ResponseInterceptor
    const session = responseData.data || responseData;
    
    if (session.error) {
      throw new Error(session.error);
    }

    if (!session.url) {
      throw new Error('No checkout URL received from server');
    }

    // Redirect to Stripe Checkout using window.location
    window.location.href = session.url;
  } catch (error) {
    console.error('Checkout session error:', error);
    alert('Failed to create checkout session. Please try again.');
  }
};

export default stripePromise;