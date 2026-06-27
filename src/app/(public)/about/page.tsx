"use client"

import React from 'react'
import { Zap, Shield, HeartHandshake } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            About Inspire Soft
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We are passionate about delivering the best products to our customers. 
            Our mission is to simplify your life with innovative solutions and unparalleled quality.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2024, Inspire Soft started with a simple idea: to make high-quality products accessible to everyone. What began as a small passion project has grown into a leading ecommerce platform, serving thousands of happy customers worldwide.
                </p>
                <p>
                  We believe in continuous innovation and listening to our community. Every product we offer is carefully curated and designed with our users in mind. Our journey is driven by a commitment to excellence and a desire to make a positive impact.
                </p>
              </div>
            </div>
            <div className="relative h-[450px] rounded-3xl overflow-hidden bg-muted shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Team working together" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-10 rounded-3xl shadow-sm border border-border/50 text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We constantly push boundaries to bring you the latest and most effective solutions for your everyday needs.
              </p>
            </div>
            <div className="bg-background p-10 rounded-3xl shadow-sm border border-border/50 text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                We never compromise on the quality of our products. Excellence is our standard, not just a goal.
              </p>
            </div>
            <div className="bg-background p-10 rounded-3xl shadow-sm border border-border/50 text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Customer First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your satisfaction is our top priority. We are here to support you every step of the way with dedicated service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Experience the Best?</h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join thousands of satisfied customers and explore our premium collection today. Discover the difference quality makes.
          </p>
          <Link 
            href="/product" 
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-background text-foreground hover:bg-background/90 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}
