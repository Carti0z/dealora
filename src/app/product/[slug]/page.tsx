'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock product data
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: slug || 'wireless-headphones',
    brand: 'AudioTech',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 1247,
    stock: 15,
    images: ['🎧', '🎧', '🎧', '🎧'],
    description: 'Experience premium sound quality with our latest wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and ultra-comfortable design for all-day listening.',
    specifications: [
      { label: 'Driver Size', value: '40mm' },
      { label: 'Frequency Response', value: '20Hz - 20kHz' },
      { label: 'Impedance', value: '32 Ohm' },
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Charging Time', value: '2 hours' },
      { label: 'Connectivity', value: 'Bluetooth 5.2' },
      { label: 'Weight', value: '250g' },
      { label: 'Noise Cancellation', value: 'Active' },
    ],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Comfortable over-ear design',
      'Bluetooth 5.2 connectivity',
      'Built-in microphone',
      'Touch controls',
      'Foldable design',
      'USB-C charging',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue', 'Red'],
    shipping: 'Free shipping on orders over $50',
    returns: '30-day return policy',
    warranty: '2-year warranty',
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, quantity + change)));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-orange-500">Home</a>
            <span>/</span>
            <a href="/shop" className="hover:text-orange-500">Shop</a>
            <span>/</span>
            <a href="/categories/electronics" className="hover:text-orange-500">Electronics</a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                <motion.span
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-9xl"
                >
                  {product.images[selectedImage]}
                </motion.span>
              </div>
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <span className="text-3xl">{image}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>

              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                <span className="text-gray-600">({product.reviewCount.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                )}
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.discount && (
                  <Badge className="bg-green-500 text-white">{product.discount}% OFF</Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Size</p>
                  <div className="flex space-x-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-orange-500 bg-orange-50 text-orange-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Color</p>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                          selectedColor === color
                            ? 'border-orange-500 bg-orange-50 text-orange-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Quantity</p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="px-4">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-4">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Shipping & Returns */}
              <Card className="p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">{product.shipping}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-3">
                  <RotateCcw className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">{product.returns}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Warranty</p>
                    <p className="text-sm text-gray-600">{product.warranty}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <Card className="p-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-medium text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <Card className="p-6">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600">Reviews will be displayed here</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}