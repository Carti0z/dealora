'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye, SlidersHorizontal, ArrowUpDown, Sparkles, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const categories: Record<string, { name: string; image: string; productCount: number; color: string; description: string; subcategories: string[] }> = {
  'electronics': { 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', 
    productCount: 2340, 
    color: 'from-blue-500 to-blue-600',
    description: 'Discover the latest in technology with our extensive electronics collection. From smartphones to home entertainment systems, find everything you need to stay connected and entertained.',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Cameras', 'TVs', 'Tablets']
  },
  'phones-tablets': { 
    name: 'Phones & Tablets', 
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', 
    productCount: 1890, 
    color: 'from-purple-500 to-purple-600',
    description: 'Stay connected with the latest smartphones and tablets from top brands. Featuring cutting-edge technology and stunning displays.',
    subcategories: ['Smartphones', 'Tablets', 'Accessories', 'Cases', 'Chargers']
  },
  'computers': { 
    name: 'Computers', 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', 
    productCount: 1560, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Powerful computers for work, gaming, and creativity. Find laptops, desktops, and all-in-one PCs from leading manufacturers.',
    subcategories: ['Laptops', 'Desktops', 'Monitors', 'Components', 'Accessories']
  },
  'fashion': { 
    name: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', 
    productCount: 3240, 
    color: 'from-pink-500 to-pink-600',
    description: 'Express your style with our curated fashion collection. From trendy outfits to timeless classics, find the perfect look for any occasion.',
    subcategories: ['Women', 'Men', 'Kids', 'Shoes', 'Accessories', 'Jewelry']
  },
  'shoes': { 
    name: 'Shoes', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', 
    productCount: 2180, 
    color: 'from-orange-500 to-orange-600',
    description: 'Step into style with our footwear collection. Sneakers, boots, sandals, and more from your favorite brands.',
    subcategories: ['Sneakers', 'Boots', 'Sandals', 'Athletic', 'Formal', 'Kids']
  },
  'beauty': { 
    name: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', 
    productCount: 1450, 
    color: 'from-rose-500 to-rose-600',
    description: 'Enhance your natural beauty with our premium beauty products. Skincare, makeup, haircare, and more from top brands.',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Tools', 'Organic']
  },
  'home-kitchen': { 
    name: 'Home & Kitchen', 
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', 
    productCount: 2890, 
    color: 'from-green-500 to-green-600',
    description: 'Transform your home with our kitchen and home essentials. Cookware, appliances, decor, and organization solutions.',
    subcategories: ['Kitchen', 'Bedding', 'Decor', 'Storage', 'Appliances', 'Furniture']
  },
  'furniture': { 
    name: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', 
    productCount: 980, 
    color: 'from-teal-500 to-teal-600',
    description: 'Create your perfect space with our furniture collection. Living room, bedroom, office, and outdoor furniture for every style.',
    subcategories: ['Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor', 'Storage']
  },
  'gaming': { 
    name: 'Gaming', 
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80', 
    productCount: 1670, 
    color: 'from-red-500 to-red-600',
    description: 'Level up your gaming experience with consoles, games, accessories, and gaming PCs from top gaming brands.',
    subcategories: ['Consoles', 'Games', 'Accessories', 'PC Gaming', 'VR', 'Collectibles']
  },
  'sports': { 
    name: 'Sports', 
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80', 
    productCount: 1340, 
    color: 'from-yellow-500 to-yellow-600',
    description: 'Get active with our sports and fitness equipment. Gear for every sport, fitness trackers, and outdoor adventure essentials.',
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports', 'Cycling', 'Running']
  },
  'accessories': { 
    name: 'Accessories', 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', 
    productCount: 2560, 
    color: 'from-cyan-500 to-cyan-600',
    description: 'Complete your look with our accessories collection. Watches, bags, jewelry, and tech accessories for every style.',
    subcategories: ['Watches', 'Bags', 'Jewelry', 'Tech', 'Sunglasses', 'Belts']
  },
  'groceries': { 
    name: 'Groceries', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', 
    productCount: 4120, 
    color: 'from-emerald-500 to-emerald-600',
    description: 'Shop fresh groceries and pantry essentials. Organic produce, snacks, beverages, and household items delivered to your door.',
    subcategories: ['Fresh Produce', 'Pantry', 'Beverages', 'Snacks', 'Household', 'Organic']
  },
};

