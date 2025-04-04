import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { getCourses } from '@/services/api';

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

const LessonBlock = () => {
  const { t, i18n } = useTranslation('common');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Fetch featured courses (first 5)
        const currentLang = i18n.language;
        const response = await getCourses({ 
          limit: 5,
          audience: currentLang === 'fr' ? 'french' : 'english'
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [i18n.language]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-black text-white py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h2 
              className="text-4xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('lessonBlock.title')}
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-xl mt-4 max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('lessons.subtitle')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/lessons">
              <Button variant="outline" className="mt-4 md:mt-0 border-white text-white hover:bg-white hover:text-black cursor-pointer">
                {t('lessonBlock.viewAll')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <Separator className="bg-white/10 mb-12" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="text-white text-xl">Loading courses...</div>
            </div>
          ) : (
            <ScrollArea className="w-full" type="always">
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {courses.map((course, index) => (
                    <CarouselItem key={course._id || index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="h-full"
                      >
                        <Card className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden h-full flex flex-col group">
                          <div className="aspect-[16/9] relative overflow-hidden">
                            <div 
                              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url(${course.image || '/images/placeholder.jpg'})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">
                                {course.level || "Beginner"}
                              </Badge>
                            </div>
                          </div>
                          
                          <Link href={`/lessons/${course.id}`} className="flex-grow flex flex-col">
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
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link href={`/lessons/${course.id}`}>
                                <Button variant="outline" className="text-white border-zinc-700 hover:bg-white hover:text-black cursor-pointer">
                                  {t('lessons.viewDetails')}
                                </Button>
                              </Link>
                            </motion.div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-8">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/10 text-white hover:bg-white hover:text-black mr-2 cursor-pointer" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CarouselNext className="relative inset-0 translate-y-0 bg-white/10 text-white hover:bg-white hover:text-black cursor-pointer" />
                  </motion.div>
                </div>
              </Carousel>
            </ScrollArea>
          )}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/lessons">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 cursor-pointer" size="lg">
                {t('lessonBlock.viewAll')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonBlock; 