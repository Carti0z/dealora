'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState, useEffect } from 'react';

interface ClearanceProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  clearancePrice: number;
  discount: number;
  rating: number;
  stock: number;
}

const getDiscountColor = (discount: number) => {
  if (discount >= 70) return 'bg-red-500';
  if (discount >= 50) return 'bg-orange-500';
  return 'bg-yellow-500';
};

export default function Clearance() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [clearanceProducts, setClearanceProducts] = useState<ClearanceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products/clearance')
      .then(res => res.json())
      .then(data => {
        setClearanceProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

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
          <div className="text-center py-12">Loading clearance items...</div>
        </div>
      </section>
    )
  }

  if (clearanceProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-4xl">🏷️</span>
            <h2 className="text-3xl font-bold text-gray-900">CLEARANCE SALE</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Final markdowns. Once they're gone, they're gone.
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {clearanceProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
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

                  {/* Discount Badge */}
                  <Badge className={`absolute top-3 left-3 ${getDiscountColor(product.discount)} text-white`}>
                    {product.discount}% OFF
                  </Badge>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`h-8 w-8 rounded-full bg-white shadow-md ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
                      onClick={() => addToWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.clearancePrice,
                        image: product.image,
                        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                      })}
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

                  {/* Stock Indicator */}
                  {product.stock <= 5 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="destructive" className="text-xs">
                        Only {product.stock} left
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ${product.clearancePrice}
                      </span>
                    </div>
                    <div className="text-green-600 font-medium text-sm">
                      Save ${(product.originalPrice - product.clearancePrice).toFixed(2)}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.clearancePrice,
                      image: product.image,
                      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                    })}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-red-500 text-red-500 hover:bg-red-50 px-8"
          >
            Shop All Clearance
          </Button>
        </div>
      </div>
    </section>
  );
}