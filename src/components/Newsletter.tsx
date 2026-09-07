'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            GET THE BEST DEALS FIRST
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive exclusive discounts, flash-sale alerts, new arrivals, and giveaway announcements.
          </p>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 pr-4 py-4 rounded-full text-gray-900 bg-white shadow-lg border-0 focus:ring-2 focus:ring-white/50"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-full font-semibold shadow-lg transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Subscribe
                  </span>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-8 h-8 text-white" />
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg">Successfully Subscribed!</h3>
                  <p className="text-white/80 text-sm">Check your email for confirmation.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-white/90 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Exclusive Deals</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Early Access</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Flash Sale Alerts</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>No Spam</span>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="mt-6 text-white/70 text-xs">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}