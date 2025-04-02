import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

const ArticlesPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Sales Insights</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Stay ahead with our expert analysis and practical advice on modern sales techniques and industry trends.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white px-3 py-1 cursor-pointer">
              All
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white px-3 py-1 cursor-pointer">
              Strategy
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white px-3 py-1 cursor-pointer">
              Psychology
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white px-3 py-1 cursor-pointer">
              B2B
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white px-3 py-1 cursor-pointer">
              Process
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white px-3 py-1 cursor-pointer">
              Conversion
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500 filter grayscale"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
              </div>
              
              <CardHeader className="pb-0 pt-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.categories.map((category, i) => (
                    <Badge key={i} variant="outline" className="border-zinc-700 text-gray-300 hover:text-white">
                      {category}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-gray-200">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="py-4">
                <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center border-t border-zinc-800 pt-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-zinc-800 mr-2"></div>
                  <div>
                    <span className="text-sm text-white">{post.author}</span>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-black hover:bg-white p-0 h-auto"
                  onClick={() => window.location.href = `/articles/${post.id}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-md px-6 py-2 mr-4">
            Previous
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-md px-6 py-2">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const posts = [
  {
    id: "psychological-triggers-sales",
    title: "7 Psychological Triggers That Drive High-Value Sales",
    excerpt: "Discover the key psychological principles that influence purchase decisions and learn how to ethically apply them in your sales conversations.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Psychology",
    categories: ["Psychology", "Sales"],
    author: "Michael Carson",
    date: "Feb 12, 2024",
  },
  {
    id: "future-b2b-digital-economy",
    title: "The Future of B2B Sales in a Digital-First Economy",
    excerpt: "Explore how B2B sales is evolving with digital transformation and what strategies top-performing organizations are implementing to stay ahead.",
    image: "https://placehold.co/600x400/111827/6B7280?text=B2B+Digital+Sales",
    categories: ["B2B", "Strategy"],
    author: "Sarah Chen",
    date: "Jan 28, 2024",
  },
  {
    id: "sales-process-converts",
    title: "Building a Sales Process That Converts: A Step-by-Step Guide",
    excerpt: "Follow this comprehensive framework to design a sales process that consistently guides prospects from awareness to closing with higher conversion rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Process",
    categories: ["Process", "Conversion"],
    author: "David Miller",
    date: "Jan 15, 2024",
  },
  {
    id: "cold-outreach-techniques",
    title: "Cold Outreach Techniques That Actually Work in 2024",
    excerpt: "Cut through the noise with these proven cold outreach strategies that respect prospects' time while dramatically improving your response rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Cold+Outreach",
    categories: ["Strategy", "Outreach"],
    author: "Emma Johnson",
    date: "Jan 5, 2024",
  },
  {
    id: "building-sales-team",
    title: "Building and Scaling a High-Performance Sales Team",
    excerpt: "Learn the key principles for recruiting, training and developing a sales team that consistently exceeds targets and builds a positive sales culture.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Team",
    categories: ["Management", "Teams"],
    author: "Robert Zhang",
    date: "Dec 20, 2023",
  },
  {
    id: "sales-automation-tools",
    title: "Top Sales Automation Tools Every Sales Leader Needs",
    excerpt: "Discover the most effective tools for automating your sales pipeline, from prospecting to closing, to save time and improve conversion rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Tools",
    categories: ["Technology", "Automation"],
    author: "Alicia Gomez",
    date: "Dec 12, 2023",
  }
];

export default ArticlesPage; 