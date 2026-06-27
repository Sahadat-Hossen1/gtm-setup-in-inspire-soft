"use client"

import React from 'react'
import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CartSidebar() {
  const { isOpen, setIsOpen, items, removeFromCart, updateQuantity } = useCart()

  if (!isOpen) return null

  // Calculate total price and item count
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

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
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Your Cart</h2>
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm max-w-[250px]">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="outline"
                className="mt-4 rounded-full"
              >
                Continue Shopping
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
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2 bg-background border border-border/50 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border/50 p-6 bg-background space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/30">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Link href="/purchase" onClick={() => setIsOpen(false)} className="block w-full">
              <Button className="w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
