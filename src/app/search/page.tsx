'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Heart, Eye, Search, X, TrendingUp } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockProducts = [
    { id: '1', name: 'Premium Wireless Headphones', category: 'Electronics', price: 149.99, image: '🎧' },
    { id: '2', name: 'Smart Watch Pro', category: 'Electronics', price: 299.99, image: '⌚' },
    { id: '3', name: 'Designer Jacket', category: 'Fashion', price: 149.99, image: '🧥' },
    { id: '4', name: 'Running Shoes', category: 'Fashion', price: 89.99, image: '👟' },
    { id: '5', name: 'Gaming Keyboard', category: 'Gaming', price: 129.99, image: '⌨️' },
    { id: '6', name: 'Wireless Mouse', category: 'Gaming', price: 79.99, image: '🖱️' },
    { id: '7', name: 'Smart Speaker', category: 'Home', price: 99.99, image: '🔊' },
    { id: '8', name: 'Coffee Maker', category: 'Home', price: 129.99, image: '☕' },
  ];

  const allSuggestions = [
    'wireless headphones',
    'smart watch',
    'gaming keyboard',
    'running shoes',
    'coffee maker',
    'designer jacket',
    'bluetooth speaker',
    'wireless mouse',
  ];

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
      // Simulate search
      setTimeout(() => {
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        
        const filteredSuggestions = allSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5));
        setIsSearching(false);
      }, 300);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would trigger the search
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search</h1>
            <p className="text-gray-600">Find products across our entire catalog</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for products, brands, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>

          {/* Search Suggestions */}
          {query && suggestions.length > 0 && !isSearching && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Suggestions</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          )}

          {/* Search Results */}
          {!isSearching && query && (
            <>
              {results.length > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-gray-600">
                      Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                    </p>
                  </div>
                  
                  {/* Trending Results */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold text-gray-900">Trending Results</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {results.slice(0, 4).map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                            <div className="relative">
                              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="text-5xl">{product.image}</span>
                              </div>
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
                              <Badge variant="outline" className="text-xs">{product.category}</Badge>
                              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* All Results */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">All Results</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {results.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                            <div className="relative">
                              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="text-5xl">{product.image}</span>
                              </div>
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
                              <Badge variant="outline" className="text-xs">{product.category}</Badge>
                              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
                  <Button
                    variant="outline"
                    onClick={() => setQuery('')}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!query && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
              <p className="text-gray-600">Enter a product name, brand, or category above</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}