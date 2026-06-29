"use client"

import React from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactClient() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const contactData = {
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
      submittedAt: new Date().toISOString(),
    }

    console.log('Contact form submitted:', contactData)
    e.currentTarget.reset()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-24 px-6 text-center border-b border-border/50">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We would love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mb-10">
                Reach out to us through any of the channels below. We strive to respond to all inquiries within 24 hours during business days.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground mb-2">Our friendly team is here to help.</p>
                    <a href="mailto:hello@inspiresoft.com" className="text-primary font-medium hover:underline text-lg">
                      hello@inspiresoft.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground mb-2">Come say hello at our office HQ.</p>
                    <p className="font-medium text-lg leading-relaxed">
                      100 Smith Street<br />
                      Collingwood VIC 3066 AU
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground mb-2">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+1(555)000-0000" className="text-primary font-medium hover:underline text-lg">
                      +1 (555) 000-0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Working Hours</h3>
                    <p className="text-muted-foreground mb-2">Our support is available to help you.</p>
                    <p className="font-medium text-lg leading-relaxed">
                      Monday - Friday: 9AM - 6PM<br />
                      Weekend: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Send us a message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                    <input 
                      type="text" 
                      id="first-name" 
                      name="firstName"
                      required
                      className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" 
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                    <input 
                      type="text" 
                      id="last-name" 
                      name="lastName"
                      required
                      className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" 
                      placeholder="Last name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" 
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    required
                    className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" 
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    className="flex min-h-[160px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors" 
                    placeholder="Leave us a message..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-base font-medium group h-14 rounded-xl mt-4">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
