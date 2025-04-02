import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-blue-400">
                <Image 
                  src="/logo.jpg"
                  alt="Masters Logo"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="flex flex-col ml-2">
              <span className="text-blue-300 font-bold text-xl tracking-tight">MASTER SALES TRAINING</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active>Home</NavLink>
            <NavLink href="/train">Train</NavLink>
            <NavLink href="/rmk6">RMK6</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <div className="h-6 border-r border-blue-500 mx-2"></div>
            <NavLink href="/login">Login/sign</NavLink>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white ml-4 rounded-full">
              EN/FR
            </Button>
          </nav>
          
          <button className="md:hidden text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <Link 
      href={href}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        active 
          ? 'bg-blue-700 text-white' 
          : 'text-blue-100 hover:bg-blue-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar; 