'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Category {
  name: string;
  image: string;
  productCount: number;
  color: string;
  slug: string;
  description?: string;
}

const cardColors = [
  'bg-blue-50',
  'bg-pink-50', 
  'bg-green-50',
  'bg-purple-50',
  'bg-orange-50',
  'bg-rose-50',
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = categories.length > 0 ? Math.ceil(categories.length / itemsPerSlide) : 0;

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">Loading categories...</div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  const currentCategories = categories.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of categories and find exactly what you're looking for
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevSlide}
            disabled={totalSlides <= 1}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={totalSlides <= 1}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Sliding Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {currentCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href={`/categories/${category.slug}`}>
                <Card className={`overflow-hidden cursor-pointer group h-full ${cardColors[index % cardColors.length]} border-0 shadow-md hover:shadow-xl transition-shadow duration-300`}>
                  <div className="relative p-6">
                    {/* Category Image */}
                    <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-white">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Category Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description || `${category.productCount.toLocaleString()} products available`}
                    </p>

                    {/* Arrow Icon */}
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}