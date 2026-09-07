'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Category {
  name: string;
  image: string;
  productCount: number;
  color: string;
  slug: string;
}

const categories: Category[] = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', productCount: 2340, color: 'from-blue-500 to-blue-600', slug: 'electronics' },
  { name: 'Phones & Tablets', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', productCount: 1890, color: 'from-purple-500 to-purple-600', slug: 'phones-tablets' },
  { name: 'Computers', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', productCount: 1560, color: 'from-indigo-500 to-indigo-600', slug: 'computers' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', productCount: 3240, color: 'from-pink-500 to-pink-600', slug: 'fashion' },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', productCount: 2180, color: 'from-orange-500 to-orange-600', slug: 'shoes' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', productCount: 1450, color: 'from-rose-500 to-rose-600', slug: 'beauty' },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', productCount: 2890, color: 'from-green-500 to-green-600', slug: 'home-kitchen' },
  { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', productCount: 980, color: 'from-teal-500 to-teal-600', slug: 'furniture' },
  { name: 'Gaming', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80', productCount: 1670, color: 'from-red-500 to-red-600', slug: 'gaming' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80', productCount: 1340, color: 'from-yellow-500 to-yellow-600', slug: 'sports' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', productCount: 2560, color: 'from-cyan-500 to-cyan-600', slug: 'accessories' },
  { name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', productCount: 4120, color: 'from-emerald-500 to-emerald-600', slug: 'groceries' },
];

export default function Categories() {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

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

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href={`/categories/${category.slug}`}>
                <Card className="overflow-hidden cursor-pointer group h-full">
                  <div className="relative">
                    {/* Category Image Background */}
                    <div className={`aspect-square bg-gradient-to-br ${category.color} flex items-center justify-center overflow-hidden`}>
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.productCount.toLocaleString()} Products
                    </p>
                    <div className="flex items-center text-orange-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Browse</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
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