'use client';

import { FormEvent, useState } from 'react';
import ProductCard from './ProductCard';
import { trackSearch } from '@/lib/gtm';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

export default function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(products);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = query.trim();
    const normalizedQuery = searchTerm.toLowerCase();
    const results = normalizedQuery
      ? products.filter((product) =>
          [product.name, product.category, product.description]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)
        )
      : products;

    setVisibleProducts(results);
    if (searchTerm) {
      trackSearch(searchTerm, results.length);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mx-auto mb-10 flex max-w-xl gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="h-12 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#ff7e5f]"
        />
        <button type="submit" className="h-12 rounded-xl bg-white px-5 font-semibold text-black transition-colors hover:bg-[#ff7e5f]">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p className="text-center text-gray-400">No products found.</p>
      )}
    </>
  );
}