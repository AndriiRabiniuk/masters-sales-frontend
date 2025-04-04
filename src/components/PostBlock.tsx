import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { getBlogs } from '@/services/api';

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
  htmlContent?: string;
}

const PostBlock = () => {
  const { t, i18n } = useTranslation('common');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Fetch latest blogs (first 3)
        const currentLang = i18n.language;
        const response = await getBlogs({ 
          limit: 3,
          audience: currentLang === 'fr' ? 'french' : 'english'
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [i18n.language]);
  
  return (
    <div className="bg-zinc-950 text-white py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t('postBlock.title')}
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-white mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('articles.subtitle')}
          </motion.p>
        </motion.div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="text-white text-xl">Loading articles...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden h-full flex flex-col group">
                  <Link href={`/articles/${blog.id}`} className="block aspect-[16/9] relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${blog.image || '/images/placeholder.jpg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
                  </Link>
                  
                  <CardHeader className="pb-0 pt-6 flex-grow">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {blog.categories && blog.categories.map((category) => (
                        <motion.div 
                          key={category._id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge variant="outline" className="border-zinc-700 text-gray-300 hover:text-white cursor-pointer">
                            {category.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <Link href={`/articles/${blog.id}`}>
                      <motion.h3 
                        className="text-xl font-bold text-white group-hover:text-gray-200 hover:underline cursor-pointer line-clamp-2"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {blog.title || "Untitled Article"}
                      </motion.h3>
                    </Link>
                  </CardHeader>
                  
                  <CardContent className="py-4 flex-grow">
                    <p className="text-gray-400 line-clamp-3">{blog.excerpt || "No description available"}</p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center border-t border-zinc-800 pt-4 mt-auto">
                    <div className="flex items-center">
                      <motion.div 
                        className="h-8 w-8 rounded-full bg-zinc-800 mr-2 flex-shrink-0 overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                      ></motion.div>
                      <div>
                        <span className="text-sm text-white">{blog.author || "Anonymous"}</span>
                        <p className="text-xs text-gray-500">{blog.date || "No date"}</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ x: 5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link href={`/articles/${blog.id}`}>
                        <Button variant="ghost" className="text-white hover:text-black hover:bg-white p-0 h-auto cursor-pointer">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/articles">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-md px-6 py-2 cursor-pointer">
                {t('postBlock.viewAll')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostBlock; 