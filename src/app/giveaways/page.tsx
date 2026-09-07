'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Giveaway from '@/components/Giveaway';

export default function GiveawaysPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Giveaways</h1>
            <p className="text-white/90">Shop, participate, and stand a chance to win amazing prizes!</p>
          </div>
        </div>

        {/* Giveaway Section */}
        <Giveaway />
      </main>
      <Footer />
    </div>
  );
}