import { lazy } from 'react';

// Import ALL blog images as ES6 modules for proper bundling
import salonStaffingCrisisImage from '@/assets/blog/salon-staffing-crisis-2025.jpg';
import aiSalonToolsImage from '@/assets/blog/ai-salon-tools-2025-real.jpg';
import beautyProfessionalSuccessGuideImage from '@/assets/blog/beauty-professional-success-guide.jpg';
import nailCareSecretsImage from '@/assets/blog/nail-care-secrets-hero.jpg';
import aiMakeupToolsImage from '@/assets/blog/ai-makeup-tools-2025.jpg';
import lashClientLoyaltyImage from '@/assets/blog/lash-client-loyalty-2025.jpg';
import clientRetentionSecretsImage from '@/assets/blog/client-retention-secrets.jpg';
import salonStaffManagementImage from '@/assets/blog/salon-staff-management.jpg';
import salonBookingsIncreaseImage from '@/assets/blog/salon-bookings-increase.jpg';
import mobileFirstBeautyImage from '@/assets/blog/mobile-first-beauty.jpg';
import salonPricingStrategiesImage from '@/assets/blog/salon-pricing-strategies.jpg';
import nailSalonSocialMediaImage from '@/assets/blog/nail-salon-social-media.jpg';
import salonSocialMediaMarketingImage from '@/assets/blog/salon-social-media-marketing.jpg';
import salonStaffingSolutionImage from '@/assets/blog/salon-staffing-solution-2025.jpg';
import sellSalonGuideImage from '@/assets/blog/sell-salon-guide-2025.jpg';
import aiBeautyRevolutionHeroImage from '@/assets/blog/ai-beauty-revolution-hero-premium.jpg';
import beautyIndustryMissingPieceImage from '@/assets/blog/beauty-industry-missing-piece.jpg';
import beautyTechRevolutionHeroImage from '@/assets/blog/beauty-tech-revolution-hero.jpg';
import globalBeautyCommunityHeroImage from '@/assets/blog/global-beauty-community-hero.jpg';
import heroImage from '@/assets/blog/emviapp-hero-vietnamese-nail-tech.jpg';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  categorySlug: string;
  tags: string[];
  image: string;
  featured?: boolean;
  trending?: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  url: string;
}

// Lazy load all article components
const TopNailSalonJobsUS2025 = lazy(() => import('@/pages/blog/articles/TopNailSalonJobsUS2025'));
const WeeklyPayNailArtists = lazy(() => import('@/pages/blog/articles/WeeklyPayNailArtists'));
const SellNailSalonSmart = lazy(() => import('@/pages/blog/articles/SellNailSalonSmart'));
const NailIndustryTrends2025 = lazy(() => import('@/pages/blog/articles/NailIndustryTrends2025'));

// Central registry of all blog articles
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'top-nail-salon-jobs-us-2025',
    slug: 'top-nail-salon-jobs-us-2025',
    title: 'Top 10 Nail Salon Jobs in the U.S. (Updated 2025)',
    description: 'Discover the highest-paying nail salon jobs across the U.S. in 2025. From khách sang salons to tip cao locations, find your perfect nail tech career opportunity.',
    author: 'EmviApp Team',
    publishedAt: '2025-01-01',
    readTime: '8 min read',
    category: 'Career Growth',
    categorySlug: 'career-growth',
    tags: ['nail jobs USA', 'nail salon careers', 'khách sang', 'tip cao', 'nail technician salary', 'beauty jobs 2025', 'premium nail salons', 'nail tech opportunities'],
    image: salonStaffingCrisisImage,
    featured: true,
    trending: true,
    component: TopNailSalonJobsUS2025,
    url: '/blog/career-growth/top-nail-salon-jobs-us-2025'
  },
  {
    id: 'weekly-pay-nail-artists',
    slug: 'weekly-pay-nail-artists',
    title: 'Why Weekly Pay Attracts the Best Nail Artists',
    description: 'Discover why weekly pay structures are revolutionizing nail salon hiring. Top khách sang salons offer weekly payments to attract skilled nail artists with tip cao potential.',
    author: 'EmviApp Team',
    publishedAt: '2025-01-01',
    readTime: '6 min read',
    category: 'Career Growth',
    categorySlug: 'career-growth',
    tags: ['weekly pay', 'nail jobs', 'beauty salons', 'khách sang', 'tip cao', 'nail artist benefits', 'salon employment', 'nail tech careers'],
    image: salonStaffingSolutionImage,
    featured: true,
    trending: true,
    component: WeeklyPayNailArtists,
    url: '/blog/career-growth/weekly-pay-nail-artists'
  },
  {
    id: 'sell-nail-salon-smart',
    slug: 'sell-nail-salon-smart',
    title: 'How to Sell a Nail Salon the Smart Way',
    description: 'Expert guide to selling your nail salon for maximum profit. Learn valuation strategies, buyer targeting, and how to showcase your khách sang clientele for tip cao returns.',
    author: 'EmviApp Team',
    publishedAt: '2025-01-01',
    readTime: '9 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['sell nail salon', 'salon for sale', 'beauty salon valuation', 'khách sang business', 'salon management', 'business sale tips', 'nail industry'],
    image: sellSalonGuideImage,
    featured: true,
    trending: true,
    component: SellNailSalonSmart,
    url: '/blog/salon-management/sell-nail-salon-smart'
  },
  {
    id: 'nail-industry-trends-2025',
    slug: 'nail-industry-trends-2025',
    title: 'Nail Industry Trends 2025 — What Artists Need to Know',
    description: 'Essential nail industry trends for 2025. From glazed donut nails to AI color matching, discover what beauty professionals need to know for tip cao success.',
    author: 'EmviApp Team',
    publishedAt: '2025-01-01',
    readTime: '7 min read',
    category: 'Industry Insights',
    categorySlug: 'industry-insights',
    tags: ['nail trends 2025', 'beauty industry', 'nail artists', 'khách sang trends', 'glazed donut nails', 'AI beauty tech', 'nail art techniques', 'beauty salons'],
    image: nailSalonSocialMediaImage,
    featured: true,
    trending: true,
    component: NailIndustryTrends2025,
    url: '/blog/industry-insights/nail-industry-trends-2025'
  }
];

