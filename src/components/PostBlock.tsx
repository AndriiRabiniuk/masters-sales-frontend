import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const PostBlock = () => {
  return (
    <div className="bg-zinc-950 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
          <div className="h-1 w-20 bg-white mb-6"></div>
          <p className="text-gray-400 max-w-2xl">
            Stay ahead with our expert analysis and practical advice on modern sales techniques and industry trends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div className="flex gap-2 mb-3">
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
                <Button variant="ghost" className="text-white hover:text-black hover:bg-white p-0 h-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-md px-6 py-2">
            View All Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

const posts = [
  {
    title: "7 Psychological Triggers That Drive High-Value Sales",
    excerpt: "Discover the key psychological principles that influence purchase decisions and learn how to ethically apply them in your sales conversations.",
    image: "/post1.jpg",
    categories: ["Psychology", "Sales"],
    author: "Michael Carson",
    date: "Feb 12, 2024",
  },
  {
    title: "The Future of B2B Sales in a Digital-First Economy",
    excerpt: "Explore how B2B sales is evolving with digital transformation and what strategies top-performing organizations are implementing to stay ahead.",
    image: "/post2.jpg",
    categories: ["B2B", "Strategy"],
    author: "Sarah Chen",
    date: "Jan 28, 2024",
  },
  {
    title: "Building a Sales Process That Converts: A Step-by-Step Guide",
    excerpt: "Follow this comprehensive framework to design a sales process that consistently guides prospects from awareness to closing with higher conversion rates.",
    image: "/post3.jpg",
    categories: ["Process", "Conversion"],
    author: "David Miller",
    date: "Jan 15, 2024",
  }
];

export default PostBlock; 