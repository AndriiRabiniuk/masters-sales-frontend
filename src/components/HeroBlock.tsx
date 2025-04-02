import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const HeroBlock = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-2 tracking-widest uppercase">Your Website Blocks</p>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  Blocks Built With <br/> Shadcn & Tailwind
                </h1>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Finely crafted components built with React, Tailwind and Shadcn UI. 
                Developers can copy and paste these blocks directly into their projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium">
                  Discover all components
                </Button>
                <Button variant="outline" size="lg" className="border-blue-300 text-blue-800 rounded-full hover:bg-blue-50">
                  View on GitHub
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a.9959.9959 0 0 1 0-1.42c.39-.39 1.03-.39 1.42 0zm2.83-2.83c.39.39.39 1.03 0 1.42-.39.39-1.03.39-1.42 0-.39-.39-.39-1.03 0-1.42.39-.39 1.03-.39 1.42 0zm-2.83-2.83c.39.39.39 1.03 0 1.42-.39.39-1.03.39-1.42 0-.39-.39-.39-1.03 0-1.42.39-.39 1.03-.39 1.42 0zm5.66 5.66c.39.39.39 1.03 0 1.42-.39.39-1.03.39-1.42 0a.9959.9959 0 0 1 0-1.42c.39-.39 1.03-.39 1.42 0z"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-blue-200 rounded-lg transform rotate-3"></div>
              <div className="absolute -top-2 -left-2 w-full h-full bg-blue-100 rounded-lg transform rotate-1"></div>
              <Card className="relative bg-white overflow-hidden rounded-lg shadow-xl">
                <Image 
                  src="/hero-banner.jpg" 
                  alt="Sales Training Banner"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-t-lg object-cover"
                />
                <CardContent className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <h2 className="text-2xl font-bold mb-2">KEEP YOUR SALES HIGH</h2>
                  <p className="text-blue-100">Keep learning, keep producing better results</p>
                </CardContent>
              </Card>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold py-2 px-4 rounded-full transform rotate-3 shadow-lg">
                HERO1
              </div>
            </div>
          </div>
        </div>
    
      </div>
    </section>
  );
};

export default HeroBlock; 