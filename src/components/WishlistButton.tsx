"use client"

import React from 'react'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'

export default function WishlistButton() {
  const { items, setIsOpen } = useWishlist()
  
  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="relative text-gray-400 hover:text-red-500 transition-colors p-2 -m-2 group"
      aria-label="Wishlist"
    >
      <Heart className="w-5 h-5 group-hover:fill-red-500/20 transition-all duration-300" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
          {items.length}
        </span>
      )}
    </button>
  )
}
