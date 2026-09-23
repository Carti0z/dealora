'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

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
  clearWishlist: () => Promise<void>;
  getTotalItems: () => number;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  // Load wishlist from localStorage on mount (for guest users)
  useEffect(() => {
    loadWishlist();
  }, []);

  // Load wishlist from database when user logs in
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      loadWishlistFromDatabase();
    }
  }, [status, session]);

  const loadWishlist = async () => {
    try {
      // First try localStorage for guest users
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
      
      // If user is authenticated, load from database
      if (status === 'authenticated' && session?.user) {
        await loadWishlistFromDatabase();
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlistFromDatabase = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
        // Update localStorage with database data
        localStorage.setItem('wishlist', JSON.stringify(data.items || []));
      }
    } catch (error) {
      console.error('Failed to load wishlist from database:', error);
    }
  };

  const addItem = async (item: WishlistItem) => {
    // Update local state immediately for responsiveness
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, item];
    });

    // Sync with database if user is logged in
    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: item.id })
        });

        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
          localStorage.setItem('wishlist', JSON.stringify(data.items || []));
        }
      } catch (error) {
        console.error('Failed to sync wishlist with database:', error);
      }
    } else {
      // Save to localStorage for guest users
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  };

  const removeItem = async (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch(`/api/wishlist?productId=${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
          localStorage.setItem('wishlist', JSON.stringify(data.items || []));
        }
      } catch (error) {
        console.error('Failed to remove item from database:', error);
      }
    } else {
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const clearWishlist = async () => {
    setItems([]);

    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch('/api/wishlist', {
          method: 'DELETE'
        });
        
        if (response.ok) {
          localStorage.setItem('wishlist', JSON.stringify([]));
        }
      } catch (error) {
        console.error('Failed to clear wishlist in database:', error);
      }
    } else {
      localStorage.setItem('wishlist', JSON.stringify([]));
    }
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