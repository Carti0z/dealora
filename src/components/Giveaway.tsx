'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Gift, Clock, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Giveaway {
  id: string;
  name: string;
  prize: string;
  prizeValue: number;
  prizeImage: string;
  winnerCount: number;
  entryRequirement: string;
  totalEntries: number;
  endDate: Date;
}

const giveaways: Giveaway[] = [
  {
    id: '1',
    name: 'Tech Bundle Giveaway',
    prize: 'Brand New Laptop + Accessories',
    prizeValue: 1499,
    prizeImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    winnerCount: 3,
    entryRequirement: 'Purchase any product over $50',
    totalEntries: 12483,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    id: '2',
    name: 'Fashion Week Special',
    prize: '$500 Shopping Spree',
    prizeValue: 500,
    prizeImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    winnerCount: 5,
    entryRequirement: 'Sign up for newsletter',
    totalEntries: 8234,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    id: '3',
    name: 'Gaming Paradise',
    prize: 'Next-Gen Gaming Console',
    prizeValue: 499,
    prizeImage: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80',
    winnerCount: 2,
    entryRequirement: 'Join our Discord community',
    totalEntries: 5678,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
];

export default function Giveaway() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: { days: number; hours: number; minutes: number; seconds: number } }>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft: { [key: string]: { days: number; hours: number; minutes: number; seconds: number } } = {};
      
      giveaways.forEach((giveaway) => {
        const difference = giveaway.endDate.getTime() - new Date().getTime();
        
        if (difference > 0) {
          newTimeLeft[giveaway.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gift className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-900">WIN BIG WITH DEALORA</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shop, participate, and stand a chance to win amazing prizes
          </p>
        </div>

        {/* Giveaway Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {giveaways.map((giveaway, index) => (
            <motion.div
              key={giveaway.id}
              variants={itemVariants}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                {/* Prize Image */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={giveaway.prizeImage} 
                    alt={giveaway.prize}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-purple-500 text-white">
                    LIVE
                  </Badge>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Giveaway Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {giveaway.name}
                  </h3>

                  {/* Prize */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">Prize:</p>
                    <p className="font-semibold text-gray-900">{giveaway.prize}</p>
                  </div>

                  {/* Prize Value */}
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">
                      ${giveaway.prizeValue.toLocaleString()}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Winners</p>
                      <p className="font-bold text-gray-900">{giveaway.winnerCount}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <TrendingUp className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Entries</p>
                      <p className="font-bold text-gray-900">{giveaway.totalEntries.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  {timeLeft[giveaway.id] && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>Ends in:</span>
                      </div>
                      <div className="flex space-x-2">
                        {Object.entries(timeLeft[giveaway.id]).map(([unit, value]) => (
                          <div
                            key={unit}
                            className="flex-1 bg-purple-100 rounded-lg p-2 text-center"
                          >
                            <div className="text-lg font-bold text-purple-700">
                              {String(value).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-purple-600 uppercase">{unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Entry Requirement */}
                  <div className="mb-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">How to enter:</p>
                    <p>{giveaway.entryRequirement}</p>
                  </div>

                  {/* Enter Button */}
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 mt-auto">
                    <Gift className="w-4 h-4 mr-2" />
                    Enter Giveaway
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-500 text-purple-500 hover:bg-purple-50 px-8"
          >
            View All Giveaways
          </Button>
        </div>
      </div>
    </section>
  );
}