import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getCourses, getCourseCategories } from '@/services/api';

// Define types
interface Course {
  _id: string;
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  modules: number;
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
  data: Course[];
}

const LessonsPage = ({ initialData, categories }: { 
  initialData: ApiResponse, 
  categories: { _id: string; name: string; slug: string }[]
}) => {
  const { t, i18n } = useTranslation('common');
  
  // Hardcoded levels instead of from API
  const levels = ["Beginner", "Intermediate", "Advanced"];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeLevel, setActiveLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(initialData.data);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  
  // Fetch courses when filters or pagination change
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        console.log("Fetching with params:", { 
          category: activeCategory, 
          level: activeLevel,
          search: debouncedSearchTerm
        });
        
        const params: any = {
          page: currentPage,
          limit: 6
        };
        
        if (activeCategory) params.category = activeCategory;
        if (activeLevel) params.level = activeLevel;
        if (debouncedSearchTerm) params.search = debouncedSearchTerm;
        
        // Add audience parameter based on current language
        const currentLang = i18n.language;
        params.audience = currentLang === 'fr' ? 'french' : 'english';
        
        const response = await getCourses(params);
        console.log("API Response:", response);
        setCourses(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [currentPage, activeCategory, activeLevel, debouncedSearchTerm, i18n.language]);
  
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
  
  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    console.log("Setting category to:", category);
    setActiveCategory(category === activeCategory ? '' : category);
    setCurrentPage(1); // Reset to first page when changing categories
  };
  
  const handleLevelChange = (level: string) => {
    console.log("Setting level to:", level);
    // Use the exact level string as it appears in the hardcoded levels
    setActiveLevel(level === activeLevel ? '' : level);
    setCurrentPage(1); // Reset to first page when changing level
  };
  
  // Generate page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('lessons.title')}</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            {t('lessons.subtitle')}
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          className="mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text"
              placeholder={t('lessons.searchPlaceholder') || "Search courses..."}
              className="pl-10 bg-zinc-900 border-zinc-700 text-white rounded-lg focus-visible:ring-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </motion.div>
        
        {/* Filters section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3">{t('lessons.filterByCategory')}</h3>
            <div className="flex flex-wrap gap-2">
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
                  All Categories
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
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-3">{t('lessons.filterByLevel')}</h3>
            <div className="flex flex-wrap gap-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="outline" 
                  className={`border-zinc-700 ${activeLevel === '' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'} px-3 py-1 cursor-pointer`}
                  onClick={() => {
                    console.log("Clearing level filter");
                    handleLevelChange('');
                  }}
                >
                  All Levels
                </Badge>
              </motion.div>
              {levels.map((level, index) => (
                <motion.div
                  key={level}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="outline" 
                    className={`border-zinc-700 ${activeLevel === level ? 'bg-white text-black' : 'text-gray-300 hover:text-white'} px-3 py-1 cursor-pointer`}
                    onClick={() => handleLevelChange(level)}
                  >
                    {level}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Lessons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-white text-xl">Loading...</div>
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-white text-xl">No courses found</div>
              <Button 
                variant="outline" 
                className="mt-4 border-white text-white hover:bg-white hover:text-black cursor-pointer"
                onClick={() => {
                  setActiveCategory('');
                  setActiveLevel('');
                  setSearchTerm('');
                }}
              >
                {t('common.clearFilters')}
              </Button>
            </div>
          ) : (
            courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index % 3), duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden h-full flex flex-col group">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${course.image || '/images/placeholder.jpg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white text-black font-medium">
                        {course.level || "Beginner"}
                      </Badge>
                    </div>
                  </div>
                
                  <Link href={`/lessons/${course.id}`} className="block flex-grow flex flex-col">
                    <CardHeader className="pb-0">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-gray-200 line-clamp-2">
                        {course.title || "Untitled Course"}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="py-4 flex-grow">
                      <p className="text-gray-400 line-clamp-3">{course.description || "No description available"}</p>
                    </CardContent>
                  </Link>
                  
                  <CardFooter className="flex justify-between items-center border-t border-zinc-800 pt-4 mt-auto">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">{course.duration || "Self-paced"}</span>
                      <Separator orientation="vertical" className="mx-2 h-4 bg-zinc-700" />
                      <span className="text-sm text-gray-400">{course.modules || 0} modules</span>
                    </div>
                    <Link href={`/lessons/${course.id}`}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="outline" 
                          className="text-white border-zinc-700 hover:bg-white hover:text-black cursor-pointer"
                        >
                          {t('lessons.viewDetails')}
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
        {!loading && courses.length > 0 && (
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
    const coursesResponse = await getCourses({ 
      page: 1, 
      limit: 6,
      audience: locale === 'fr' ? 'french' : 'english'
    });
    const categoriesResponse = await getCourseCategories();
    
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        initialData: coursesResponse,
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

export default LessonsPage; 