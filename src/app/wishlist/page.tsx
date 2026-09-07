'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
    });
    removeItem(item.id);
  };

  const moveToCartAll = () => {
    items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        slug: item.slug,
      });
    });
    clearWishlist();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
            </div>
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={moveToCartAll}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Move All to Cart
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-4">Save items you love to your wishlist</p>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                onClick={() => window.location.href = '/shop'}
              >
                Start Shopping
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-5xl">{item.image}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 bg-white shadow-md hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4 space-y-3">
                      {item.brand && (
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{item.brand}</p>
                      )}
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">${item.price}</span>
                        {item.discount && (
                          <span className="text-sm text-green-600">{item.discount}% OFF</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        onClick={() => moveToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}