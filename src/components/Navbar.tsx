import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent text-white absolute w-full z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                <Image 
                  src="/logo.jpg"
                  alt="Masters Logo"
                  width={48}
                  height={48}
                  className="object-cover hover:scale-110 transition-transform"
                />
              </div>
            </Link>
            <span className="text-white font-bold text-xl tracking-wider">MASTER SALES TRAINING</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <SimpleNavLink href="/">Home</SimpleNavLink>
            <SimpleNavLink href="/lessons">Lessons</SimpleNavLink>
            <SimpleNavLink href="/articles">Articles</SimpleNavLink>
            <SimpleNavLink href="/rmk6">RMK6</SimpleNavLink>
            <SimpleNavLink href="/resources">Resources</SimpleNavLink>
            <SimpleNavLink href="/login">Login/sign</SimpleNavLink>
            <Button variant="outline" size="sm" className="rounded-full border-white text-white hover:bg-white hover:text-black transition-colors">
              EN/FR
            </Button>
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-black/70 backdrop-blur-md rounded-lg p-4 animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-3">
              <SimpleNavLink href="/">Home</SimpleNavLink>
              <SimpleNavLink href="/lessons">Lessons</SimpleNavLink>
              <SimpleNavLink href="/articles">Articles</SimpleNavLink>
              <SimpleNavLink href="/rmk6">RMK6</SimpleNavLink>
              <SimpleNavLink href="/resources">Resources</SimpleNavLink>
              <SimpleNavLink href="/login">Login/sign</SimpleNavLink>
              <Button variant="outline" size="sm" className="rounded-full border-white text-white hover:bg-white hover:text-black transition-colors mt-2">
                EN/FR
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const SimpleNavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link 
      href={href} 
      className="text-white hover:text-gray-300 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
};

export default Navbar; 