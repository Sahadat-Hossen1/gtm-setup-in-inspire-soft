"use client"

import React, { useState } from 'react'
import { CheckCircle2, ArrowLeft, Package, MapPin, Phone, User, Mail, CreditCard, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

export default function PurchasePage() {
  const [isPlaced, setIsPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { items, clearCart } = useCart()

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate network delay for placing order
    setTimeout(() => {
      setOrderNumber(`ORD-${Math.floor(Math.random() * 900000) + 100000}`)
      setIsSubmitting(false)
      setIsPlaced(true)
      clearCart()
    }, 1500)
  }

  // --- Success State UI ---
  if (isPlaced) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 bg-muted/10">
        <div className="max-w-md w-full bg-card p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border/50 text-center space-y-8 animate-in zoom-in-95 duration-500">
          
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-150"></div>
            <div className="relative w-28 h-28 bg-green-500/10 text-green-500 rounded-[2rem] flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-14 h-14" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Order Placed!
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Thank you for shopping with Inspire Soft. We have received your order and will process it immediately.
            </p>
          </div>

          <div className="bg-muted/40 border border-border/60 rounded-2xl p-6 text-sm text-left space-y-4">
            <div className="flex items-center gap-3 text-foreground font-semibold mb-2">
              <Package className="w-5 h-5 text-primary" />
              Order Summary
            </div>
            <div className="h-px bg-border/50 w-full my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Order Number</span>
              <span className="text-foreground font-bold font-mono">
                {orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Estimated Delivery</span>
              <span className="text-foreground font-bold">3-5 Business Days</span>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/product" className="block w-full">
              <Button size="lg" className="w-full h-14 rounded-xl text-base font-bold group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1.5 transition-transform" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // --- Checkout Form UI ---
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-start justify-center p-6 bg-muted/10 py-12 md:py-20">
      <div className="max-w-5xl w-full grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 animate-in fade-in duration-500">
        
        {/* Left Column: Delivery Form */}
        <div className="bg-card p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-border/50">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">Secure Checkout</h1>
            <p className="text-muted-foreground text-sm">Please fill in your delivery details to complete your order.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border/50 pb-2">
                <User className="w-5 h-5 text-primary" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1 text-foreground/80">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="flex h-12 w-full rounded-2xl border-2 border-input/50 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1 text-foreground/80">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                    <input required type="email" placeholder="john@example.com" className="flex h-12 w-full rounded-2xl border-2 border-input/50 bg-background pl-11 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 pt-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border/50 pb-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Address
              </h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1 text-foreground/80">Street Address</label>
                  <input required type="text" placeholder="123 Main Street, Apt 4B" className="flex h-12 w-full rounded-2xl border-2 border-input/50 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold ml-1 text-foreground/80">City</label>
                    <input required type="text" placeholder="New York" className="flex h-12 w-full rounded-2xl border-2 border-input/50 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1 text-foreground/80">Zip Code</label>
                    <input required type="text" placeholder="10001" className="flex h-12 w-full rounded-2xl border-2 border-input/50 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1 text-foreground/80">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                    <input required type="tel" placeholder="+1 (555) 000-0000" className="flex h-12 w-full rounded-2xl border-2 border-input/50 bg-background pl-11 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              {/* Note: In a real app we'd have a payment section here. AGENTS.md rules specify UI only. */}
              <Button 
                type="submit" 
                disabled={isSubmitting || items.length === 0}
                className="w-full h-14 text-base font-bold rounded-2xl group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? 'Processing Order...' : `Place Order — $${totalPrice.toFixed(2)}`}
                </span>
              </Button>
              {items.length === 0 && (
                <p className="text-destructive text-sm text-center mt-3 font-medium">
                  Your cart is empty. Add items before checking out.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-card p-8 rounded-[2.5rem] shadow-xl border border-border/50 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Order Summary
          </h2>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No items in cart.</p>
            ) : (
              items.map((item, i) => (
                <div key={`${item.id}-${i}`} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.category} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
          
          <div className="h-px bg-border/50 w-full my-6"></div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-border/30 text-foreground">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
            <CreditCard className="w-4 h-4" />
            <span>Secure 256-bit SSL encryption</span>
          </div>
        </div>
        
      </div>
    </div>
  )
}
