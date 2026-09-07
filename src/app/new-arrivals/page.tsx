'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewArrivals from '@/components/NewArrivals';

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">New Arrivals</h1>
            <p className="text-white/90">Check out the latest products added to our store</p>
          </div>
        </div>

        {/* New Arrivals Section */}
        <NewArrivals />
      </main>
      <Footer />
    </div>
  );
}