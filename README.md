# Inspire Soft — Premium eCommerce Frontend Demo (GTM Setup)

> [!NOTE]
> **Vibe Code & Analytics Demo:** This eCommerce storefront project is built fully with AI-generated "vibe code." The primary objective of this repository is to demonstrate and implement a clean, hardcoded setup for **Google Tag Manager (GTM)**, **Google Tag (gtag)**, and custom **GTM tracking events** (e.g., e-commerce events like `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, and `purchase`) within a Next.js App Router environment.

An elegant, modern, and high-fidelity eCommerce user interface built with **Next.js (App Router)**, **React 19**, **Tailwind CSS (v4)**, and **TypeScript**. 

This repository showcases advanced frontend skills, including custom animations, sleek dark mode aesthetics, interactive sidebars/drawers, and global state management using React Context—all optimized for a fluid, premium shopping experience.

---

## 🚀 Key Features

*   **Premium Visual Experience:** A fully optimized dark-themed UI featuring curated gradient accents (orange-peach), clean typography, modern layouts, glassmorphism (`backdrop-blur`), and subtle micro-interactions.
*   **Dynamic Product Listing:** Displays a library of modern lifestyle products with detail pages loaded dynamically using Next.js routing parameters.
*   **Interactive Shopping Cart:** Real-time state management using `CartContext` with an animated slide-over cart sidebar/drawer for adding, modifying, and removing products.
*   **Interactive Wishlist:** Quick-toggle wishlist state management with an animated drawer for keeping track of favorited items.
*   **UI-Only Authentication & Profile:** Smooth mock-login system that stores session state in `localStorage` and routes users to a custom dashboard page.
*   **Streamlined Checkout & Purchase Success:** High-fidelity simulated checkout process complete with shipping details entry and a celebration/success page.

---

## 🛠️ Tech Stack & Tools

*   **Framework:** Next.js 16 (App Router)
*   **Core Logic:** React 19 & TypeScript
*   **Styling:** Tailwind CSS v4
*   **Icons:** Lucide React
*   **Accessibility:** Radix UI Dialog primitives (for Cart and Wishlist Drawers)
*   **Package Manager:** Yarn

---

## 📂 Project Structure

```
src/
├── app/                       # Next.js App Router pages
│   ├── (public)/              # Main public route group
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact/Support form page
│   │   ├── login/             # Login / Authentication page (Mock)
│   │   ├── product/           # Product listing & details
│   │   │   ├── [id]/          # Dynamic single product detail page
│   │   │   └── page.tsx       # Main product grid with category filters
│   │   ├── profile/           # User dashboard and session info page
│   │   ├── purchase/          # Simulated checkout & success pages
│   │   └── page.tsx           # Homepage with Hero & Featured section
│   ├── layout.tsx             # Root layout wrapping Navbar, Footer, and Context Providers
│   └── globals.css            # Tailwind directives and global styles/animations
├── components/                # Reusable UI components
│   ├── AddToCartButton.tsx    # Action button for Cart state
│   ├── CartButton.tsx         # Navbar button displaying cart badge count
│   ├── CartSidebar.tsx        # Radix UI dialog sliding cart panel
│   ├── WishlistButton.tsx     # Navbar button displaying wishlist badge count
│   ├── WishlistSidebar.tsx    # Radix UI dialog sliding wishlist panel
│   ├── WishlistToggleButton.tsx# Dynamic favorite toggle button on product cards
│   ├── ProductCard.tsx        # Individual product card UI
│   ├── Navbar.tsx             # Top header navigation & state triggers
│   ├── Footer.tsx             # Bottom information navigation
│   └── ui/                    # Base UI / shadcn/ui custom design components
├── context/                   # React Context Providers for global state
│   ├── CartContext.tsx        # Global shopping cart context and actions
│   └── WishlistContext.tsx    # Global wishlist context and actions
├── data/                      # Mock static data files
│   └── product_data.json      # Library of sample products
└── types/                     # Shared TypeScript interfaces
    └── product.ts             # Product schema definitions
```

---

## 📋 Data Contract (`product.ts`)

All product items are loaded statically from `src/data/product_data.json` and must adhere strictly to the following TypeScript interface structure:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}
```

---

## ⚡ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/) installed.

### Installation

1. Clone the repository to your local workspace:
   ```bash
   git clone <repository-url>
   cd inspire_soft
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📊 Google Tag Manager & Custom Events Tracking

This project is primed for analytics implementation. You can hardcode Google Tag Manager (GTM) scripts or Google Tags directly and push custom events to the `window.dataLayer` array. 

Here are the key custom e-commerce events and their proposed integration locations:

| Event Name | Description | Suggested File Location |
| :--- | :--- | :--- |
| `view_item` | Triggered when a user views a specific product detail page. | `src/app/(public)/product/[id]/page.tsx` |
| `add_to_cart` | Triggered when an item is added to the shopping cart. | `src/components/AddToCartButton.tsx` |
| `remove_from_cart` | Triggered when an item is removed from the cart drawer. | `src/components/CartSidebar.tsx` |
| `view_cart` | Triggered when the sliding cart drawer is opened. | `src/components/CartSidebar.tsx` |
| `begin_checkout` | Triggered when a user starts the checkout process. | `src/components/CartSidebar.tsx` |
| `purchase` | Triggered upon successful mockup order submission. | `src/app/(public)/purchase/page.tsx` |

### Hardcoding Example
```typescript
// Example custom event pushed to dataLayer:
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    value: product.price,
    currency: 'USD',
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      quantity: 1
    }]
  }
});
```

---

## ⚠️ Notes for Developers (Mock Project Constraints)

*   **No Real Backend:** All pages (Login, Checkout, and Profile) operate strictly in the client-side state. Do not implement server API calls or real payment integrations.
*   **State Persistence:** Cart and Wishlist statuses operate using pure React Context. User sessions utilize `localStorage` for UI testing purposes only.
*   **Images:** Product assets are loaded using high-quality placeholder URLs (`https://placehold.co/...`). Do not upload heavy static image files.

