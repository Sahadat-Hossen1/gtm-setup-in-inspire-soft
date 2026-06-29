import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from '../../../../components/AddToCartButton';
import WishlistToggleButton from '../../../../components/WishlistToggleButton';
import productsData from '../../../../data/product_data.json';
import type { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // In Next.js 15+ (React 19), params is a promise
  const resolvedParams = await params;
  const product = productsData.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <main className="flex-1 mt-[70px] py-12 px-[5%] max-w-7xl mx-auto w-full">
        <Link href="/product" className="inline-flex items-center text-zinc-500 hover:text-zinc-300 transition-colors mb-8 font-medium">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Products
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full aspect-square bg-[#0a0a0a] border border-[#222] rounded-3xl overflow-hidden relative p-4 lg:p-8">
              <div className="w-full h-full relative bg-[#111] rounded-2xl overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Wishlist Button Overlay */}
              <div className="absolute top-8 right-8 z-10">
                <WishlistToggleButton product={product} />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-start py-4">
            <span className="text-sm text-zinc-500 uppercase tracking-widest font-semibold mb-3">
              {product.category}
            </span>
            
            <h1 className="text-xl md:text-4xl font-semibold tracking-tight mb-4 text-zinc-400">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl text-white font-semibold tracking-tight">
                ${product.price.toFixed(2)}
              </div>
              <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#333] px-3 py-1 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-zinc-300 text-sm font-medium">{product.rating} / 5.0</span>
              </div>
            </div>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              {product.description}
            </p>
            
            <div className="w-full h-[1px] bg-[#222] mb-10"></div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <AddToCartButton product={product} size="lg" className="flex-1 rounded-xl h-14 text-base font-semibold bg-white text-black hover:bg-zinc-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to Cart
                </AddToCartButton>
              </div>
              
              <div className="flex items-center gap-4 mt-6 text-sm text-zinc-500 font-medium">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Secure Checkout
                </div>
                <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  Fast Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Generate static params so the dynamic routes can be pre-rendered if needed
export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}
