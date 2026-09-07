'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  brand?: string;
  discount?: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from API on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: WishlistItem) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item.id })
      });

      if (response.ok) {
        setItems((prevItems) => {
          const existingItem = prevItems.find((i) => i.id === item.id);
          if (existingItem) {
            return prevItems;
          }
          return [...prevItems, item];
        });
      }
    } catch (error) {
      console.error('Failed to add item to wishlist:', error);
      // Fallback to localStorage if API fails
      setItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);
        if (existingItem) {
          return prevItems;
        }
        return [...prevItems, item];
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`/api/wishlist?productId=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
      // Fallback to localStorage if API fails
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
        getTotalItems,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}