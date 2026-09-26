import ProductCatalog from '../../../components/ProductCatalog';
import productsData from '../../../data/product_data.json';
import type { Metadata } from 'next';
import { ProductListViewTracker } from '../../../components/ProductViewTracker';

export const metadata: Metadata = {
  title: "Shop Products",
  description: "Browse our premium range of curated lifestyle items, including high-quality electronics, modern apparel, accessories, and home goods.",
};

export default function ProductListingPage() {
  const trackingItems = productsData.map((product) => ({
    item_id: product.id,
    item_name: product.name,
    price: product.price,
    item_category: product.category,
    currency: 'USD',
  }));

  return (
    <>
      <ProductListViewTracker items={trackingItems} />
      <main className="flex-1 mt-[70px] py-12 px-[5%]">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our <span className="bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our complete collection of meticulously curated items across electronics, fashion, and home goods.
          </p>
        </div>

        <ProductCatalog products={productsData} />
      </main>
    </>
  );
}
