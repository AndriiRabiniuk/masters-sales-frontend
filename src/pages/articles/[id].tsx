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
  htmlContent?: string;
}

interface BlogResponse {
  status: string;
  data: Blog;
}

const ArticleDetailPage = ({ blog }: { blog: Blog | null }) => {
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
        <div className="grid grid-cols-1 gap-12">
          {/* Main Content */}
          <div className="w-full max-w-4xl mx-auto">
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
              
              {/* Display HTML content if available */}
              {blog.htmlContent && (
                <div className="mt-8" dangerouslySetInnerHTML={{ __html: blog.htmlContent }}></div>
              )}
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

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const id = params?.id as string;
    const response = await getBlogById(id, {
      audience: locale === 'fr' ? 'french' : 'english'
    });
    
    // Add mock HTML content for demonstration
    const blogData = response.data;
    if (blogData && !blogData.htmlContent) {
      blogData.htmlContent = `
        <div class="rich-html-content">
          <h3 class="text-2xl font-bold text-white mt-8 mb-4">HTML Content Section</h3>
          <p class="text-gray-300 mb-4">This is rich HTML content that comes directly from the backend. It can include <strong>formatting</strong>, <em>styling</em>, and more.</p>
          <div class="bg-zinc-800 p-4 rounded-md my-4">
            <p class="text-gray-300">This is a custom styled box with important information.</p>
            <ul class="list-disc pl-5 mt-2">
              <li class="text-gray-300">Point one about the article</li>
              <li class="text-gray-300">Another important point</li>
              <li class="text-gray-300">Final key takeaway</li>
            </ul>
          </div>
          <p class="text-gray-300 mb-4">You can replace this with actual HTML content from your backend later.</p>
        </div>
      `;
    }
    
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        blog: blogData
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        blog: null
      },
    };
  }
};

export default ArticleDetailPage;