'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlashSale from '@/components/FlashSale';

export default function FlashSalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Flash Sales</h1>
            <p className="text-white/90">Limited time offers - grab them before they're gone!</p>
          </div>
        </div>

        {/* Flash Sale Section */}
        <FlashSale />
      </main>
      <Footer />
    </div>
  );
}