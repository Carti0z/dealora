'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  // Load cart from localStorage on mount (for guest users)
  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from database when user logs in
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // First, sync localStorage cart to database
      syncLocalStorageToDatabase();
      // Then load from database
      loadCartFromDatabase();
    }
  }, [status, session]);

  const syncLocalStorageToDatabase = async () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const localCart = JSON.parse(savedCart);
        if (localCart.length > 0) {
          // Sync each item to database
          for (const item of localCart) {
            await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId: item.id, quantity: item.quantity })
            });
          }
          // Clear localStorage after sync
          localStorage.removeItem('cart');
        }
      }
    } catch (error) {
      console.error('Failed to sync localStorage to database:', error);
    }
  };

  const loadCart = async () => {
    try {
      // First try localStorage for guest users
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      
      // If user is authenticated, load from database
      if (status === 'authenticated' && session?.user) {
        await loadCartFromDatabase();
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromDatabase = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
        // Update localStorage with database data
        localStorage.setItem('cart', JSON.stringify(data.items || []));
      }
    } catch (error) {
      console.error('Failed to load cart from database:', error);
    }
  };

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    // Update local state immediately for responsiveness
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    // Sync with database if user is logged in
    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: item.id, quantity: 1 })
        });
        
        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
          localStorage.setItem('cart', JSON.stringify(data.items || []));
        }
      } catch (error) {
        console.error('Failed to sync cart with database:', error);
      }
    } else {
      // Save to localStorage for guest users
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const removeItem = async (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch(`/api/cart?productId=${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
          localStorage.setItem('cart', JSON.stringify(data.items || []));
        }
      } catch (error) {
        console.error('Failed to remove item from database:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id, quantity })
        });
        
        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
          localStorage.setItem('cart', JSON.stringify(data.items || []));
        }
      } catch (error) {
        console.error('Failed to update quantity in database:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const clearCart = async () => {
    setItems([]);

    if (status === 'authenticated' && session?.user) {
      try {
        const response = await fetch('/api/cart', {
          method: 'DELETE'
        });
        
        if (response.ok) {
          localStorage.setItem('cart', JSON.stringify([]));
        }
      } catch (error) {
        console.error('Failed to clear cart in database:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}