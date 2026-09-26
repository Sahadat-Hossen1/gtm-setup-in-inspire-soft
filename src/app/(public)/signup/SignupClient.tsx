'use client'

import React, { useState } from 'react'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { trackSignUp } from '@/lib/gtm'

export default function SignupClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim().toLowerCase()
    const password = String(formData.get('password') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    const session = {
      name,
      email,
      signedUpAt: new Date().toISOString(),
    }

    localStorage.setItem('user_session', JSON.stringify(session))
    trackSignUp('email')

    setIsLoading(false)
    router.push('/profile')
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 bg-muted/10">
      <div className="w-full max-w-md bg-card rounded-[2rem] shadow-2xl shadow-primary/5 border border-border/50 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-foreground mb-3 tracking-tight">Create Account</h1>
            <p className="text-muted-foreground text-sm">Create your demo Inspire Soft account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold ml-1 text-foreground/80">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <input id="name" name="name" type="text" required className="flex h-14 w-full rounded-2xl border-2 border-input/50 bg-background pl-12 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary" placeholder="Alex Morgan" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold ml-1 text-foreground/80">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <input id="email" name="email" type="email" required className="flex h-14 w-full rounded-2xl border-2 border-input/50 bg-background pl-12 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary" placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold ml-1 text-foreground/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <input id="password" name="password" type="password" required minLength={6} className="flex h-14 w-full rounded-2xl border-2 border-input/50 bg-background pl-12 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary" placeholder="At least 6 characters" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold ml-1 text-foreground/80">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} className="flex h-14 w-full rounded-2xl border-2 border-input/50 bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary" placeholder="Repeat your password" />
            </div>

            {error && <p className="text-sm text-destructive font-medium">{error}</p>}

            <Button type="submit" className="w-full h-14 text-base font-bold rounded-2xl mt-3" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-muted-foreground">Already have an account?</span>
            <Link href="/login" className="text-primary hover:underline ml-1">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}