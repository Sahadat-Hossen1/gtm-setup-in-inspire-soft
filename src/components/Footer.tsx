"use client";

import Link from 'next/link';
import { trackEmailClick, trackWhatsAppClick } from '@/lib/gtm';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 pt-16 pb-8 px-[5%] bg-[#030303] text-gray-400">
      <div className="flex flex-wrap justify-between gap-8 mb-12">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent tracking-tight mb-4 inline-block">
            INSPIRE
          </div>
          <p className="max-w-[300px] leading-relaxed text-gray-500 mb-3">
            Curating exceptional products for the modern lifestyle. Quality without compromise.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a 
              href="mailto:hello@inspiresoft.com" 
              onClick={() => trackEmailClick('hello@inspiresoft.com', 'footer')}
              className="text-gray-400 hover:text-[#ff7e5f] transition-colors flex items-center gap-1.5"
            >
              <span>✉</span> hello@inspiresoft.com
            </a>
            <a 
              href="https://wa.me/15550000000" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('+15550000000', 'footer')}
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
            >
              <span>💬</span> WhatsApp: +1 (555) 000-0000
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-lg mb-2">Shop</h4>
          <Link href="/product" className="hover:text-[#ff7e5f] transition-colors">All Products</Link>
          <Link href="#" className="hover:text-[#ff7e5f] transition-colors">New Arrivals</Link>
          <Link href="#" className="hover:text-[#ff7e5f] transition-colors">Accessories</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-lg mb-2">Support</h4>
          <Link href="#" className="hover:text-[#ff7e5f] transition-colors">FAQ</Link>
          <Link href="#" className="hover:text-[#ff7e5f] transition-colors">Shipping</Link>
          <Link href="#" className="hover:text-[#ff7e5f] transition-colors">Returns</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-lg mb-2">Company</h4>
          <Link href="/about" className="hover:text-[#ff7e5f] transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-[#ff7e5f] transition-colors">Contact</Link>
          <Link href="#" className="hover:text-[#ff7e5f] transition-colors">Careers</Link>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>&copy; 2026 Inspire Soft. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
