"use client"

import React, { useEffect, useState } from 'react'
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface SavedOrder {
  orderNumber: string
  userEmail: string
  customer: {
    fullName: string
    email: string
    phone: string
  }
  deliveryAddress: {
    street: string
    city: string
    zipCode: string
  }
  items: {
    id: string
    name: string
    category: string
    price: number
    quantity: number
    lineTotal: number
  }[]
  total: number
  placedAt: string
}

interface ProfileState {
  email: string
  name: string
  initials: string
  phone: string
  orders: SavedOrder[]
}

const getProfileState = (): ProfileState | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const sessionStr = localStorage.getItem('user_session')
  if (!sessionStr) {
    return null
  }

  try {
    const session = JSON.parse(sessionStr)
    if (!session?.email) {
      return null
    }

    const namePart = session.email.split('@')[0]
    const name = namePart
      .split('.')
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
    const nameParts = name.split(' ')
    const initials = nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase()
    const orders = JSON.parse(localStorage.getItem('inspire_orders') || '[]') as SavedOrder[]

    return {
      email: session.email,
      name,
      initials,
      phone: session.phone || '+1 (555) 000-0000',
      orders: orders.filter((order) => order.userEmail === session.email || order.customer.email === session.email),
    }
  } catch {
    localStorage.removeItem('user_session')
    return null
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile] = useState<ProfileState | null>(getProfileState)

  useEffect(() => {
    if (!profile) {
      router.push('/login')
    }
  }, [router, profile])

  const handleSignOut = () => {
    localStorage.removeItem('user_session')
    router.push('/login')
  }

  // Show nothing while checking auth to prevent flicker
  if (!profile) {
    return <div className="min-h-[calc(100vh-8rem)] bg-muted/10"></div>
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-muted/10 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-foreground tracking-tight">My Account</h1>
        
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12">
          
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border-2 border-primary/20 shadow-sm text-primary font-bold transition-all">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                Profile Overview
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 rounded-2xl text-muted-foreground hover:text-foreground transition-colors text-left font-semibold">
              <Package className="w-5 h-5" />
              Order History
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 rounded-2xl text-muted-foreground hover:text-foreground transition-colors text-left font-semibold">
              <MapPin className="w-5 h-5" />
              Saved Addresses
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 rounded-2xl text-muted-foreground hover:text-foreground transition-colors text-left font-semibold">
              <Settings className="w-5 h-5" />
              Account Settings
            </button>
            
            <div className="pt-8">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-4 hover:bg-destructive/10 rounded-2xl text-destructive transition-colors text-left font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Profile Info Card */}
            <div className="bg-card p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-xl shadow-primary/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-[2rem] flex items-center justify-center text-primary text-3xl font-extrabold shadow-inner">
                    {profile.initials}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1">{profile.name}</h2>
                    <p className="text-muted-foreground font-medium">{profile.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl border-border/50 hover:bg-muted h-12 px-6">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-border/40">
                <div className="bg-muted/20 p-5 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">Phone Number</p>
                  <p className="text-lg font-semibold text-foreground">{profile.phone}</p>
                </div>
                <div className="bg-muted/20 p-5 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">Member Since</p>
                  <p className="text-lg font-semibold text-foreground">October 2026</p>
                </div>
              </div>
            </div>

            {/* Recent Orders Card */}
            <div className="bg-card p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-xl shadow-primary/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Recent Orders</h2>
                <button className="text-sm text-primary hover:underline font-semibold">View All Orders</button>
              </div>
              
              <div className="space-y-5">
                {profile.orders.length === 0 ? (
                  <div className="p-6 rounded-2xl border border-border/60 bg-muted/10 text-center">
                    <p className="text-muted-foreground font-medium">No orders placed yet.</p>
                  </div>
                ) : (
                  profile.orders.map((order) => {
                    const itemCount = order.items.reduce((total, item) => total + item.quantity, 0)
                    const placedDate = order.placedAt ? order.placedAt.slice(0, 10) : 'Today'

                    return (
                      <div key={order.orderNumber} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all gap-4 group bg-muted/10">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-background border border-border/50 rounded-xl flex items-center justify-center shadow-sm">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-bold text-lg mb-0.5">Order #{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground font-medium">
                              Placed on {placedDate} - {itemCount} item{itemCount === 1 ? '' : 's'} - {order.deliveryAddress.city}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:w-auto w-full gap-6">
                          <div className="text-right">
                            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                            <p className="text-sm font-bold text-blue-500">Processing</p>
                          </div>
                          <Button variant="secondary" className="rounded-xl h-11 bg-background hover:bg-muted font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            View Details
                          </Button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
