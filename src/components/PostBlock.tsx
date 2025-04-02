import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const PostBlock = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        <h2 className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-2xl mb-8 pb-2 border-b-2 border-indigo-200">Latest Post Block</h2>
        
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-8 md:p-10">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                Building Modern UIs: A Deep Dive into Shadcn and React Components
              </CardTitle>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold">
                    SC
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-indigo-600 flex items-center justify-center text-white font-bold">
                    MJ
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700 mr-2">Sarah Chen</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 ml-2">15 Feb 2024</span>
                </div>
              </div>
              
              <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. 
                Learn best practices and advanced techniques that will transform your development workflow.
                <span className="block mt-4 text-gray-500">
                  Topics covered: component design, state management, UI patterns, and accessibility.
                </span>
              </CardDescription>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge>React</Badge>
                <Badge>Shadcn</Badge>
                <Badge>UI Design</Badge>
                <Badge>Components</Badge>
              </div>
              
              <Button variant="ghost" className="group text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium">
                Read more
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
            
            <div className="w-full md:w-1/3 relative">
              <Image 
                src="/post-image.jpg" 
                alt="Modern UI Development"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
              <div className="absolute bottom-4 right-4">
                <div className="flex space-x-2">
                  <div className="bg-white rounded-full p-2 shadow-md">
                    <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.975 14.51a.5.5 0 0 1 0-.7l2.845-2.845-2.845-2.845a.5.5 0 0 1 .707-.707l3.195 3.195a.5.5 0 0 1 0 .707l-3.195 3.195a.5.5 0 0 1-.707 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-full p-2 shadow-md">
                    <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
    {children}
  </span>
);

export default PostBlock; 