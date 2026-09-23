'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, HeadphonesIcon, Globe } from 'lucide-react';

export default function TrustSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  const trustFeatures = [
    {
      icon: Globe,
      title: 'Delivery Nationwide',
      description: 'Fast and reliable shipping to every corner of the country. Track your order in real-time from our warehouse to your doorstep.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      accent: 'text-blue-600',
    },
    {
      icon: Shield,
      title: '100% Genuine Products',
      description: 'Every product is verified and authentic. We source directly from manufacturers and authorized distributors to ensure quality.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      accent: 'text-green-600',
    },
    {
      icon: HeadphonesIcon,
      title: 'Need Help?',
      description: 'Our dedicated support team is available 24/7 to assist you. Get help with orders, returns, or any questions you may have.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      accent: 'text-orange-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-orange-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Why Choose Dealora?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience shopping with confidence, quality, and exceptional support
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`p-8 rounded-2xl ${feature.bgColor} border-2 border-transparent hover:border-orange-300 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                <div className="flex flex-col items-center space-y-6 text-center">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className={`text-2xl font-bold ${feature.accent} mb-3`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div className={`w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">Nationwide</div>
                <div className="text-sm opacity-90">Delivery Coverage</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">Genuine Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Customer Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}