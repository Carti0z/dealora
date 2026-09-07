'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, CheckCircle, CreditCard } from 'lucide-react';

export default function TrustSection() {
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

  const trustFeatures = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payment information is protected with industry-standard encryption and security measures.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Track your order from checkout to delivery with real-time updates and reliable shipping partners.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: 'Simple returns on eligible products with our hassle-free return policy and customer support.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: CheckCircle,
      title: 'Verified Products',
      description: 'Product and seller information is clearly presented and verified for your peace of mind.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Pay using supported cards, bank methods, gift cards, or cryptocurrency - whatever works for you.',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">SHOP WITH CONFIDENCE</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with a safe, secure, and enjoyable shopping experience
          </p>
        </div>

        {/* Trust Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full bg-gradient-to-br ${feature.color} shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Badges */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">10M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Products Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
                <div className="text-sm text-gray-600">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Certifications */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Verified Business</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}