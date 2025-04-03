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
import Link from 'next/link';
import { getBlogById } from '@/services/api';

// Define types
interface ContentSection {
  heading?: string;
  paragraphs: string[];
}

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
}

interface Blog {
  _id: string;
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  categories: BlogCategory[];
  content: ContentSection[];
}

interface BlogResponse {
  status: string;
  data: Blog;
}

// Define the type for a related article
type RelatedArticle = {
  id: string;
  title: string;
  date: string;
};

const ArticleDetailPage = ({ blog, relatedArticles }: { 
  blog: Blog | null,
  relatedArticles: RelatedArticle[] 
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Handle case when blog is not found or page is still loading
  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">
            {router.isFallback ? t('articles.loading') : t('articles.notFound')}
          </h1>
          <Button variant="outline" className="border-white text-white cursor-pointer" onClick={() => router.push('/articles')}>
            {t('articles.backToAllArticles')}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${blog.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
        <div className="container mx-auto px-6 py-16 relative h-full flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2 mb-4">
              {blog.categories.map((category) => (
                <Link href={`/articles?category=${category.slug}`} key={category._id}>
                  <Badge className="bg-white text-black px-2 py-1 cursor-pointer">
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {blog.excerpt}
            </p>
            <div className="flex items-center mt-6">
              <div className="h-10 w-10 rounded-full bg-zinc-800 mr-3"></div>
              <div>
                <div className="text-white font-medium">{blog.author}</div>
                <div className="text-gray-400 text-sm">{blog.date}</div>
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
              className="prose prose-lg prose-invert max-w-none"
            >
              {blog.content.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  {section.heading && (
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((paragraph, paraIndex) => (
                    <p key={paraIndex} className="text-gray-300 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </motion.div>
            
            <Separator className="my-12 bg-white/10" />
            
            {/* Share buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-white font-medium mb-4 sm:mb-0">{t('articles.shareThisArticle')}</div>
              <div className="flex space-x-3">
                {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="sm" className="border-zinc-700 text-white hover:bg-white hover:text-black cursor-pointer">
                      {platform}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">{t('articles.relatedArticles')}</h3>
                <div className="space-y-4">
                  {relatedArticles.map((article, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Card className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <CardContent className="p-4">
                          <Link href={`/articles/${article.id}`}>
                            <h4 className="text-white font-medium hover:text-gray-300 cursor-pointer">{article.title}</h4>
                          </Link>
                          <p className="text-gray-500 text-sm mt-1">{article.date}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12"
              >
                <Card className="bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{t('articles.subscribeToNewsletter')}</h3>
                    <p className="text-gray-400 mb-4">{t('articles.newsletterDescription')}</p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder={t('articles.yourEmail')}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer">
                          {t('articles.subscribe')}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Articles */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black cursor-pointer"
            onClick={() => router.push('/articles')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('articles.backToAllArticles')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// This is temporary until we have an API for related articles
const relatedArticles: RelatedArticle[] = [
  {
    id: "future-b2b-digital-economy",
    title: "The Future of B2B Sales in a Digital-First Economy",
    date: "Jan 28, 2024"
  },
  {
    id: "sales-process-converts",
    title: "Building a Sales Process That Converts: A Step-by-Step Guide",
    date: "Jan 15, 2024"
  }
];

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const id = params?.id as string;
    const response = await getBlogById(id);
    
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        blog: response.data,
        relatedArticles
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        blog: null,
        relatedArticles: []
      },
    };
  }
};

export default ArticleDetailPage;