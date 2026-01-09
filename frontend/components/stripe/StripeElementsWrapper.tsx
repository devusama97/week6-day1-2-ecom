'use client';

import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/lib/stripe';
import StripePaymentForm from './StripePaymentForm';

interface StripeElementsWrapperProps {
  clientSecret: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function StripeElementsWrapper({
  clientSecret,
  onSuccess,
  onError,
  loading,
  setLoading
}: StripeElementsWrapperProps) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#000000',
        colorBackground: '#ffffff',
        colorText: '#000000',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
        loading={loading}
        setLoading={setLoading}
      />
    </Elements>
  );
}