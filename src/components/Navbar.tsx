import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image 
                  src="/logo.jpg"
                  alt="Masters Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            </Link>
            <span className="text-white font-medium text-xl">MASTER SALES TRAINING</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <SimpleNavLink href="/">Home</SimpleNavLink>
            <SimpleNavLink href="/train">Train</SimpleNavLink>
            <SimpleNavLink href="/rmk6">RMK6</SimpleNavLink>
            <SimpleNavLink href="/resources">Resources</SimpleNavLink>
            <SimpleNavLink href="/login">Login/sign</SimpleNavLink>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full text-white text-sm font-medium">
              EN/FR
            </Button>
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <SimpleNavLink href="/">Home</SimpleNavLink>
              <SimpleNavLink href="/train">Train</SimpleNavLink>
              <SimpleNavLink href="/rmk6">RMK6</SimpleNavLink>
              <SimpleNavLink href="/resources">Resources</SimpleNavLink>
              <SimpleNavLink href="/login">Login/sign</SimpleNavLink>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white mt-1">
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
    <Link href={href} className="text-white hover:text-blue-200 font-medium">
      {children}
    </Link>
  );
};

export default Navbar; 