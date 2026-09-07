import { NextRequest, NextResponse } from 'next/server';

// Mock product data - in production this would come from a database
const mockProducts = [
  { id: '1', name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', category: 'Electronics', price: 899.99, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80' },
  { id: '2', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', category: 'Electronics', price: 949.99, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80' },
  { id: '3', name: 'Nike Air Jordan 1', slug: 'nike-air-jordan-1', category: 'Fashion', price: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: '4', name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', category: 'Electronics', price: 599.99, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80' },
  { id: '5', name: 'Designer Leather Handbag', slug: 'designer-leather-handbag', category: 'Fashion', price: 174.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80' },
  { id: '6', name: 'Sony WH-1000XM5 Headphones', slug: 'sony-wh-1000xm5-headphones', category: 'Electronics', price: 279.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { id: '7', name: 'MacBook Air M3', slug: 'macbook-air-m3', category: 'Electronics', price: 999.99, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
  { id: '8', name: 'Samsung 65" 4K Smart TV', slug: 'samsung-65-4k-smart-tv', category: 'Electronics', price: 599.99, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80' },
  { id: '9', name: 'Wireless Headphones', slug: 'wireless-headphones', category: 'Electronics', price: 69.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { id: '10', name: 'Smart Watch Pro', slug: 'smart-watch-pro', category: 'Electronics', price: 149.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: '11', name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', category: 'Electronics', price: 39.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80' },
  { id: '12', name: 'Wireless Earbuds', slug: 'wireless-earbuds', category: 'Electronics', price: 29.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  const searchQuery = query.toLowerCase();
  
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery)
  );

  return NextResponse.json({
    products: filteredProducts,
    query,
    count: filteredProducts.length,
  });
}
