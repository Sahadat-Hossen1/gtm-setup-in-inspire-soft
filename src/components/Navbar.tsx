import Link from 'next/link';
import { User } from 'lucide-react';
import CartButton from './CartButton';
import WishlistButton from './WishlistButton';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] flex items-center justify-between px-[5%] bg-black/70 backdrop-blur-md border-b border-white/10 z-50 transition-all duration-300">
      <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent tracking-tight">
        INSPIRE
      </Link>
      <ul className="hidden md:flex gap-10 m-0 p-0 list-none">
        <li><Link href="/" className="text-gray-400 hover:text-white font-medium transition-colors">Home</Link></li>
        <li><Link href="/product" className="text-gray-400 hover:text-white font-medium transition-colors">Products</Link></li>
        <li><Link href="/about" className="text-gray-400 hover:text-white font-medium transition-colors">About Us</Link></li>
        <li><Link href="/contact" className="text-gray-400 hover:text-white font-medium transition-colors">Contact</Link></li>
      </ul>
      <div className="flex items-center gap-5">
        <Link href="/login" className="text-gray-400 hover:text-[#ff7e5f] transition-colors" aria-label="Login">
          <User className="w-5 h-5" />
        </Link>
        <WishlistButton />
        <CartButton />
      </div>
    </nav>
  );
}
