'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { CreditCard, Building2, Gift, Bitcoin, Coins, DollarSign, Lock, CheckCircle } from 'lucide-react';

export default function PaymentOptions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const paymentMethods = [
    {
      icon: CreditCard,
      title: 'Card Payments',
      description: 'Visa, Mastercard, American Express, and more',
      features: ['Instant processing', 'Secure encryption', 'Global acceptance'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Building2,
      title: 'Bank Transfer',
      description: 'Direct bank transfers for large purchases',
      features: ['Secure transactions', 'Low fees', 'Batch processing'],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Gift,
      title: 'Gift Cards',
      description: 'Use DEALORA or partner gift cards',
      features: ['Check balance', 'Combine multiple cards', 'No expiration fees'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Bitcoin,
      title: 'Bitcoin',
      description: 'Pay with BTC - fast and secure',
      features: ['Instant confirmation', 'Low fees', 'Global access'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Coins,
      title: 'Ethereum',
      description: 'Pay with ETH - smart contract powered',
      features: ['Smart contracts', 'Fast transactions', 'Decentralized'],
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: DollarSign,
      title: 'Stablecoins',
      description: 'USDT & USDC - stable value payments',
      features: ['Stable value', 'Fast settlement', 'Low volatility'],
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Options</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from multiple secure payment methods for your convenience
          </p>
        </div>

        {/* Payment Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.title}
              variants={itemVariants}
            >
              <Card className="p-6 hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${method.color}`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {method.description}
                    </p>
                    <ul className="space-y-2">
                      {method.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Notice */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-full">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Secure Payments Guaranteed
                </h4>
                <p className="text-sm text-gray-600">
                  All transactions are encrypted and processed securely. We never store your full payment details.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Gift Card Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-full">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Have a Gift Card?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Redeem your DEALORA or partner gift cards at checkout
                  </p>
                </div>
              </div>
              <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Check Balance
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}