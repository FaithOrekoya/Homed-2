import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, sampleProducts } from '../data/content';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  unitPriceEstimate: number; // In USD for clinical wholesale estimation
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial sample items to populate badge counter (e.g. 2 items) as requested by the prompt
const initialSampleCart: CartItem[] = [
  {
    product: sampleProducts[0], // POC-V5 Portable Oxygen
    quantity: 1,
    unitPriceEstimate: 850,
  },
  {
    product: sampleProducts[4], // Mini-Air Pro Mesh Nebulizer
    quantity: 2,
    unitPriceEstimate: 38,
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('homed_cart_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback to initial
    }
    return initialSampleCart;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('homed_cart_v1', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPriceEstimate * item.quantity, 0);

  const addToCart = (product: ProductItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      // Estimated wholesale tier base price
      const priceEstimate =
        product.categoryKey === 'oxygen'
          ? 850
          : product.categoryKey === 'nebulizer'
          ? 38
          : product.categoryKey === 'hospital'
          ? 120
          : 25;

      return [...prev, { product, quantity, unitPriceEstimate: priceEstimate }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