// Mock products data - expanded with more variety
const mockProducts = [
  { id: '1', name: 'iPhone 15 Pro Max', price: 899.99, originalPrice: 1199, discount: 25, rating: 4.8, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80', brand: 'Apple' },
  { id: '2', name: 'Samsung Galaxy S24', price: 799.99, originalPrice: 999, discount: 20, rating: 4.6, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80', brand: 'Samsung' },
  { id: '3', name: 'MacBook Air M3', price: 999.99, originalPrice: 1299, discount: 23, rating: 4.9, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', brand: 'Apple' },
  { id: '4', name: 'Sony WH-1000XM5', price: 279.99, originalPrice: 399, discount: 30, rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', brand: 'Sony' },
  { id: '5', name: 'Apple Watch Ultra', price: 599.99, originalPrice: 799, discount: 25, rating: 4.8, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80', brand: 'Apple' },
  { id: '6', name: 'iPad Pro 12.9"', price: 1099.99, originalPrice: 1299, discount: 15, rating: 4.6, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', brand: 'Apple' },
  { id: '7', name: 'Dell XPS 15', price: 1299.99, originalPrice: 1599, discount: 19, rating: 4.5, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80', brand: 'Dell' },
  { id: '8', name: 'AirPods Pro 2', price: 199.99, originalPrice: 249, discount: 20, rating: 4.7, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80', brand: 'Apple' },
  { id: '9', name: 'Nintendo Switch OLED', price: 349.99, originalPrice: 399, discount: 12, rating: 4.8, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&q=80', brand: 'Nintendo' },
  { id: '10', name: 'Logitech MX Master 3', price: 99.99, originalPrice: 129, discount: 23, rating: 4.9, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80', brand: 'Logitech' },
  { id: '11', name: 'Samsung 65" QLED TV', price: 899.99, originalPrice: 1199, discount: 25, rating: 4.6, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80', brand: 'Samsung' },
  { id: '12', name: 'Bose SoundLink Max', price: 399.99, originalPrice: 449, discount: 11, rating: 4.7, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', brand: 'Bose' },
];

// Featured brands for each category
const featuredBrands: Record<string, string[]> = {
  'electronics': ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP'],
  'phones-tablets': ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'],
  'computers': ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS'],
  'fashion': ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci'],
  'shoes': ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse'],
  'beauty': ['Sephora', 'MAC', 'L\'Oreal', 'Estée Lauder', 'Clinique'],
  'home-kitchen': ['KitchenAid', 'Ninja', 'Cuisinart', 'Dyson', 'iRobot'],
  'furniture': ['IKEA', 'West Elm', 'Ashley', 'Wayfair', 'Pottery Barn'],
  'gaming': ['Sony', 'Microsoft', 'Nintendo', 'Razer', 'Logitech'],
  'sports': ['Nike', 'Adidas', 'Under Armour', 'Reebok', 'Puma'],
  'accessories': ['Coach', 'Michael Kors', 'Fossil', 'Ray-Ban', 'Gucci'],
  'groceries': ['Whole Foods', 'Trader Joe\'s', 'Kroger', 'Safeway', 'Aldi'],
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories[slug];
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
      </div>
    );
  }

  const sortedProducts = [...mockProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'discount': return b.discount - a.discount;
      default: return 0;
    }
  });

  const filteredProducts = priceRange === 'all' 
    ? sortedProducts 
    : sortedProducts.filter(p => {
        if (priceRange === 'under-50') return p.price < 50;
        if (priceRange === '50-100') return p.price >= 50 && p.price < 100;
        if (priceRange === '100-500') return p.price >= 100 && p.price < 500;
        if (priceRange === '500+') return p.price >= 500;
        return true;
      });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${category.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <img src={category.image} alt={category.name} className="w-20 h-20 rounded-xl object-cover shadow-lg" />
            <div>
              <h1 className="text-4xl font-bold">{category.name}</h1>
              <p className="text-white/90 mt-1">{category.productCount.toLocaleString()} Products Available</p>
            </div>
          </div>
          <p className="text-white/90 max-w-2xl text-lg">{category.description}</p>
        </div>
      </div>

      {/* Subcategories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Browse:</span>
            {category.subcategories.map((sub, index) => (
              <React.Fragment key={sub}>
                {index > 0 && <span className="text-gray-300">•</span>}
                <button className="text-sm text-gray-700 hover:text-orange-500 whitespace-nowrap transition-colors">
                  {sub}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  {showFilters ? 'Hide' : 'Show'}
                </Button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {['all', 'under-50', '50-100', '100-500', '500+'].map((range) => (
                      <label key={range} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          value={range}
                          checked={priceRange === range}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-600">
                          {range === 'all' ? 'All Prices' : range === 'under-50' ? 'Under $50' : range === '50-100' ? '$50 - $100' : range === '100-500' ? '$100 - $500' : '$500+'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-orange-500 focus:ring-orange-500" />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                          <span className="text-sm text-gray-600 ml-2">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Discount</h4>
                  <div className="space-y-2">
                    {['10%', '20%', '30%', '50%'].map((discount) => (
                      <label key={discount} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-orange-500 focus:ring-orange-500" />
                        <span className="text-sm text-gray-600">{discount} or more</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300" />
                      {product.discount > 0 && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white shadow-md">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white shadow-md">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="text-sm text-gray-500">({product.rating})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                        )}
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
