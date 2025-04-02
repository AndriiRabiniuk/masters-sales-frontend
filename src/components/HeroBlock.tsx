import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HeroBlock = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: 'url(https://placehold.co/1920x1080/111827/6B7280?text=Hero+Background)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-1"></div>

      <div className="container mx-auto px-6 py-20 md:py-32 relative z-2 flex flex-col items-center min-h-screen">
        <div className="max-w-4xl text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="inline-block">Master the Art of <span className="inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Professional Sales</span></span>

          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your approach, perfect your technique, and elevate your sales performance with our comprehensive training programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              className="bg-white text-black hover:bg-gray-200 rounded-md px-8 py-6 text-lg font-medium"
            >
              Start Training
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black rounded-md px-8 py-6 text-lg font-medium"
            >
              Learn More
            </Button>
          </div>
        </div>

        <Tabs defaultValue="features" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-sm border border-white/10">
            <TabsTrigger value="features" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">Features</TabsTrigger>
            <TabsTrigger value="statistics" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">Statistics</TabsTrigger>
            <TabsTrigger value="testimonials" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/30 backdrop-blur-sm border border-white/10">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <Badge variant="outline" className="text-white border-white/20 mb-2">{feature.category}</Badge>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="mt-6">
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-wrap justify-center gap-10 py-6">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">24k+</span>
                    <span className="text-gray-400 mt-1">Sales Professionals</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">95%</span>
                    <span className="text-gray-400 mt-1">Success Rate</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">100+</span>
                    <span className="text-gray-400 mt-1">Training Modules</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardContent className="pt-6">
                <blockquote className="italic text-xl text-center px-10 py-6">
                  "This sales training program completely transformed how I approach client relationships. My conversion rate has increased by 40% in just three months."
                  <footer className="text-sm text-gray-400 mt-4 not-italic">
                    — Jennifer Thompson, Sales Director
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Curved shape at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-24 text-white"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100.42C57.51,65.11,185.23,31.18,321.39,56.44Z" />
        </svg>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Expert-Led Training",
    description: "Learn from industry professionals with proven track records in sales excellence.",
    category: "Education"
  },
  {
    title: "Interactive Exercises",
    description: "Apply what you learn through real-world scenarios and immediate feedback.",
    category: "Practice"
  },
  {
    title: "Performance Analytics",
    description: "Track your progress with detailed metrics and personalized insights.",
    category: "Analytics"
  }
];

export default HeroBlock; 