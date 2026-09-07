'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Truck, CreditCard, Bitcoin, Gift, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const steps = [
    { id: 1, title: 'Cart', icon: ShoppingBag },
    { id: 2, title: 'Delivery', icon: Truck },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Confirmation', icon: CheckCircle },
  ];

  const cartItems = [
    { id: '1', name: 'Premium Wireless Headphones', price: 149.99, quantity: 1, image: '🎧' },
    { id: '2', name: 'Smart Watch Pro', price: 299.99, quantity: 1, image: '⌚' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'from-blue-500 to-blue-600' },
    { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin, color: 'from-orange-500 to-orange-600' },
    { id: 'gift', name: 'Gift Card', icon: Gift, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step.id
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 ${
                        currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        currentStep > step.id ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                {/* Step 1: Cart */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-3xl">{item.image}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-600">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              +
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" disabled>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        onClick={() => setCurrentStep(2)}
                      >
                        Continue to Delivery
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Delivery */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <Input type="tel" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <Input placeholder="123 Main Street" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <Input placeholder="New York" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <Input placeholder="NY" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <Input placeholder="United States" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                          <Input placeholder="10001" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        onClick={() => setCurrentStep(3)}
                      >
                        Continue to Payment
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                    <div className="space-y-4 mb-6">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedPayment === method.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color}`}>
                              <method.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-medium text-gray-900">{method.name}</span>
                            {selectedPayment === method.id && (
                              <CheckCircle className="w-5 h-5 text-orange-500 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedPayment === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                          <Input placeholder="John Doe" />
                        </div>
                      </div>
                    )}

                    {selectedPayment === 'bitcoin' && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                          Send Bitcoin to the following address:
                        </p>
                        <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Amount: <span className="font-bold">{(total / 50000).toFixed(8)} BTC</span>
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'gift' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gift Card Code</label>
                          <Input placeholder="Enter your gift card code" />
                        </div>
                        <Button variant="outline" className="w-full">
                          Check Balance
                        </Button>
                      </div>
                    )}

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Delivery
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        onClick={() => setCurrentStep(4)}
                      >
                        Place Order
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                      <p className="text-gray-600 mb-6">Thank you for your purchase</p>
                      <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
                        <div className="space-y-2 text-left">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order Number:</span>
                            <span className="font-medium">#ORD-12345</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Estimated Delivery:</span>
                            <span className="font-medium">3-5 business days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium">Credit Card</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        onClick={() => setCurrentStep(1)}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
                {currentStep === 1 && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}