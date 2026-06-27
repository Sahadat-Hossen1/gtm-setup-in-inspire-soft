import ProductCard from '../../../components/ProductCard';
import productsData from '../../../data/product_data.json';

export default function ProductListingPage() {
  return (
    <>
      <main className="flex-1 mt-[70px] py-12 px-[5%]">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our <span className="bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our complete collection of meticulously curated items across electronics, fashion, and home goods.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
