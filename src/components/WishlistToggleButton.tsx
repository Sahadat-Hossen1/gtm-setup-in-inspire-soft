"use client"

import React from 'react'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { Product } from '@/types/product'

interface WishlistToggleButtonProps {
  product: Product
  className?: string
}

export default function WishlistToggleButton({ product, className = "" }: WishlistToggleButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  
  const isWished = isInWishlist(product.id)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWished) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <button 
      onClick={toggleWishlist}
      className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all z-10 shadow-lg ${
        isWished 
          ? 'bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30' 
          : 'bg-black/20 border-white/10 text-white hover:bg-black/40 hover:text-red-400'
      } ${className}`}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-5 h-5 transition-all duration-300 ${isWished ? 'fill-current scale-110' : 'hover:scale-110'}`} />
    </button>
  )
}
