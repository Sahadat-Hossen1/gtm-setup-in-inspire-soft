import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import CartSidebar from "../components/CartSidebar";
import WishlistSidebar from "../components/WishlistSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
import GTMInitializer from "@/components/GTMInitializer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inspire Soft | Curated Products",
    template: "%s | Inspire Soft",
  },
  description: "Explore curated products for the modern lifestyle at Inspire Soft. Shop high-quality electronics, modern apparel, accessories, and home goods.",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="min-h-screen flex flex-col bg-[#050505] text-[#f0f0f0] overflow-x-hidden font-sans">
       {/* <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript> */}
        <Suspense fallback={null}>
          <GTMInitializer />
        </Suspense>

        <CartProvider>
          <WishlistProvider>
            <Navbar />
            {children}
            <CartSidebar />
            <WishlistSidebar />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
