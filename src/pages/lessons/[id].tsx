import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getCourseById } from '@/services/api';

// Define types
interface Module {
  title: string;
  duration: string;
}

interface Course {
  _id: string;
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  level: string;
  duration: string;
  modules: number;
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
  learningOutcomes: string[];
  moduleDetails: Module[];
}

interface CourseResponse {
  status: string;
  data: Course;
}

const LessonDetailPage = ({ course }: { course: Course | null }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Handle case when course is not found or page is still loading
  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">
            {router.isFallback ? t('lessons.loading') : t('lessons.notFound')}
          </h1>
          <Button variant="outline" className="border-white text-white cursor-pointer" onClick={() => router.push('/lessons')}>
            {t('lessons.backToAllLessons')}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
        <div className="container mx-auto px-6 py-16 relative h-full flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2 mb-4">
              {course.categories.map((category) => (
                <Badge key={category._id} className="bg-white text-black px-2 py-1">
                  {category.name}
                </Badge>
              ))}
              <Badge variant="outline" className="border-white/20 text-white px-2 py-1">
                {course.level}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {course.description}
            </p>
            <div className="flex items-center mt-6 space-x-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white">{course.duration}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="text-white">{course.modules} modules</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">{t('lessons.overview')}</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300">
                  {course.longDescription}
                </p>
              </div>
              
              <Separator className="my-12 bg-white/10" />
              
              <h2 className="text-3xl font-bold text-white mb-6">{t('lessons.whatYouWillLearn')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {course.learningOutcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="mr-4 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-gray-300">{outcome}</p>
                  </motion.div>
                ))}
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6">{t('lessons.courseContent')}</h2>
              <div className="space-y-4 mb-12">
                {course.moduleDetails.map((module, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    <Card className="bg-zinc-900 border border-zinc-800">
                      <CardContent className="flex justify-between items-center p-6">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold mr-4">
                            {index + 1}
                          </div>
                          <h3 className="font-medium text-white">{module.title}</h3>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {module.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">{t('lessons.enrollNow')}</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{t('lessons.fullLifetimeAccess')}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{course.modules} {t('lessons.detailedModules')}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{t('lessons.certificateOfCompletion')}</span>
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-white text-black hover:bg-gray-200 mb-4 cursor-pointer">
                      {t('lessons.enrollNow')}
                    </Button>
                  </motion.div>
                  
                  <div className="text-center text-sm text-gray-500">
                    {t('lessons.moneyBackGuarantee')}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Back to Lessons */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black cursor-pointer"
            onClick={() => router.push('/lessons')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('lessons.backToAllLessons')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const id = params?.id as string;
    const courseResponse = await getCourseById(id, {
      audience: locale === 'fr' ? 'french' : 'english'
    });
    
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        course: courseResponse.data
      },
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        course: null
      },
    };
  }
};

export default LessonDetailPage; 