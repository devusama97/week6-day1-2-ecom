'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/common/Header';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/session?session_id=${sessionId}`);
      const sessionData = await response.json();
      setSession(sessionData);
    } catch (error) {
      console.error('Error fetching session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <div className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {loading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          ) : (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. Your order has been confirmed and will be processed shortly.
              </p>
              
              {session && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <p className="text-sm text-gray-600">
                    Payment ID: {session.payment_intent}
                  </p>
                  <p className="text-sm text-gray-600">
                    Amount: ${(session.amount_total / 100).toFixed(2)}
                  </p>
                </div>
              )}
              
              <div className="space-x-4">
                <Link 
                  href="/profile" 
                  className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  View Orders
                </Link>
                <Link 
                  href="/products" 
                  className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}