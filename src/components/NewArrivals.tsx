'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface NewArrivalProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  isNew: boolean;
}

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Gaming'];

const productsByCategory: Record<string, NewArrivalProduct[]> = {
  All: [
    {
      id: '1',
      name: 'Smart Display Hub',
      brand: 'TechHome',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      price: 199.99,
      category: 'Electronics',
      isNew: true,
    },
    {
      id: '2',
      name: 'Designer Jacket',
      brand: 'StyleCo',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
      price: 149.99,
      category: 'Fashion',
      isNew: true,
    },
    {
      id: '3',
      name: 'Smart Coffee Maker',
      brand: 'BrewTech',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80',
      price: 129.99,
      category: 'Home',
      isNew: true,
    },
    {
      id: '4',
      name: 'VR Headset Pro',
      brand: 'GameVision',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80',
      price: 399.99,
      category: 'Gaming',
      isNew: true,
    },
  ],
  Electronics: [
    {
      id: '1',
      name: 'Smart Display Hub',
      brand: 'TechHome',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      price: 199.99,
      category: 'Electronics',
      isNew: true,
    },
    {
      id: '5',
      name: 'Wireless Charging Pad',
      brand: 'ChargePro',
      image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&q=80',
      price: 49.99,
      category: 'Electronics',
      isNew: true,
    },
    {
      id: '6',
      name: 'Smart Doorbell',
      brand: 'SecureHome',
      image: 'https://images.unsplash.com/photo-1558002038-1091777c8d5e?w=400&q=80',
      price: 179.99,
      category: 'Electronics',
      isNew: true,
    },
    {
      id: '7',
      name: 'Portable Projector',
      brand: 'ViewMax',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
      price: 299.99,
      category: 'Electronics',
      isNew: true,
    },
  ],
  Fashion: [
    {
      id: '2',
      name: 'Designer Jacket',
      brand: 'StyleCo',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
      price: 149.99,
      category: 'Fashion',
      isNew: true,
    },
    {
      id: '8',
      name: 'Luxury Watch',
      brand: 'TimePiece',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      price: 249.99,
      category: 'Fashion',
      isNew: true,
    },
    {
      id: '9',
      name: 'Designer Sunglasses',
      brand: 'SunStyle',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
      price: 89.99,
      category: 'Fashion',
      isNew: true,
    },
    {
      id: '10',
      name: 'Leather Handbag',
      brand: 'LuxBag',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
      price: 199.99,
      category: 'Fashion',
      isNew: true,
    },
  ],
  Home: [
    {
      id: '3',
      name: 'Smart Coffee Maker',
      brand: 'BrewTech',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80',
      price: 129.99,
      category: 'Home',
      isNew: true,
    },
    {
      id: '11',
      name: 'Air Purifier',
      brand: 'PureAir',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
      price: 159.99,
      category: 'Home',
      isNew: true,
    },
    {
      id: '12',
      name: 'Smart Vacuum',
      brand: 'CleanBot',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      price: 349.99,
      category: 'Home',
      isNew: true,
    },
    {
      id: '13',
      name: 'Smart Light Bulbs',
      brand: 'LumiTech',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
      price: 79.99,
      category: 'Home',
      isNew: true,
    },
  ],
  Gaming: [
    {
      id: '4',
      name: 'VR Headset Pro',
      brand: 'GameVision',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80',
      price: 399.99,
      category: 'Gaming',
      isNew: true,
    },
    {
      id: '14',
      name: 'Gaming Keyboard',
      brand: 'KeyMaster',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=400&q=80',
      price: 129.99,
      category: 'Gaming',
      isNew: true,
    },
    {
      id: '15',
      name: 'Gaming Mouse',
      brand: 'ClickPro',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
      price: 79.99,
      category: 'Gaming',
      isNew: true,
    },
    {
      id: '16',
      name: 'Gaming Headset',
      brand: 'SoundMax',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      price: 99.99,
      category: 'Gaming',
      isNew: true,
    },
  ],
};

export default function NewArrivals() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('All');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900">NEW ARRIVALS</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out the latest products added to our store
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {productsByCategory[category]?.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                      <div className="relative">
                        {/* Product Image */}
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* New Badge */}
                        {product.isNew && (
                          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                            NEW
                          </Badge>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full bg-white shadow-md"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full bg-white shadow-md"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        {/* Brand */}
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.brand}
                        </p>

                        {/* Product Name */}
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                        </div>

                        {/* Add to Cart Button */}
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 px-8"
          >
            View All New Arrivals
          </Button>
        </div>
      </div>
    </section>
  );
}