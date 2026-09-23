'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock order status
    setOrderStatus({
      orderNumber: orderNumber,
      status: 'SHIPPED',
      estimatedDelivery: '2024-01-20',
      trackingNumber: 'TRK123456789',
      steps: [
        { name: 'Order Placed', date: '2024-01-15', completed: true },
        { name: 'Processing', date: '2024-01-16', completed: true },
        { name: 'Shipped', date: '2024-01-17', completed: true },
        { name: 'In Transit', date: '2024-01-18', completed: false },
        { name: 'Delivered', date: '2024-01-20', completed: false },
      ]
    });
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Enter your order number to see the latest status</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Order</CardTitle>
            <CardDescription>Enter your order number to track your package</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter order number (e.g., #ORD12345)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                {loading ? 'Searching...' : <><Search className="w-4 h-4 mr-2" /> Track Order</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Status */}
        {orderStatus && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Order {orderStatus.orderNumber}
              </CardTitle>
              <CardDescription>
                Tracking Number: {orderStatus.trackingNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Status Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                  <Truck className="w-4 h-4 mr-2" />
                  {orderStatus.status}
                </span>
                <p className="text-sm text-gray-600 mt-2">
                  Estimated Delivery: {orderStatus.estimatedDelivery}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4">
                {orderStatus.steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.name}
                      </p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        {!orderStatus && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Can't find your order? Here are some options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/account?tab=orders">
                <Button variant="outline" className="w-full">
                  <Package className="w-4 h-4 mr-2" />
                  View All My Orders
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}