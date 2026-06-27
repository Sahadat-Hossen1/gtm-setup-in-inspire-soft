"use client"

import React from 'react'
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function WishlistSidebar() {
  const { isOpen, setIsOpen, items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
            <h2 className="text-xl font-bold">Your Wishlist</h2>
            <span className="bg-red-500/10 text-red-500 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
              {items.length}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
              <p className="text-muted-foreground text-sm max-w-[250px]">
                Save items you love here to easily find them later.
              </p>
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="outline"
                className="mt-4 rounded-full"
              >
                Explore Products
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 group hover:border-primary/30 transition-colors">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-background shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm line-clamp-2 pr-4">{item.name}</h4>
                        <button 
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="font-semibold text-primary">
                        ${item.price.toFixed(2)}
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="rounded-lg h-8 px-3 text-xs flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          addToCart(item)
                          removeFromWishlist(item.id)
                        }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
