import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

const ArticlesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const articlesPerPage = 6;
  
  // Filter articles by category if needed
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.categories.includes(activeCategory));
  
  // Calculate pagination values
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredPosts.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredPosts.length / articlesPerPage);
  
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
  
  // Handle category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing categories
  };
  
  // Get all unique categories
  const allCategories = ['All', ...Array.from(new Set(posts.flatMap(post => post.categories)))];
  
  // Generate page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
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
            {allCategories.map((category, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={`border-zinc-700 ${activeCategory === category ? 'bg-white text-black' : 'text-gray-300 hover:text-white'} px-3 py-1 cursor-pointer`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((post, index) => (
            <Card key={index} className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden group cursor-pointer">
              <Link href={`/articles/${post.id}`} className="h-48 overflow-hidden relative block">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500 filter grayscale"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
              </Link>
              
              <CardHeader className="pb-0 pt-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.categories.map((category, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="border-zinc-700 text-gray-300 hover:text-white cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryChange(category);
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <Link href={`/articles/${post.id}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-gray-200 hover:underline cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
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
                <Link href={`/articles/${post.id}`}>
                  <Button variant="ghost" className="text-white hover:text-black hover:bg-white p-0 h-auto cursor-pointer">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* No results message */}
        {currentArticles.length === 0 && (
          <div className="text-center my-12">
            <p className="text-gray-400 text-lg">No articles found for this category.</p>
            <Button 
              variant="outline" 
              className="mt-4 border-white text-white hover:bg-white hover:text-black cursor-pointer"
              onClick={() => handleCategoryChange('All')}
            >
              View All Articles
            </Button>
          </div>
        )}
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black cursor-pointer"
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
                  className={`cursor-pointer ${currentPage === number 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "border-white text-white hover:bg-white hover:text-black"
                  }`}
                  onClick={() => goToPage(number)}
                >
                  {number}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black cursor-pointer"
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
  },
  {
    id: "social-selling-linkedin",
    title: "Mastering Social Selling on LinkedIn",
    excerpt: "Learn effective strategies to leverage LinkedIn for prospecting, relationship building, and closing deals in the digital age.",
    image: "https://placehold.co/600x400/111827/6B7280?text=LinkedIn+Sales",
    categories: ["Social", "Digital", "Strategy"],
    author: "Jennifer Wu",
    date: "Dec 5, 2023",
  },
  {
    id: "sales-presentations-impact",
    title: "Creating Sales Presentations That Drive Decision-Making",
    excerpt: "Design and deliver compelling presentations that address customer pain points and motivate buying decisions.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Presentations",
    categories: ["Presentations", "Communication"],
    author: "Marcus Johnson",
    date: "Nov 22, 2023",
  },
  {
    id: "enterprise-deal-structures",
    title: "Structuring Complex Enterprise Deals for Success",
    excerpt: "Navigate the intricacies of large-scale enterprise deals with strategic approaches to pricing, terms, and implementation planning.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Enterprise+Deals",
    categories: ["Enterprise", "B2B", "Negotiation"],
    author: "Rebecca Chen",
    date: "Nov 10, 2023",
  }
];

export default ArticlesPage; 