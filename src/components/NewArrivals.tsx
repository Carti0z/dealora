'use client';

import { useState, useEffect } from 'react';
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

export default function NewArrivals() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState<NewArrivalProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products/new-arrivals')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Gaming'];

  const productsByCategory: Record<string, NewArrivalProduct[]> = {
    All: products,
    Electronics: products.filter(p => p.category === 'Electronics'),
    Fashion: products.filter(p => p.category === 'Fashion'),
    Home: products.filter(p => p.category === 'Home'),
    Gaming: products.filter(p => p.category === 'Gaming'),
  };

  const handleAddToCart = async (product: NewArrivalProduct) => {
    await addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    });
  };

  const handleAddToWishlist = async (product: NewArrivalProduct) => {
    await addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    });
  };

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

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">Loading new arrivals...</div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

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
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
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
                            className={`h-8 w-8 rounded-full bg-white shadow-md ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
                            onClick={() => handleAddToWishlist(product)}
                          >
                            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
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
                        <Button 
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                          onClick={() => handleAddToCart(product)}
                        >
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