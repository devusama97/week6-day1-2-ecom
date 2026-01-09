'use client';

import Link from 'next/link';
import Header from '../../../components/common/Header';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <div className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>
          
          <div className="space-x-4">
            <Link 
              href="/cart" 
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Return to Cart
            </Link>
            <Link 
              href="/products" 
              className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}