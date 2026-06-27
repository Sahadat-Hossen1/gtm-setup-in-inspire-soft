"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import WishlistToggleButton from './WishlistToggleButton';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-[#0a0a0a] border border-[#222] rounded-2xl p-4 transition-all duration-300 ease-out flex flex-col hover:border-[#444] hover:shadow-2xl">
      <Link href={`/product/${product.id}`} className="w-full aspect-[4/5] bg-[#111] rounded-xl mb-5 flex items-center justify-center overflow-hidden relative cursor-pointer block">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Wishlist Button Overlay */}
        <WishlistToggleButton product={product} />
      </Link>
      
      <div className="flex flex-col gap-1.5 flex-1 px-1">
        <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
          {product.category}
        </span>
        
        <Link href={`/product/${product.id}`} className="flex justify-between items-start">
          <h3 className="text-base font-medium text-zinc-100 leading-snug group-hover:text-white transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-lg text-white font-semibold tracking-tight">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-zinc-400 text-sm font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={() => addToCart(product)}
        className="mt-5 w-full rounded-xl bg-[#1a1a1a] border border-[#333] text-zinc-300 font-medium transition-all hover:bg-white hover:text-black hover:border-white h-11 text-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add to Cart
      </Button>
    </div>
  );
}
