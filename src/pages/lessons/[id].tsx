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

const LessonDetailPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  
  // Find the lesson by ID
  const lesson = lessons.find(l => l.id === id);
  
  // Handle case when lesson is not found or page is still loading
  if (!lesson) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Loading lesson...</h1>
          <Button variant="outline" className="border-white text-white cursor-pointer" onClick={() => router.push('/lessons')}>
            Back to All Lessons
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale"
          style={{ backgroundImage: `url(${lesson.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
        <motion.div 
          className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">
              {lesson.level}
            </Badge>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {lesson.title}
          </motion.h1>
          <motion.div 
            className="flex items-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span>{lesson.duration}</span>
            <Separator orientation="vertical" className="mx-2 h-4 bg-gray-600" />
            <span>{lesson.modules} modules</span>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">{t('lessonDetail.aboutCourse')}</h2>
              <p className="text-gray-400 mb-6">{lesson.description}</p>
              <p className="text-gray-400">{lesson.longDescription}</p>
            </motion.div>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">{t('lessonDetail.whatYouLearn')}</h2>
              <ul className="text-gray-400 space-y-2">
                {lesson.learningOutcomes?.map((outcome, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{outcome}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">{t('lessonDetail.courseModules')}</h2>
              <div className="space-y-4">
                {lesson.moduleDetails?.map((module, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className="bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-white/20 transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">Module {index + 1}: {module.title}</h3>
                            <p className="text-gray-400 text-sm">{module.duration}</p>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" className="text-white hover:text-black hover:bg-white cursor-pointer">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              </svg>
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Card className="bg-zinc-900 border border-zinc-800 sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{t('lessonDetail.readyToStart')}</h3>
                <p className="text-gray-400 mb-6">Enroll now to gain access to all course materials and start improving your sales skills today.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer">
                    {t('lessonDetail.enroll')}
                  </Button>
                </motion.div>
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <h4 className="text-lg font-bold text-white mb-2">{t('lessonDetail.courseIncludes')}</h4>
                  <ul className="text-gray-400 space-y-2">
                    {[
                      `${lesson.duration} ${t('lessonDetail.onDemandVideo')}`,
                      t('lessonDetail.downloadableResources'),
                      t('lessonDetail.certificate'),
                      t('lessonDetail.lifetimeAccess')
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + (i * 0.1), duration: 0.3 }}
                      >
                        <svg className="w-5 h-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const lessons = [
  {
    id: "fundamentals-consultative-selling",
    title: "Fundamentals of Consultative Selling",
    description: "Learn the core principles of consultative selling and how to build meaningful client relationships based on trust.",
    longDescription: "This comprehensive course will teach you the fundamentals of consultative selling, a powerful approach that focuses on building relationships and solving client problems rather than pushing products. Developed by industry experts with years of experience, this course combines theoretical knowledge with practical exercises to help you master the art of consultative selling. By the end of this course, you'll have a solid foundation in key consultative selling techniques and be able to apply them in your daily sales activities.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Consultative+Selling",
    level: "Beginner",
    duration: "4 hours",
    modules: 5,
    learningOutcomes: [
      "Understand the core principles of consultative selling",
      "Develop active listening and questioning techniques",
      "Build trust and rapport with prospects and clients",
      "Identify client needs and pain points effectively",
      "Create customized solutions that address specific challenges",
      "Handle objections with confidence and empathy"
    ],
    moduleDetails: [
      {
        title: "Introduction to Consultative Selling",
        duration: "45 minutes"
      },
      {
        title: "Building Rapport and Trust",
        duration: "50 minutes"
      },
      {
        title: "Effective Questioning Techniques",
        duration: "55 minutes"
      },
      {
        title: "Presenting Customized Solutions",
        duration: "50 minutes"
      },
      {
        title: "Mastering Follow-up and Relationship Building",
        duration: "40 minutes"
      }
    ]
  },
  {
    id: "advanced-negotiation-tactics",
    title: "Advanced Negotiation Tactics",
    description: "Master high-stakes negotiation with advanced psychological techniques and strategic frameworks.",
    longDescription: "Take your negotiation skills to the highest level with our Advanced Negotiation Tactics course. Designed for experienced sales professionals, this intensive program delves into sophisticated psychological principles and proven frameworks that drive successful high-value negotiations. Through challenging case studies, role-playing exercises, and expert feedback, you'll develop the confidence and capabilities to handle even the most complex negotiation scenarios with poise and strategic thinking.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Negotiation+Tactics",
    level: "Advanced",
    duration: "6 hours",
    modules: 8,
    learningOutcomes: [
      "Apply advanced psychological principles in negotiation contexts",
      "Recognize and counter sophisticated negotiation tactics",
      "Navigate multi-party negotiations with confidence",
      "Develop strategies for high-value and complex deals",
      "Maintain relationships while achieving favorable outcomes",
      "Adapt negotiation approaches to different cultural contexts",
      "Handle deadlocks and challenging negotiation scenarios"
    ],
    moduleDetails: [
      {
        title: "Psychological Foundations of Advanced Negotiation",
        duration: "45 minutes"
      },
      {
        title: "Power Dynamics and Leverage",
        duration: "50 minutes"
      },
      {
        title: "Strategic Concession Management",
        duration: "40 minutes"
      },
      {
        title: "Multi-party Negotiation Techniques",
        duration: "55 minutes"
      },
      {
        title: "Cultural Dimensions in Global Negotiations",
        duration: "45 minutes"
      },
      {
        title: "Breaking Deadlocks and Overcoming Impasses",
        duration: "40 minutes"
      },
      {
        title: "Enterprise Deal Negotiation Frameworks",
        duration: "50 minutes"
      },
      {
        title: "Ethics and Long-term Relationship Management",
        duration: "35 minutes"
      }
    ]
  },
  {
    id: "objection-handling-mastery",
    title: "Objection Handling Mastery",
    description: "Turn rejections into opportunities with proven methods to address and overcome customer objections.",
    longDescription: "The difference between average and exceptional sales professionals often comes down to how effectively they handle objections. In this practical, results-oriented course, you'll master the art and science of turning objections into opportunities. Using our proprietary framework and through extensive role-play scenarios, you'll develop the confidence to welcome objections as a natural part of the sales process and leverage them to strengthen customer relationships and improve your closing rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Objection+Handling",
    level: "Intermediate",
    duration: "3 hours",
    modules: 4,
    learningOutcomes: [
      "Understand the psychology behind common sales objections",
      "Anticipate objections before they arise",
      "Transform objections into opportunities to build trust",
      "Apply the LAER framework (Listen, Acknowledge, Explore, Respond)",
      "Handle price objections with confidence",
      "Address competition comparisons effectively",
      "Convert hesitant prospects into confident buyers"
    ],
    moduleDetails: [
      {
        title: "Understanding the Psychology of Objections",
        duration: "40 minutes"
      },
      {
        title: "The LAER Framework for Objection Handling",
        duration: "50 minutes"
      },
      {
        title: "Mastering Price and Value Objections",
        duration: "45 minutes"
      },
      {
        title: "Advanced Techniques for Complex Objections",
        duration: "45 minutes"
      }
    ]
  },
  {
    id: "sales-closing-techniques",
    title: "Sales Closing Techniques",
    description: "Learn powerful closing techniques that feel natural and lead to higher conversion rates.",
    longDescription: "Closing is often considered the most critical moment in the sales process, yet many sales professionals struggle with this crucial step. This practical course will equip you with a diverse toolkit of effective, ethical closing techniques that can be adapted to various selling situations. Through scenario-based learning and guided practice, you'll develop the confidence to ask for the sale in ways that feel natural and respectful while significantly improving your conversion rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Closing+Techniques",
    level: "Intermediate",
    duration: "5 hours",
    modules: 6,
    learningOutcomes: [
      "Identify the right moment to initiate closing",
      "Apply a variety of closing techniques suited to different situations",
      "Recognize buying signals and act on them confidently",
      "Handle last-minute resistance effectively",
      "Create urgency without using high-pressure tactics",
      "Develop a personalized closing style that matches your personality",
      "Improve your closing ratio through consistent application of best practices"
    ],
    moduleDetails: [
      {
        title: "The Psychology of Closing: Timing is Everything",
        duration: "45 minutes"
      },
      {
        title: "Essential Closing Techniques for Every Salesperson",
        duration: "55 minutes"
      },
      {
        title: "Creating Urgency: Ethical Approaches",
        duration: "40 minutes"
      },
      {
        title: "Overcoming Last-Minute Resistance",
        duration: "50 minutes"
      },
      {
        title: "The Art of the Smooth Transition to Close",
        duration: "45 minutes"
      },
      {
        title: "Building Your Personal Closing Playbook",
        duration: "45 minutes"
      }
    ]
  },
  {
    id: "digital-sales-strategies",
    title: "Digital Sales Strategies",
    description: "Adapt your sales approach for the digital age with effective online communication tactics.",
    longDescription: "The digital transformation has fundamentally changed how sales professionals connect with prospects and close deals. This comprehensive course will equip you with cutting-edge strategies and practical tactics to excel in virtual selling environments. From mastering video presentations to leveraging social selling platforms, you'll learn how to build relationships and drive conversions in a digital-first world while maintaining the human touch that remains essential to sales success.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Digital+Sales",
    level: "Advanced",
    duration: "8 hours",
    modules: 10,
    learningOutcomes: [
      "Craft compelling digital sales messages across various platforms",
      "Master virtual presentation techniques that engage and persuade",
      "Build authentic relationships through digital channels",
      "Leverage social selling strategies on LinkedIn and other platforms",
      "Create effective sales videos that capture attention and drive action",
      "Implement digital-specific qualification and discovery processes",
      "Navigate virtual negotiation and closing with confidence"
    ],
    moduleDetails: [
      {
        title: "The New Digital Sales Landscape",
        duration: "45 minutes"
      },
      {
        title: "Virtual Meeting Mastery",
        duration: "50 minutes"
      },
      {
        title: "Building Digital Relationships",
        duration: "45 minutes"
      },
      {
        title: "Social Selling Fundamentals",
        duration: "55 minutes"
      },
      {
        title: "Advanced LinkedIn Sales Techniques",
        duration: "45 minutes"
      },
      {
        title: "Creating Compelling Sales Videos",
        duration: "50 minutes"
      },
      {
        title: "Digital Sales Messaging Strategies",
        duration: "40 minutes"
      },
      {
        title: "Virtual Discovery and Qualification",
        duration: "45 minutes"
      },
      {
        title: "Online Demonstration Excellence",
        duration: "50 minutes"
      },
      {
        title: "Virtual Closing and Follow-up",
        duration: "35 minutes"
      }
    ]
  },
  {
    id: "enterprise-sales-mastery",
    title: "Enterprise Sales Mastery",
    description: "Scale your approach to target and close major enterprise deals with complex buying committees.",
    longDescription: "Enterprise sales require a distinct approach that goes far beyond traditional selling methods. This advanced course is designed for experienced sales professionals ready to excel in the complex, high-value world of enterprise deals. You'll learn systematic approaches to navigate organizational hierarchies, engage with multiple stakeholders, and manage the extended sales cycles typical of enterprise opportunities. By mastering both strategic and tactical aspects of enterprise selling, you'll position yourself to confidently pursue and win transformative deals.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Enterprise+Sales",
    level: "Advanced",
    duration: "10 hours",
    modules: 12,
    learningOutcomes: [
      "Develop and execute comprehensive account strategies",
      "Map and navigate complex organizational buying structures",
      "Engage effectively with C-suite and senior executives",
      "Manage and influence diverse stakeholder groups",
      "Create compelling business cases that demonstrate ROI",
      "Structure and negotiate complex enterprise agreements",
      "Build internal coalitions to support your enterprise sales efforts"
    ],
    moduleDetails: [
      {
        title: "Enterprise Sales Fundamentals",
        duration: "45 minutes"
      },
      {
        title: "Strategic Account Planning",
        duration: "55 minutes"
      },
      {
        title: "Organizational Mapping and Navigation",
        duration: "50 minutes"
      },
      {
        title: "Executive Engagement Strategies",
        duration: "45 minutes"
      },
      {
        title: "Managing Complex Buying Committees",
        duration: "55 minutes"
      },
      {
        title: "Building Compelling Business Cases",
        duration: "50 minutes"
      },
      {
        title: "Enterprise Proposal Development",
        duration: "45 minutes"
      },
      {
        title: "Solution Architecture and Customization",
        duration: "50 minutes"
      },
      {
        title: "Legal and Procurement Navigation",
        duration: "45 minutes"
      },
      {
        title: "Enterprise Deal Negotiation",
        duration: "55 minutes"
      },
      {
        title: "Implementation Planning as a Sales Tool",
        duration: "40 minutes"
      },
      {
        title: "Post-Sale Value Realization",
        duration: "45 minutes"
      }
    ]
  }
];

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default LessonDetailPage; 