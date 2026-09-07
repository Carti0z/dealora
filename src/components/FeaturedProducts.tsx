'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface FeaturedProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 1247,
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    brand: 'TechWear',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    rating: 4.6,
    reviewCount: 892,
  },
  {
    id: '3',
    name: 'Ultra-Thin Laptop',
    brand: 'CompPro',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
    price: 899.99,
    rating: 4.7,
    reviewCount: 567,
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    brand: 'LuxStyle',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.5,
    reviewCount: 423,
  },
  {
    id: '5',
    name: 'Wireless Earbuds Pro',
    brand: 'SoundMax',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.4,
    reviewCount: 2156,
  },
  {
    id: '6',
    name: 'Fitness Tracker Band',
    brand: 'FitLife',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80',
    price: 49.99,
    rating: 4.3,
    reviewCount: 1876,
  },
  {
    id: '7',
    name: 'Portable Power Bank',
    brand: 'ChargeIt',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.6,
    reviewCount: 3421,
  },
  {
    id: '8',
    name: 'Bluetooth Speaker Mini',
    brand: 'SoundWave',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    price: 59.99,
    rating: 4.5,
    reviewCount: 987,
  },
];

export default function FeaturedProducts() {
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
            <p className="text-gray-600">Discover what's popular right now</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="ghost" size="sm">Electronics</Button>
            <Button variant="ghost" size="sm">Fashion</Button>
            <Button variant="ghost" size="sm">Home</Button>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product, index) => (
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
                  {product.discount && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      {product.discount}% OFF
                    </Badge>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`h-8 w-8 rounded-full bg-white shadow-md ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
                      onClick={() => addToWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                        brand: product.brand,
                        discount: product.discount,
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

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
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
            className="border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}