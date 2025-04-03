import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getBlogs, getBlogCategories } from '@/services/api';

// Define types
interface Blog {
  _id: string;
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
}

interface ApiResponse {
  status: string;
  results: number;
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
  data: Blog[];
}

const ArticlesPage = ({ initialData, categories }: { 
  initialData: ApiResponse, 
  categories: { _id: string; name: string; slug: string }[]
}) => {
  const { t } = useTranslation('common');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState(initialData.data);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [loading, setLoading] = useState(false);
  
  // Fetch blogs when filters or pagination change
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params: any = {
          page: currentPage,
          limit: 6
        };
        
        if (activeCategory) params.category = activeCategory;
        if (searchTerm) params.search = searchTerm;
        
        const response = await getBlogs(params);
        setBlogs(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [currentPage, activeCategory, searchTerm]);
  
  // Handle page changes
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < pagination.pages) {
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
    setActiveCategory(category === activeCategory ? '' : category);
    setCurrentPage(1); // Reset to first page when changing categories
  };
  
  // Generate page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('articles.title')}</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            {t('articles.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                variant="outline" 
                className={`border-zinc-700 ${activeCategory === '' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'} px-3 py-1 cursor-pointer`}
                onClick={() => handleCategoryChange('')}
              >
                All
              </Badge>
            </motion.div>
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="outline" 
                  className={`border-zinc-700 ${activeCategory === category.slug ? 'bg-white text-black' : 'text-gray-300 hover:text-white'} px-3 py-1 cursor-pointer`}
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {category.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-white text-xl">Loading...</div>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div 
              className="col-span-3 text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 text-lg">{t('articles.noResults')}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="mt-4 border-white text-white hover:bg-white hover:text-black cursor-pointer"
                  onClick={() => handleCategoryChange('')}
                >
                  {t('articles.viewAllArticles')}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index % 3), duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden group cursor-pointer h-full">
                  <Link href={`/articles/${blog.id}`} className="h-48 overflow-hidden relative block">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500 filter grayscale"
                      style={{ backgroundImage: `url(${blog.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
                  </Link>
                  
                  <CardHeader>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {blog.categories.map((category) => (
                        <Badge 
                          key={category._id} 
                          variant="outline" 
                          className="border-zinc-700 text-gray-300 hover:text-white cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCategoryChange(category.slug);
                          }}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/articles/${blog.id}`}>
                      <h3 className="text-xl font-bold text-white group-hover:text-gray-200 hover:underline cursor-pointer">
                        {blog.title}
                      </h3>
                    </Link>
                  </CardHeader>
                  
                  <CardContent className="py-4">
                    <p className="text-gray-400 line-clamp-3">{blog.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-zinc-800 mr-2"></div>
                      <div>
                        <span className="text-sm text-white">{blog.author}</span>
                        <p className="text-xs text-gray-500">{blog.date}</p>
                      </div>
                    </div>
                    <Link href={`/articles/${blog.id}`}>
                      <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" className="text-white hover:text-black hover:bg-white p-0 h-auto cursor-pointer">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </motion.div>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        
        {/* Pagination Controls */}
        {!loading && blogs.length > 0 && (
          <motion.div 
            className="flex justify-center gap-2 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button 
              variant="outline"
              size="sm"
              className="border-zinc-700 text-white hover:bg-white hover:text-black cursor-pointer"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {t('common.previous')}
            </Button>
            
            {pageNumbers.map(number => (
              <Button
                key={number}
                variant={currentPage === number ? "default" : "outline"}
                size="sm"
                className={`cursor-pointer ${
                  currentPage === number 
                    ? "bg-white text-black" 
                    : "border-zinc-700 text-white hover:bg-white hover:text-black"
                }`}
                onClick={() => goToPage(number)}
              >
                {number}
              </Button>
            ))}
            
            <Button 
              variant="outline"
              size="sm"
              className="border-zinc-700 text-white hover:bg-white hover:text-black cursor-pointer"
              onClick={handleNextPage}
              disabled={currentPage === pagination.pages}
            >
              {t('common.next')}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  try {
    // Fetch initial data
    const blogsResponse = await getBlogs({ page: 1, limit: 6 });
    const categoriesResponse = await getBlogCategories();
    
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        initialData: blogsResponse,
        categories: categoriesResponse.data
      },
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        initialData: { status: "success", results: 0, pagination: { total: 0, page: 1, pages: 1, limit: 6 }, data: [] },
        categories: []
      },
    };
  }
};

export default ArticlesPage; 