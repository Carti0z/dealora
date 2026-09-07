'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clearance from '@/components/Clearance';

export default function ClearancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Clearance Sale</h1>
            <p className="text-white/90">Final markdowns - once they're gone, they're gone!</p>
          </div>
        </div>

        {/* Clearance Section */}
        <Clearance />
      </main>
      <Footer />
    </div>
  );
}