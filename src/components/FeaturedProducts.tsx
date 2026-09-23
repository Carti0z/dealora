'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Heart, Eye, Star, TrendingUp, Flame, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState, useEffect } from 'react';

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

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
  const itemsPerSlide = 5;
  const totalSlides = featuredProducts.length > 0 ? Math.ceil(featuredProducts.length / itemsPerSlide) : 0;

  useEffect(() => {
    fetch('/api/products/featured')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const filters = ['All', 'Electronics', 'Fashion', 'Home', 'Gaming'];

  const handleAddToCart = async (product: FeaturedProduct) => {
    await addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    });
  };

  const handleAddToWishlist = async (product: FeaturedProduct) => {
    await addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      brand: product.brand,
      discount: product.discount,
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        duration: 0.4,
        type: "spring" as const,
        stiffness: 300,
      },
    },
  };

  const currentProducts = featuredProducts.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading trending products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (featuredProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Trending Now
              </h2>
            </div>
            <p className="text-gray-600 text-lg">Discover what's hot right now 🔥</p>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-0' 
                  : 'border-gray-300 hover:border-orange-500'
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={totalSlides <= 1}
              className="rounded-full hover:bg-orange-50 hover:border-orange-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={totalSlides <= 1}
              className="rounded-full hover:bg-orange-50 hover:border-orange-500"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Card className={`overflow-hidden transition-all duration-300 group ${
                  hoveredProduct === product.id 
                    ? 'shadow-2xl scale-105 -translate-y-2' 
                    : 'shadow-lg hover:shadow-xl'
                }`}>
                  <div className="relative">
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredProduct === product.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discount && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-md">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      {index < 2 && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0 shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          HOT
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                      className="absolute top-3 right-3 flex flex-col space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        x: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className={`h-8 w-8 rounded-full bg-white shadow-md hover:scale-110 transition-transform ${
                          isInWishlist(product.id) ? 'text-red-500' : ''
                        }`}
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <motion.div
                          animate={{ scale: isInWishlist(product.id) ? [1, 1.3, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </motion.div>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </motion.div>

                    {/* Quick Add Button */}
                    <motion.div
                      className="absolute bottom-3 left-3 right-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Quick Add
                      </Button>
                    </motion.div>
                  </div>

                  <div className="p-4 space-y-2">
                    {/* Brand */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 text-sm">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-medium text-gray-700 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
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
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.discount && (
                        <Badge variant="secondary" className="text-xs">
                          Save ${((product.originalPrice || product.price) - product.price).toFixed(2)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 px-8 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            View All Trending Products
          </Button>
        </div>
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