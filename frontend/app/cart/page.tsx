'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Newsletter from '../../components/home/Newsletter';
import Footer from '../../components/common/Footer';
import { useCart } from '../../contexts/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = getTotalPrice();
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="px-4 py-4 border-b">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-black">Cart</span>
          </nav>
        </div>
      </div>

      <div className="px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">YOUR CART</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
                  <Link href="/products" className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 border rounded-2xl">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        width={96} 
                        height={96} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Color: {item.color}</p>
                      <p className="text-lg sm:text-xl font-bold mt-1 sm:mt-2">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-3">
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        🗑️
                      </button>
                      
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          className="px-2 sm:px-3 py-1 hover:bg-gray-100 rounded-l-full text-sm sm:text-base"
                        >
                          −
                        </button>
                        <span className="px-2 sm:px-3 py-1 text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          className="px-2 sm:px-3 py-1 hover:bg-gray-100 rounded-r-full text-sm sm:text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-2xl p-4 sm:p-6 lg:sticky lg:top-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Discount (-20%)</span>
                    <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">${deliveryFee}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg sm:text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="text"
                      placeholder="Add promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                    <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-800 text-sm sm:text-base">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link 
                  href="/checkout"
                  className="w-full bg-black text-white py-3 sm:py-4 rounded-full text-center font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  Go to Checkout →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}