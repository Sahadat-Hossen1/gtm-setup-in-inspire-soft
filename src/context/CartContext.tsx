import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/product';

interface CartItem extends Product {}

interface CartContextProps {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: Product) => {
    setItems((prev) => [...prev, product]);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const cartCount = items.length;

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, isOpen, setIsOpen, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
