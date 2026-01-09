'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function StripePaymentForm({ 
  onSuccess, 
  onError, 
  loading, 
  setLoading 
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Stripe form submitted');

    if (!stripe || !elements) {
      console.log('Stripe or elements not loaded');
      return;
    }

    setLoading(true);
    setMessage('');
    console.log('Confirming payment...');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    console.log('Payment confirmation result:', { error, paymentIntent });

    if (error) {
      console.error('Payment error:', error);
      setMessage(error.message || 'Payment failed');
      onError(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded, calling onSuccess');
      onSuccess(paymentIntent);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
        {message && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {message}
          </div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>
    </form>
  );
}