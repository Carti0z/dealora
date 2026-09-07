'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

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

const clearanceProducts: ClearanceProduct[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80',
    originalPrice: 1199,
    clearancePrice: 899.99,
    discount: 25,
    rating: 4.8,
    stock: 4,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    originalPrice: 1299,
    clearancePrice: 949.99,
    discount: 27,
    rating: 4.7,
    stock: 3,
  },
  {
    id: '3',
    name: 'Nike Air Jordan 1',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    originalPrice: 180,
    clearancePrice: 119.99,
    discount: 33,
    rating: 4.9,
    stock: 5,
  },
  {
    id: '4',
    name: 'Apple Watch Ultra 2',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80',
    originalPrice: 799,
    clearancePrice: 599.99,
    discount: 25,
    rating: 4.6,
    stock: 6,
  },
  {
    id: '5',
    name: 'Designer Leather Handbag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    originalPrice: 349,
    clearancePrice: 174.99,
    discount: 50,
    rating: 4.5,
    stock: 2,
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    originalPrice: 399,
    clearancePrice: 279.99,
    discount: 30,
    rating: 4.7,
    stock: 8,
  },
  {
    id: '7',
    name: 'MacBook Air M3',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    originalPrice: 1299,
    clearancePrice: 999.99,
    discount: 23,
    rating: 4.8,
    stock: 3,
  },
  {
    id: '8',
    name: 'Samsung 65" 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
    originalPrice: 899,
    clearancePrice: 599.99,
    discount: 33,
    rating: 4.4,
    stock: 4,
  },
];

const getDiscountColor = (discount: number) => {
  if (discount >= 70) return 'bg-red-500';
  if (discount >= 50) return 'bg-orange-500';
  return 'bg-yellow-500';
};

export default function Clearance() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

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