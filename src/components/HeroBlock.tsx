import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const HeroBlock = () => {
  const { t } = useTranslation('common');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background image with overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-60"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: 'url(https://placehold.co/1920x1080/111827/6B7280?text=Hero+Background)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-1"></div>

      <div className="container mx-auto px-6 py-20 md:py-32 relative z-2 flex flex-col items-center min-h-screen">
        <motion.div 
          className="max-w-4xl text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            <span className="inline-block">{t('heroBlock.title')} <span className="inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{t('heroBlock.subtitle')}</span></span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform your approach, perfect your technique, and elevate your sales performance with our comprehensive training programs.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                size="lg"
                variant="default"
                className="bg-white text-black hover:bg-gray-200 rounded-md px-8 py-6 text-lg font-medium cursor-pointer"
              >
                {t('heroBlock.cta')}
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black rounded-md px-8 py-6 text-lg font-medium cursor-pointer"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-sm border border-white/10">
              <TabsTrigger value="features" className="text-white data-[state=active]:bg-white data-[state=active]:text-black cursor-pointer">Features</TabsTrigger>
              <TabsTrigger value="statistics" className="text-white data-[state=active]:bg-white data-[state=active]:text-black cursor-pointer">Statistics</TabsTrigger>
              <TabsTrigger value="testimonials" className="text-white data-[state=active]:bg-white data-[state=active]:text-black cursor-pointer">Testimonials</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <Card className="bg-black/30 backdrop-blur-sm border border-white/10 h-full">
                      <CardContent className="pt-6">
                        <div className="mb-4">
                          <Badge variant="outline" className="text-white border-white/20 mb-2">{feature.category}</Badge>
                          <h3 className="text-xl font-bold">{feature.title}</h3>
                        </div>
                        <p className="text-gray-400">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap justify-center gap-10 py-6">
                      {[
                        { value: "24k+", label: "Sales Professionals" },
                        { value: "95%", label: "Success Rate" },
                        { value: "100+", label: "Training Modules" }
                      ].map((stat, i) => (
                        <motion.div 
                          key={i}
                          className="flex flex-col items-center"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 * i, duration: 0.4 }}
                        >
                          <motion.span 
                            className="text-4xl font-bold"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2 * i + 0.2, duration: 0.4 }}
                          >
                            {stat.value}
                          </motion.span>
                          <span className="text-gray-400 mt-1">{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
                  <CardContent className="pt-6">
                    <motion.blockquote 
                      className="italic text-xl text-center px-10 py-6"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      "This sales training program completely transformed how I approach client relationships. My conversion rate has increased by 40% in just three months."
                      <footer className="text-sm text-gray-400 mt-4 not-italic">
                        — Jennifer Thompson, Sales Director
                      </footer>
                    </motion.blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Curved shape at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-24 text-white"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100.42C57.51,65.11,185.23,31.18,321.39,56.44Z" />
        </svg>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Expert-Led Training",
    description: "Learn from industry professionals with proven track records in sales excellence.",
    category: "Education"
  },
  {
    title: "Interactive Exercises",
    description: "Apply what you learn through real-world scenarios and immediate feedback.",
    category: "Practice"
  },
  {
    title: "Performance Analytics",
    description: "Track your progress with detailed metrics and personalized insights.",
    category: "Analytics"
  }
];

export default HeroBlock; 