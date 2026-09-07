'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Zap, Gift, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const slides = [
  {
    id: 1,
    badge: 'Limited Time Offer',
    title: 'BIG DEALS.',
    subtitle: 'BIGGER SAVINGS.',
    description: 'Discover limited-time offers, exclusive giveaways, clearance bargains, and thousands of products at prices you\'ll love.',
    cta1: 'Shop Deals',
    cta2: 'Enter Giveaway',
    product: '🎧',
    productName: 'Premium Wireless Headphones',
    originalPrice: '$120',
    price: '$69.99',
    discount: '42% OFF',
    stock: 'Only 8 left',
    bgColor: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&q=80',
  },
  {
    id: 2,
    badge: 'New Collection',
    title: 'FASHION',
    subtitle: 'REINVENTED.',
    description: 'Explore our latest fashion collection with trending styles, premium quality, and unbeatable prices.',
    cta1: 'Shop Fashion',
    cta2: 'View Lookbook',
    product: '👗',
    productName: 'Designer Summer Dress',
    originalPrice: '$89',
    price: '$49.99',
    discount: '44% OFF',
    stock: 'Only 12 left',
    bgColor: 'from-pink-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
  },
  {
    id: 3,
    badge: 'Home Essentials',
    title: 'SMART LIVING.',
    subtitle: 'SIMPLIFIED.',
    description: 'Transform your home with our smart devices, furniture, and essentials for modern living.',
    cta1: 'Shop Home',
    cta2: 'Explore Deals',
    product: '🏠',
    productName: 'Smart Home Speaker',
    originalPrice: '$149',
    price: '$79.99',
    discount: '46% OFF',
    stock: 'Only 5 left',
    bgColor: 'from-blue-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1920&q=80',
  },
];

export default function Hero() {
  const { addItem } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

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

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden h-[600px] lg:h-[700px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-full py-16 lg:py-24">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-white"
              >
                <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold border border-white/30">
                  <Zap className="w-4 h-4 mr-2" />
                  {slide.badge}
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  {slide.title}
                  <br />
                  <span className={`bg-gradient-to-r ${slide.bgColor} bg-clip-text text-transparent`}>
                    {slide.subtitle}
                  </span>
                </h1>

                <p className="text-xl text-white/90 max-w-lg">
                  {slide.description}
                </p>

                {/* Countdown Timer */}
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <div className="flex space-x-3">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div
                        key={unit}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 shadow-md min-w-[70px] text-center border border-white/30"
                      >
                        <div className="text-2xl font-bold text-white">
                          {String(value).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-white/80 uppercase">{unit}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${slide.bgColor} text-white hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all`}
                  >
                    {slide.cta1}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full transition-all"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    {slide.cta2}
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2 text-sm text-white/80">
                    <CreditCard className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-white/80">
                    <Zap className="w-4 h-4" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}