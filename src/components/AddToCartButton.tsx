"use client";

import React from 'react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface AddToCartButtonProps extends React.ComponentProps<typeof Button> {
  product: Product;
}

export default function AddToCartButton({ product, children, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(product)} {...props}>
      {children}
    </Button>
  );
}
