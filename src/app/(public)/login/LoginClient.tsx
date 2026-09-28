"use client"

import React, { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { trackLogin } from '@/lib/gtm'

export default function LoginClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const inputEmail = String(formData.get('email') || '').trim().toLowerCase()
    
    // লোকালস্টোরেজে পূর্বে রেজিস্টার করা বা সংরক্ষিত ইউজারদের সাথে ইমেইল মেলানো
    let matchedUser: { name?: string; email: string } | null = null

    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
      const foundInRegistered = registeredUsers.find((u: { email?: string }) => u.email?.toLowerCase() === inputEmail)
      
      if (foundInRegistered) {
        matchedUser = foundInRegistered
      } else {
        // সেশনে পূর্বে থাকা ইমেইল দিয়েও চেক করা
        const sessionStr = localStorage.getItem('user_session')
        if (sessionStr) {
          const session = JSON.parse(sessionStr)
          if (session?.email?.toLowerCase() === inputEmail) {
            matchedUser = session
          }
        }
      }
    } catch (err) {
      console.error('Error verifying user credentials:', err)
    }

    // পাসওয়ার্ড মিলানোর দরকার নেই - ইমেইল মিললেই লগইন অ্যালাউড
    if (matchedUser) {
      const loginData = {
        name: matchedUser.name || inputEmail.split('@')[0],
        email: matchedUser.email,
        loggedInAt: new Date().toISOString(),
      }
      
      setTimeout(() => {
        localStorage.setItem('user_session', JSON.stringify(loginData))
        
        const nameParts = (loginData.name || '').split(' ')
        trackLogin('email', {
          email: loginData.email,
          first_name: nameParts[0] || undefined,
          last_name: nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined,
        })
        
        setIsLoading(false)
        router.push('/profile')
      }, 500)
    } else {
      setIsLoading(false)
      setError('This email was not found in localStorage. Please sign up first.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 bg-muted/10">
      <div className="w-full max-w-md bg-card rounded-[2rem] shadow-2xl shadow-primary/5 border border-border/50 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-foreground mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your Inspire Soft account to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

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
            <Link href="/signup" className="text-primary hover:underline ml-1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
