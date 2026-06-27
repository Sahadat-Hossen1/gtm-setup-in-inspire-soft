# AGENTS.md — Inspire Soft (Ecommerce Demo Project)

This file guides AI coding agents (Claude Code, Cursor, Copilot, etc.) working on this project. Follow these rules strictly to keep the codebase consistent.

## Project Overview

A demo ecommerce frontend built to showcase UI/UX skills. **No real backend, no real payment logic, no real authentication logic.** This is a portfolio/demo project — focus on clean UI, correct routing, and realistic-looking interactions.

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Data:** Static JSON file (`src/data/products.json`) — no database
- **State:** React Context for cart (UI-level only, no persistence required unless asked)
- **Package manager:** Yarn (never use npm — do not generate package-lock.json)

## Folder Structure (do not deviate without asking)

```
src/
  data/
    products.json
  app/
    (public)/
      page.tsx              -> Home
      about/page.tsx
      contact/page.tsx
      product/
        page.tsx            -> Product listing (30 products)
        [id]/page.tsx        -> Dynamic product detail page
      cart/page.tsx
      checkout/page.tsx
      purchase/page.tsx

      login/page.tsx
      
    layout.tsx
    globals.css
  components/
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    ProductGrid.tsx
    ui/                      -> shadcn components live here
  context/
    CartContext.tsx
  types/
    product.ts
```

## Core Rules for AI Agents

1. **One task at a time.** Build one page or component per request. Do not generate multiple unrelated pages in a single response unless explicitly asked.
2. **Reuse existing components.** Before creating a new component, check if `ProductCard`, `Navbar`, `ProductGrid`, etc. already exist. Never duplicate.
3. **No real backend logic.** Checkout, purchase, login, and signup pages are **UI only**. Do not wire up real API calls, real validation servers, or database writes unless explicitly instructed.
4. **Cart logic stays minimal.** Add to Cart should update a simple Context state (count + items array) so the navbar badge updates. Do not add persistence (localStorage) unless asked.
5. **Use TypeScript everywhere.** No `.js`/`.jsx` files. Define types in `src/types/`.
6. **Styling consistency.** Always use Tailwind utility classes + shadcn/ui components. Do not introduce other UI libraries (e.g., MUI, Bootstrap).
7. **Images.** Use placeholder image URLs (`https://placehold.co/...` or `https://picsum.photos/...`) for all 30 dummy products. Do not try to source real images.
8. **Routing.** Use Next.js App Router conventions only. Dynamic product page must read `id` from `params` and match against `products.json`.when use image in any page/component always use next-image 

9. **Never touch `.env` files.** Do not read, modify, or print environment variable contents.
10. **Ask before adding new dependencies.** Do not install new npm packages without explicit confirmation.

## Data Contract (products.json)

Each product object must follow this shape — do not change field names without updating this file:

```ts
{
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}
```



