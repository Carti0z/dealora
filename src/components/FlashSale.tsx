'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Eye, Heart, ShoppingCart, Eye as EyeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface FlashSaleProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  discount: number;
  stock: number;
  viewers: number;
}

export default function FlashSale() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashSaleProducts, setFlashSaleProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerSlide = 4;
  const totalSlides = flashSaleProducts.length > 0 ? Math.ceil(flashSaleProducts.length / itemsPerSlide) : 0;

  useEffect(() => {
    fetch('/api/flash-sales')
      .then(res => res.json())
      .then(data => {
        setFlashSaleProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prev, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">Loading flash sales...</div>
        </div>
      </section>
    )
  }

  if (flashSaleProducts.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-3 md:mb-0">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-2">⚡</span>
                FLASH SALE
              </h2>
              <Badge className="bg-red-500 text-white text-sm">LIVE</Badge>
            </div>
            <p className="text-gray-600 mt-1 text-sm">Prices dropping fast. Grab them before they're gone.</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Countdown Timer */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <div className="flex space-x-2">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <span className="text-lg font-bold">
                      {String(value).padStart(2, '0')}
                    </span>
                    <span className="text-xs ml-1 opacity-80">{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{
              x: `-${currentIndex * 100}%`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {flashSaleProducts
                  .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                  .map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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

                          {/* Discount Badge */}
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                            {product.discount}% OFF
                          </Badge>

                          {/* Quick Actions */}
                          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="secondary"
                              className={`h-7 w-7 rounded-full bg-white shadow-md ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
                              onClick={() => addToWishlist({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                              })}
                            >
                              <Heart className={`h-3 w-3 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-7 w-7 rounded-full bg-white shadow-md"
                            >
                              <EyeIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-3 space-y-2">
                          {/* Product Name */}
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-500 transition-colors line-clamp-1">
                            {product.name}
                          </h3>

                          {/* Price */}
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400 line-through text-xs">
                              ${product.originalPrice}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                          </div>

                          {/* Stock Progress */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Only {product.stock} left</span>
                              <span className="text-orange-500 font-medium">
                                {Math.round((product.stock / 20) * 100)}% sold
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${(product.stock / 20) * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Viewers */}
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            <span>{product.viewers} viewing</span>
                          </div>

                          {/* Add to Cart Button */}
                          <Button 
                            size="sm"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 text-xs"
                            onClick={() => addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                            })}
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            ))}
          </motion.div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-4">
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6"
          >
            View All Flash Sales
          </Button>
        </div>
      </div>
    </section>
  );
}