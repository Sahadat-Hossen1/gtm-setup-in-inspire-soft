"use client"

import React, { useEffect, useState } from 'react'
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('Guest User')
  const [userInitials, setUserInitials] = useState<string>('GU')
  const [userPhone, setUserPhone] = useState<string>('+1 (555) 000-0000')

  useEffect(() => {
    // Check if user is logged in
    const sessionStr = localStorage.getItem('user_session')
    if (!sessionStr) {
      router.push('/login')
      return
    }

    try {
      const session = JSON.parse(sessionStr)
      if (session && session.email) {
        setUserEmail(session.email)
        
        // Generate name from email (e.g., john.doe@example.com -> John Doe)
        const namePart = session.email.split('@')[0]
        const formattedName = namePart
          .split('.')
          .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
        
        setUserName(formattedName)
        
        // Generate initials
        const parts = formattedName.split(' ')
        if (parts.length >= 2) {
          setUserInitials(`${parts[0][0]}${parts[1][0]}`.toUpperCase())
        } else {
          setUserInitials(formattedName.substring(0, 2).toUpperCase())
        }

        // Generate or retrieve phone number for this user
        let phone = session.phone
        if (!phone) {
          phone = `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
          session.phone = phone
          localStorage.setItem('user_session', JSON.stringify(session))
        }
        setUserPhone(phone)
      }
    } catch (e) {
      console.error('Invalid session')
      router.push('/login')
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('user_session')
    router.push('/login')
  }

  // Show nothing while checking auth to prevent flicker
  if (!userEmail) {
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
                    {userInitials}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1">{userName}</h2>
                    <p className="text-muted-foreground font-medium">{userEmail}</p>
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
                  <p className="text-lg font-semibold text-foreground">{userPhone}</p>
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
                {[
                  { id: '849201', date: 'Oct 24, 2026', total: 129.99, status: 'Delivered', color: 'text-green-500' },
                  { id: '838192', date: 'Oct 12, 2026', total: 45.00, status: 'In Transit', color: 'text-blue-500' }
                ].map((order, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all gap-4 group bg-muted/10">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-background border border-border/50 rounded-xl flex items-center justify-center shadow-sm">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-0.5">Order #ORD-{order.id}</p>
                        <p className="text-sm text-muted-foreground font-medium">Placed on {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:w-auto w-full gap-6">
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                        <p className={`text-sm font-bold ${order.color}`}>{order.status}</p>
                      </div>
                      <Button variant="secondary" className="rounded-xl h-11 bg-background hover:bg-muted font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
