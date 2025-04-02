import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';

// Define the types for content sections
type ContentSection = {
  heading?: string;
  paragraphs: string[];
};

// Define the type for a post
type Post = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  categories: string[];
  author: string;
  date: string;
  content: ContentSection[];
};

// Define the type for a related article
type RelatedArticle = {
  id: string;
  title: string;
  date: string;
};

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Find the post by ID
  const post = posts.find(p => p.id === id);
  
  // Handle case when post is not found or page is still loading
  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Loading article...</h1>
          <Button variant="outline" className="border-white text-white" onClick={() => router.push('/articles')}>
            Back to All Articles
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <div className="relative h-80 md:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-90"></div>
        <div className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-12">
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.categories.map((category, i) => (
              <Badge key={i} variant="outline" className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 rounded-full bg-zinc-800 mr-3"></div>
            <div>
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-gray-400 text-sm">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-invert">
            <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
              {post.excerpt}
            </p>
            
            <Separator className="my-8" />
            
            {post.content.map((section, index) => (
              <div key={index} className="mb-12">
                {section.heading && (
                  <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-300 mb-4">{paragraph}</p>
                ))}
              </div>
            ))}
            
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-4">Share this article</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="text-white border-zinc-700 hover:bg-white hover:text-black">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="text-white border-zinc-700 hover:bg-white hover:text-black">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="text-white border-zinc-700 hover:bg-white hover:text-black">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((article, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="h-20 w-20 bg-zinc-800 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-medium mb-1 hover:text-gray-300 cursor-pointer" onClick={() => router.push(`/articles/${article.id}`)}>
                        {article.title}
                      </h4>
                      <p className="text-gray-500 text-sm">{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const posts: Post[] = [
  {
    id: "psychological-triggers-sales",
    title: "7 Psychological Triggers That Drive High-Value Sales",
    excerpt: "Discover the key psychological principles that influence purchase decisions and learn how to ethically apply them in your sales conversations.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Psychology",
    categories: ["Psychology", "Sales"],
    author: "Michael Carson",
    date: "Feb 12, 2024",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "In the competitive world of sales, understanding human psychology gives you a significant advantage. By recognizing what drives customer decisions, you can position your offerings more effectively and close high-value deals more consistently.",
          "The most successful sales professionals don't rely on manipulation or pressure tactics. Instead, they leverage fundamental psychological principles to create win-win situations that genuinely benefit their customers while achieving their sales objectives."
        ]
      },
      {
        heading: "1. Reciprocity: The Power of Giving First",
        paragraphs: [
          "Reciprocity is one of the most powerful psychological triggers in human interaction. When someone gives us something of value, we feel naturally obligated to return the favor.",
          "In sales, this principle can be applied by offering genuine value upfront: sharing useful insights, providing free resources, or extending special considerations that demonstrate your commitment to the prospect's success."
        ]
      },
      {
        heading: "2. Social Proof: Leveraging the Wisdom of the Crowd",
        paragraphs: [
          "Humans are inherently social creatures who look to others for guidance on how to act, especially in uncertain situations. When prospects see that others similar to them have made a purchase decision, they feel more confident doing the same.",
          "Incorporate testimonials, case studies, and specific results from similar clients to activate this trigger. The more closely these examples match your prospect's situation, the more powerful the social proof becomes."
        ]
      },
      {
        heading: "3. Scarcity: Creating Authentic Urgency",
        paragraphs: [
          "We value things more when they're rare or diminishing in availability. This explains why limited-time offers and exclusive opportunities are so effective in sales contexts.",
          "The key is to create genuine scarcity rather than artificial pressure. Communicate real limitations in availability, timing, or access to special terms that actually exist."
        ]
      },
      {
        heading: "4. Authority: Establishing Trust Through Expertise",
        paragraphs: [
          "People naturally defer to experts and authority figures when making decisions. In sales, establishing yourself as a trusted authority in your field creates a psychological shortcut for prospects.",
          "Build authority by sharing industry insights, demonstrating deep product knowledge, and helping prospects understand complex issues in simple terms. The goal is to position yourself as a trusted advisor rather than just a vendor."
        ]
      },
      {
        heading: "5. Consistency: Small Commitments Lead to Larger Ones",
        paragraphs: [
          "Once people take a position or make a commitment, they tend to behave consistently with that choice. This psychological principle explains why the foot-in-the-door technique is so effective.",
          "In sales, you can apply this by guiding prospects through a series of small, easy agreements before asking for the larger commitment. Each small 'yes' makes the final decision more likely."
        ]
      },
      {
        heading: "6. Liking: The Foundation of Relational Selling",
        paragraphs: [
          "We prefer to say yes to people we like and find similar to ourselves. This fundamental principle underscores why relationship building is essential in high-value sales.",
          "Find authentic common ground with prospects, demonstrate genuine interest in their challenges, and create positive interactions that make the sales process enjoyable."
        ]
      },
      {
        heading: "7. Loss Aversion: The Fear of Missing Out",
        paragraphs: [
          "People are typically more motivated to avoid losses than to achieve gains of equal value. This asymmetry in how we evaluate potential outcomes can be a powerful sales trigger.",
          "Help prospects understand what they stand to lose by not taking action. Focus on the opportunities, savings, or competitive advantages they might miss without your solution."
        ]
      },
      {
        heading: "Ethical Application of Psychological Triggers",
        paragraphs: [
          "While these psychological principles can significantly enhance your sales effectiveness, they must be applied ethically. The goal is to help prospects make good decisions that genuinely benefit them, not to manipulate them into purchases they'll regret.",
          "The most successful sales professionals use these triggers to remove unnecessary barriers in the buying process and to help prospects recognize the true value of appropriate solutions."
        ]
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "By understanding and ethically applying these seven psychological triggers, you can create more effective sales conversations that resonate deeply with prospects. These principles work because they align with fundamental aspects of human decision-making.",
          "Remember that the ultimate goal isn't just to close a sale, but to create value for your customers in ways that lead to lasting relationships and positive outcomes for all parties involved."
        ]
      }
    ]
  },
  {
    id: "future-b2b-digital-economy",
    title: "The Future of B2B Sales in a Digital-First Economy",
    excerpt: "Explore how B2B sales is evolving with digital transformation and what strategies top-performing organizations are implementing to stay ahead.",
    image: "https://placehold.co/600x400/111827/6B7280?text=B2B+Digital+Sales",
    categories: ["B2B", "Strategy"],
    author: "Sarah Chen",
    date: "Jan 28, 2024",
    content: [
      {
        paragraphs: [
          "The B2B sales landscape is undergoing a profound transformation driven by digitalization and changing buyer expectations. This article examines the key trends reshaping B2B sales and provides actionable strategies for organizations looking to thrive in this new environment."
        ]
      }
    ]
  },
  {
    id: "sales-process-converts",
    title: "Building a Sales Process That Converts: A Step-by-Step Guide",
    excerpt: "Follow this comprehensive framework to design a sales process that consistently guides prospects from awareness to closing with higher conversion rates.",
    image: "https://placehold.co/600x400/111827/6B7280?text=Sales+Process",
    categories: ["Process", "Conversion"],
    author: "David Miller",
    date: "Jan 15, 2024",
    content: [
      {
        paragraphs: [
          "A well-designed sales process is the backbone of consistent revenue generation. This guide outlines a systematic approach to developing a sales process that effectively moves prospects through each stage of the buyer's journey."
        ]
      }
    ]
  }
];

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

export default ArticleDetailPage;