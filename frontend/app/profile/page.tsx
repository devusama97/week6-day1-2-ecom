'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Toast from '../../components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { orderService, Order } from '../../services/orderService';

export default function ProfilePage() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  useEffect(() => {
    // Check for hash in URL to auto-switch to order history
    if (window.location.hash === '#order-history') {
      setActiveTab('orders');
    }
    
    // Check for order success flag
    const orderSuccess = localStorage.getItem('orderSuccess');
    if (orderSuccess === 'true') {
      setToast({message: 'Order placed successfully!', type: 'success'});
      localStorage.removeItem('orderSuccess');
    }
  }, []);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const data = await orderService.getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Navbar />
        <div className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Please Login</h1>
            <p className="text-gray-600 mb-8">You need to login to view your profile</p>
            <Link href="/auth/login" className="bg-black text-white px-8 py-3 rounded-full">
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="px-4 py-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-black">Profile</span>
          </nav>
        </div>
      </div>

      <div className="px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-600">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold">{user?.name || 'User'}</h2>
                  <p className="text-sm sm:text-base text-gray-600 truncate">{user?.email || ''}</p>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    Personal Information
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    Order History
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              
              {/* Personal Information Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        readOnly
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={user?.role || ''}
                        readOnly
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2">Loyalty Points</label>
                      <input
                        type="text"
                        value={user?.loyaltyPoints || 0}
                        readOnly
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 sm:mt-8">
                    <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order History</h3>
                  
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4 sm:space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="border rounded-2xl p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                            <div>
                              <h4 className="font-bold text-base sm:text-lg">Order #{order._id.slice(-8)}</h4>
                              <p className="text-sm sm:text-base text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center justify-between sm:block sm:text-right">
                              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <p className="text-base sm:text-lg font-bold sm:mt-2">${(order.totalAmount || 0).toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image 
                                    src={item.product.images?.[0] || '/placeholder.png'} 
                                    alt={item.product.name} 
                                    width={64} 
                                    height={64} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-sm sm:text-base truncate">{item.product.name}</h5>
                                  <p className="text-xs sm:text-sm text-gray-600">
                                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                  </p>
                                  <p className="text-xs sm:text-sm font-semibold">${item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
                            <div className="text-xs sm:text-sm">
                              <p className="text-gray-600">Payment: {order.paymentMethod}</p>
                              <p className="text-gray-600 truncate">
                                Shipping: {order.shippingAddress.address}, {order.shippingAddress.city}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs sm:text-sm">
                                View Details
                              </button>
                              {order.status === 'delivered' && (
                                <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-xs sm:text-sm">
                                  Reorder
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-base sm:text-lg">No orders found</p>
                      <p className="text-gray-400 mt-2 text-sm sm:text-base">Start shopping to see your orders here</p>
                      <Link href="/products" className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}