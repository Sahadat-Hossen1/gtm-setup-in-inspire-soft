"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/types/product'

interface WishlistContextType {
  items: Product[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addToWishlist = (product: Product) => {
    setItems((prev) => {
      if (!prev.find(item => item.id === product.id)) {
        return [...prev, product]
      }
      return prev
    })
  }

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{ items, isOpen, setIsOpen, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
