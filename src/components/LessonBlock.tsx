import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const LessonBlock = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-bold text-2xl mb-8 pb-2 border-b-2 border-blue-200">Latest Lesson Block</h2>
        
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-8 md:p-10">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-blue-600 mr-3"></div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
                  Building Modern UIs: A Deep Dive into Shadcn and React
                </CardTitle>
              </div>
              
              <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. 
                Learn best practices and advanced techniques that will transform your development workflow.
              </CardDescription>
              
              <div className="flex items-center text-sm text-gray-500 mb-8 space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">Sarah Chen</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">15 Feb 2024</span>
                </div>
              </div>
              
              <Button variant="ghost" className="group text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium">
                Read more
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
            
            <div className="w-full md:w-1/3 relative">
              <Image 
                src="/lesson-image.jpg" 
                alt="Modern UI Development"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-white text-blue-800 font-bold py-1 px-3 rounded-full text-sm shadow-md">
                UI/UX
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LessonBlock; 