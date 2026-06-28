"use client"

import React, { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const email = String(data.email)
    const loginData = {
      email,
      loggedInAt: new Date().toISOString(),
    }
    
    console.log("Login submitted:", loginData)
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      localStorage.setItem('user_session', JSON.stringify(loginData))
      
      setIsLoading(false)
      // Redirect to profile page
      router.push('/profile')
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 bg-muted/10">
      <div className="w-full max-w-md bg-card rounded-[2rem] shadow-2xl shadow-primary/5 border border-border/50 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-foreground mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your Inspire Soft account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold ml-1 text-foreground/80">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="flex h-14 w-full rounded-2xl border-2 border-input/50 bg-background pl-12 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label htmlFor="password" className="text-sm font-semibold text-foreground/80">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="flex h-14 w-full rounded-2xl border-2 border-input/50 bg-background pl-12 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-colors shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-base font-bold rounded-2xl group relative overflow-hidden mt-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </span>
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-muted-foreground">Do not have an account? </span>
            <Link href="#" className="text-primary hover:underline ml-1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
