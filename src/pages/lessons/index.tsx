import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';

const LessonsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6;
  
  // Calculate pagination values
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);
  const totalPages = Math.ceil(lessons.length / lessonsPerPage);
  
  // Handle page changes
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  
  // Generate page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Master Your Sales Skills</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Comprehensive courses designed to elevate your sales performance through proven techniques and strategies.
          </p>
        </div>
        
        <Separator className="bg-white/10 mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentLessons.map((lesson, index) => (
            <Card key={index} className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden group h-full">
              <div className="h-48 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500 filter grayscale"
                  style={{ backgroundImage: `url(${lesson.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">
                    {lesson.level}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold text-white group-hover:text-gray-200">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="py-4">
                <p className="text-gray-400">{lesson.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center border-t border-zinc-800 pt-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">{lesson.duration}</span>
                  <Separator orientation="vertical" className="mx-2 h-4 bg-zinc-700" />
                  <span className="text-sm text-gray-400">{lesson.modules} modules</span>
                </div>
                <Link href={`/lessons/${lesson.id}`}>
                  <Button 
                    variant="outline" 
                    className="text-white border-zinc-700 hover:bg-white hover:text-black"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {pageNumbers.map(number => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  className={currentPage === number 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "border-white text-white hover:bg-white hover:text-black"
                  }
                  onClick={() => goToPage(number)}
                >
                  {number}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const lessons = [
  {
    id: "fundamentals-consultative-selling",
    title: "Fundamentals of Consultative Selling",
    description: "Learn the core principles of consultative selling and how to build meaningful client relationships based on trust.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Consultative+Selling",
    level: "Beginner",
    duration: "4 hours",
    modules: 5
  },
  {
    id: "advanced-negotiation-tactics",
    title: "Advanced Negotiation Tactics",
    description: "Master high-stakes negotiation with advanced psychological techniques and strategic frameworks.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Negotiation+Tactics",
    level: "Advanced",
    duration: "6 hours",
    modules: 8
  },
  {
    id: "objection-handling-mastery",
    title: "Objection Handling Mastery",
    description: "Turn rejections into opportunities with proven methods to address and overcome customer objections.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Objection+Handling",
    level: "Intermediate",
    duration: "3 hours",
    modules: 4
  },
  {
    id: "sales-closing-techniques",
    title: "Sales Closing Techniques",
    description: "Learn powerful closing techniques that feel natural and lead to higher conversion rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Closing+Techniques",
    level: "Intermediate",
    duration: "5 hours",
    modules: 6
  },
  {
    id: "digital-sales-strategies",
    title: "Digital Sales Strategies",
    description: "Adapt your sales approach for the digital age with effective online communication tactics.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Digital+Sales",
    level: "Advanced",
    duration: "8 hours",
    modules: 10
  },
  {
    id: "enterprise-sales-mastery",
    title: "Enterprise Sales Mastery",
    description: "Scale your approach to target and close major enterprise deals with complex buying committees.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Enterprise+Sales",
    level: "Advanced",
    duration: "10 hours",
    modules: 12
  },
  {
    id: "sales-pipeline-management",
    title: "Sales Pipeline Management",
    description: "Optimize your sales pipeline with proven strategies to ensure a consistent flow of qualified opportunities.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Pipeline+Management",
    level: "Intermediate",
    duration: "4 hours",
    modules: 5
  },
  {
    id: "sales-psychology-mastery",
    title: "Sales Psychology Mastery",
    description: "Understand and apply psychological principles to influence buying decisions and improve sales results.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Psychology",
    level: "Advanced",
    duration: "7 hours",
    modules: 8
  },
  {
    id: "value-based-selling",
    title: "Value-Based Selling",
    description: "Move beyond price discussions by focusing on the unique value your solutions provide to customers.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Value+Selling",
    level: "Intermediate",
    duration: "5 hours",
    modules: 6
  }
];

export default LessonsPage; 