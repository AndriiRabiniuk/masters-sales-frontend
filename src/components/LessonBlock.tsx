import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const LessonBlock = () => {
  return (
    <div className="bg-black text-white py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold">Master Your Sales Skills</h2>
            <p className="text-gray-400 text-xl mt-4 max-w-2xl">
              Carefully crafted lessons to elevate your sales performance through proven techniques and strategies.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-white text-white hover:bg-white hover:text-black">
            View All Courses
          </Button>
        </div>
        
        <Separator className="bg-white/10 mb-12" />
        
        <ScrollArea className="w-full" type="always">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {lessons.map((lesson, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden group h-full">
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
                      <Button variant="outline" className="text-white border-zinc-700 hover:bg-white hover:text-black">
                        Start
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/10 text-white hover:bg-white hover:text-black mr-2" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-white/10 text-white hover:bg-white hover:text-black" />
            </div>
          </Carousel>
        </ScrollArea>
        
        <div className="mt-16 text-center">
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6" size="lg">
            View All Lessons
          </Button>
        </div>
      </div>
    </div>
  );
};

const lessons = [
  {
    title: "Fundamentals of Consultative Selling",
    description: "Learn the core principles of consultative selling and how to build meaningful client relationships based on trust.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Consultative+Selling",
    level: "Beginner",
    duration: "4 hours",
    modules: 5
  },
  {
    title: "Advanced Negotiation Tactics",
    description: "Master high-stakes negotiation with advanced psychological techniques and strategic frameworks.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Negotiation+Tactics",
    level: "Advanced",
    duration: "6 hours",
    modules: 8
  },
  {
    title: "Objection Handling Mastery",
    description: "Turn rejections into opportunities with proven methods to address and overcome customer objections.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Objection+Handling",
    level: "Intermediate",
    duration: "3 hours",
    modules: 4
  },
  {
    title: "Sales Closing Techniques",
    description: "Learn powerful closing techniques that feel natural and lead to higher conversion rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Closing+Techniques",
    level: "Intermediate",
    duration: "5 hours",
    modules: 6
  },
  {
    title: "Digital Sales Strategies",
    description: "Adapt your sales approach for the digital age with effective online communication tactics.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Digital+Sales",
    level: "Advanced",
    duration: "8 hours",
    modules: 10
  }
];

export default LessonBlock; 