// Create lookup maps for efficient searching
export const ARTICLES_BY_SLUG = new Map(
  BLOG_ARTICLES.map(article => [article.slug, article])
);

export const ARTICLES_BY_CATEGORY = BLOG_ARTICLES.reduce((acc, article) => {
  if (!acc[article.categorySlug]) {
    acc[article.categorySlug] = [];
  }
  acc[article.categorySlug].push(article);
  return acc;
}, {} as Record<string, BlogArticle[]>);

export const ARTICLES_BY_TAG = BLOG_ARTICLES.reduce((acc, article) => {
  article.tags.forEach(tag => {
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(article);
  });
  return acc;
}, {} as Record<string, BlogArticle[]>);

// Utility functions
export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return ARTICLES_BY_SLUG.get(slug);
};

export const getArticlesByCategory = (categorySlug: string): BlogArticle[] => {
  return ARTICLES_BY_CATEGORY[categorySlug] || [];
};

export const getFeaturedArticles = (): BlogArticle[] => {
  return BLOG_ARTICLES.filter(article => article.featured);
};

export const getTrendingArticles = (): BlogArticle[] => {
  return BLOG_ARTICLES.filter(article => article.trending);
};

export const getRecentArticles = (limit?: number): BlogArticle[] => {
  const sorted = [...BLOG_ARTICLES].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getRelatedArticles = (currentArticle: BlogArticle, limit = 3): BlogArticle[] => {
  // Find articles with matching tags or same category
  const related = BLOG_ARTICLES
    .filter(article => article.id !== currentArticle.id)
    .map(article => {
      let score = 0;
      // Same category gets higher score
      if (article.categorySlug === currentArticle.categorySlug) {
        score += 3;
      }
      // Matching tags get points
      const matchingTags = article.tags.filter(tag => 
        currentArticle.tags.includes(tag)
      ).length;
      score += matchingTags;
      
      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
    
  return related;
};

export const getAllCategories = (): Array<{ name: string; slug: string; count: number }> => {
  const categories = new Map<string, { name: string; count: number }>();
  
  BLOG_ARTICLES.forEach(article => {
    if (categories.has(article.categorySlug)) {
      categories.get(article.categorySlug)!.count++;
    } else {
      categories.set(article.categorySlug, {
        name: article.category,
        count: 1
      });
    }
  });
  
  return Array.from(categories.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    count: data.count
  }));
};

export const getAllTags = (): Array<{ name: string; count: number }> => {
  const tags = new Map<string, number>();
  
  BLOG_ARTICLES.forEach(article => {
    article.tags.forEach(tag => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tags.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const searchArticles = (query: string): BlogArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return BLOG_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.description.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Validation function to ensure all articles are properly configured
export const validateArticleRegistry = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const ids = new Set<string>();
  
  BLOG_ARTICLES.forEach((article, index) => {
    // Check for required fields
    const requiredFields = ['id', 'slug', 'title', 'description', 'author', 'publishedAt', 'readTime', 'category', 'categorySlug', 'url', 'component'];
    requiredFields.forEach(field => {
      if (!article[field as keyof BlogArticle]) {
        errors.push(`Article at index ${index}: Missing required field '${field}'`);
      }
    });
    
    // Check for duplicate slugs
    if (slugs.has(article.slug)) {
      errors.push(`Duplicate slug found: '${article.slug}'`);
    }
    slugs.add(article.slug);
    
    // Check for duplicate IDs
    if (ids.has(article.id)) {
      errors.push(`Duplicate ID found: '${article.id}'`);
    }
    ids.add(article.id);
    
    // Validate URL format
    if (article.url && !article.url.startsWith('/blog/')) {
      errors.push(`Article '${article.slug}': URL should start with '/blog/'`);
    }
    
    // Check if tags array exists
    if (!Array.isArray(article.tags)) {
      errors.push(`Article '${article.slug}': Tags should be an array`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};