'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Gift, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PromotionalBanners() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Flash Sales Banner */}
          <motion.div variants={itemVariants}>
            <Link href="/flash-sales">
              <Card className="overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border-0 shadow-2xl hover:shadow-3xl transition-shadow duration-300 cursor-pointer group">
                <div className="relative p-8 md:p-12">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                      alt="Headphones"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-sm tracking-wider">
                        FLASH SALES
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      Limited time.
                      <br />
                      Huge savings.
                    </h3>
                    
                    <div className="text-5xl md:text-6xl font-black text-orange-500 mb-6">
                      UP TO 70% OFF
                    </div>
                    
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 group-hover:scale-105 transition-transform"
                    >
                      Shop Flash Sales
                    </Button>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute right-4 bottom-4 opacity-30">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"
                      alt="Headphones"
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Giveaway Banner */}
          <motion.div variants={itemVariants}>
            <Link href="/giveaways">
              <Card className="overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 border-0 shadow-2xl hover:shadow-3xl transition-shadow duration-300 cursor-pointer group">
                <div className="relative p-8 md:p-12">
                  {/* Background Icons */}
                  <div className="absolute inset-0 opacity-10 overflow-hidden">
                    <Gift className="absolute top-4 right-4 w-24 h-24 text-orange-300" />
                    <Gift className="absolute bottom-4 left-4 w-16 h-16 text-orange-200" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Gift className="w-6 h-6 text-orange-600" />
                      <span className="text-orange-600 font-bold text-sm tracking-wider">
                        GIVEAWAY
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      Win amazing
                      <br />
                      products!
                    </h3>
                    
                    <p className="text-gray-600 mb-6 max-w-md">
                      Shop, participate and stand a chance to win your favorite items.
                    </p>
                    
                    <Button 
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 group-hover:scale-105 transition-transform"
                    >
                      Join Now
                    </Button>
                  </div>

                  {/* Product Images */}
                  <div className="absolute right-4 bottom-4 flex gap-2 opacity-60">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&q=80"
                      alt="Smartwatch"
                      className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-md"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&q=80"
                      alt="Phone"
                      className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-md"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=60&q=80"
                      alt="Earbuds"
                      className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-md"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}