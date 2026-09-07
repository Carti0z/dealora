'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlashSale from '@/components/FlashSale';
import Categories from '@/components/Categories';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">All Categories</h1>
            <p className="text-white/90">Browse products by category</p>
          </div>
        </div>

        {/* Categories Grid */}
        <Categories />

        {/* Flash Sale Section */}
        <FlashSale />
      </main>
      <Footer />
    </div>
  );
}