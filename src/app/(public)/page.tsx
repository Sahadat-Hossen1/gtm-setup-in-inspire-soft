import Link from 'next/link';
import productsData from '../../data/product_data.json';
import AddToCartButton from '../../components/AddToCartButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Inspire Soft - Your premier destination for curated lifestyle products. Discover high-quality electronics, modern apparel, accessories, and home decor.",
};

export default function Home() {
  // Select first 4 products for featured section
  const featuredProducts = productsData.slice(0, 4);

  return (
    <>

      {/* Hero Section */}
      <section className="mt-[70px] min-h-[85vh] flex flex-col justify-center items-center text-center px-[5%] py-8 relative overflow-hidden">
        {/* Blob background */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 pointer-events-none" 
             style={{ background: 'radial-gradient(circle, rgba(255,126,95,0.12) 0%, rgba(254,180,123,0) 60%)' }}>
        </div>
        
        <div className="relative z-10 max-w-[900px] animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 bg-[#ff7e5f]/10 border border-[#ff7e5f]/20 text-[#ff7e5f] rounded-full text-sm font-semibold mb-8 tracking-wide">
            New Collection 2026
          </div>
          <h1 className="text-[clamp(3rem,7vw,6rem)] leading-[1.05] font-extrabold mb-6 tracking-tight">
            Elevate Your <span className="bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">Lifestyle</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-[600px] mx-auto leading-relaxed">
            Discover curated products designed for the modern individual. Experience unparalleled quality, minimalist aesthetics, and functional design that transforms your everyday.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/product" className="bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] text-black border-none py-4 px-10 rounded-full text-base font-semibold cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,126,95,0.3)]">
              Shop the Collection
            </Link>
            <Link href="/product" className="bg-transparent text-white border border-white/20 py-4 px-10 rounded-full text-base font-semibold cursor-pointer transition-all hover:bg-white/5 hover:border-white/40">
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-[5%] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-gray-400 mt-2">Handpicked essentials for you.</p>
          </div>
          <Link href="/product" className="text-gray-400 font-medium transition-colors hover:text-[#ff7e5f]">
            View All &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group bg-white/5 border border-white/10 rounded-3xl p-5 transition-all duration-400 ease-out flex flex-col cursor-pointer hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#1f1f1f] to-[#121212] rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-xs text-[#ff7e5f] uppercase tracking-wider font-semibold">
                  {product.category}
                </span>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {product.name}
                  </h3>
                </div>
                <div className="text-xl text-white font-bold mt-1">
                  ${product.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-gray-400 text-sm">{product.rating}</span>
                </div>
              </div>
              <AddToCartButton product={product} className="mt-6 w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-semibold transition-all hover:bg-white hover:text-black">
                Add to Cart
              </AddToCartButton>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
