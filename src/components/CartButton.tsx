"use client";

import { useCart } from '../context/CartContext';

export default function CartButton() {
  const { setIsOpen, cartCount } = useCart();

  return (
    <button 
      onClick={() => setIsOpen(true)} 
      className="flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2 px-5 rounded-full text-sm cursor-pointer transition-all hover:bg-white/20 hover:-translate-y-[1px]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      Cart ({cartCount})
    </button>
  );
}
