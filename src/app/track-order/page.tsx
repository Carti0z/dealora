'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      setIsSearched(true);
    }
  };

  const mockOrder = isSearched ? {
    id: orderId,
    status: 'In Transit',
    estimatedDelivery: 'September 10, 2026',
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, price: 899.99 },
      { name: 'AirPods Pro 2', quantity: 1, price: 199.99 },
    ],
    total: 1099.98,
    trackingSteps: [
      { status: 'Order Placed', date: 'Sep 5, 2026', completed: true, icon: Package },
      { status: 'Processing', date: 'Sep 5, 2026', completed: true, icon: Clock },
      { status: 'Shipped', date: 'Sep 6, 2026', completed: true, icon: Truck },
      { status: 'In Transit', date: 'Sep 7, 2026', completed: true, icon: Truck },
      { status: 'Out for Delivery', date: 'Sep 9, 2026', completed: false, icon: Truck },
      { status: 'Delivered', date: 'Sep 10, 2026', completed: false, icon: CheckCircle },
    ],
    shippingAddress: '123 Main Street, New York, NY 10001',
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Track Your Order</h1>
          
          {/* Search Form */}
          <Card className="p-6 mb-8">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter your order number (e.g., ORD-12345)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button type="submit" className="h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Search className="w-5 h-5 mr-2" />
                Track Order
              </Button>
            </form>
          </Card>

          {/* Order Details */}
          {mockOrder && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order #{mockOrder.id}</h2>
                    <p className="text-gray-600 mt-1">Estimated Delivery: {mockOrder.estimatedDelivery}</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {mockOrder.status}
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="space-y-4">
                  {mockOrder.trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.status}
                          </p>
                          <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {step.date}
                          </p>
                        </div>
                        {index < mockOrder.trackingSteps.length - 1 && (
                          <div className={`ml-5 h-8 w-0.5 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Order Items */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {mockOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${mockOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <p className="text-gray-600">{mockOrder.shippingAddress}</p>
                </div>
              </Card>

              <Link href="/account" className="block">
                <Button variant="outline" className="w-full">
                  View Order Details in Account
                </Button>
              </Link>
            </div>
          )}

          {!isSearched && (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter your order number</h3>
              <p className="text-gray-600 mb-6">
                You can find your order number in your confirmation email or in your account.
              </p>
              <Link href="/account" className="text-orange-500 hover:text-orange-600 font-medium">
                Go to your account to view all orders
              </Link>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
