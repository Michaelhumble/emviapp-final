import { lazy } from 'react';

// Import ALL blog images as ES6 modules for proper bundling
import salonStaffingCrisisImage from '@/assets/blog/salon-staffing-crisis-2025.jpg';
import aiSalonToolsImage from '@/assets/blog/ai-salon-tools-2025-real.jpg';
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
import beautyIndustryMissingPieceImage from '@/assets/blog/beauty-industry-missing-piece.jpg';

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
const AIToolsForMakeupArtists2025 = lazy(() => import('@/pages/blog/articles/AIToolsForMakeupArtists2025'));
const ClientLoyaltyLashTechs2025 = lazy(() => import('@/pages/blog/articles/ClientLoyaltyLashTechs2025'));
const ClientRetentionSecrets2025 = lazy(() => import('@/pages/blog/articles/ClientRetentionSecrets2025'));
const HiringManagingSalonStaff2025 = lazy(() => import('@/pages/blog/articles/HiringManagingSalonStaff2025'));
const IncreaseSalonBookings2024 = lazy(() => import('@/pages/blog/articles/IncreasealonBookings2024'));
const MobileFirstBeautyBusiness2025 = lazy(() => import('@/pages/blog/articles/MobileFirstBeautyBusiness2025'));
const SalonPricingStrategies2025 = lazy(() => import('@/pages/blog/articles/SalonPricingStrategies2025'));
const SocialMediaContentNailSalons2025 = lazy(() => import('@/pages/blog/articles/SocialMediaContentNailSalons2025'));
const SocialMediaMarketingSalons2025 = lazy(() => import('@/pages/blog/articles/SocialMediaMarketingSalons2025'));
const TheBeautyIndustrysMissingPiece = lazy(() => import('@/pages/blog/articles/TheBeautyIndustrysMissingPiece'));
const NailCareSecretsArticle = lazy(() => import('@/components/blog/articles/NailCareSecretsArticle'));
const AISalonTools2025 = lazy(() => import('@/pages/blog/AISalonTools2025'));
const SalonStaffingCrisis2025 = lazy(() => import('@/pages/blog/SalonStaffingCrisis2025'));

// Central registry of all blog articles
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'salon-staffing-crisis-2025',
    slug: 'salon-staffing-crisis-2025',
    title: 'The Salon Staffing Crisis of 2025: Why 73% of Salon Owners Can\'t Find Qualified Staff',
    description: '73% of salon owners struggle to find qualified beauty professionals. Discover why the beauty industry faces a talent shortage and proven solutions that work.',
    author: 'EmviApp Team',
    publishedAt: '2025-01-04',
    readTime: '8 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['salon staffing crisis', 'beauty industry hiring', 'salon recruitment', 'hire beauty staff', 'salon staff shortage 2025', 'beauty professional jobs', 'talent acquisition', 'staffing solutions'],
    image: salonStaffingCrisisImage,
    featured: true,
    trending: true,
    component: SalonStaffingCrisis2025,
    url: '/blog/salon-management/salon-staffing-crisis-2025'
  },
  {
    id: 'ai-salon-tools-2025',
    slug: 'ai-salon-tools-2025',
    title: '17 AI Tools Every Salon Owner Needs in 2025',
    description: 'Discover how salon owners are using AI to increase revenue by 35%, reduce no-shows by 67%, and create personalized experiences. Complete guide with ROI calculator.',
    author: 'EmviApp Team',
    publishedAt: '2025-02-01',
    readTime: '15 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['AI tools', 'salon owners 2025', 'salon management software', 'AI booking system', 'beauty industry AI', 'salon automation', 'revenue optimization', 'business growth'],
    image: aiSalonToolsImage,
    featured: true,
    trending: true,
    component: AISalonTools2025,
    url: '/blog/ai-salon-tools-2025'
  },
  {
    id: 'nail-care-secrets-2025',
    slug: 'nail-care-secrets-healthy-beautiful-nails',
    title: 'Top 7 Secrets for Beautiful, Healthy Nails All Year Long',
    description: 'Discover expert nail care secrets that beauty professionals swear by. Learn proven techniques for stronger, healthier nails that look salon-perfect year-round.',
    url: '/blog/beautiful-tips/nail-care-secrets-healthy-beautiful-nails',
    image: nailCareSecretsImage,
    author: 'EmviApp Beauty Team',
    publishedAt: '2025-01-08',
    readTime: '8 min read',
    category: 'Beautiful Tips',
    categorySlug: 'beautiful-tips',
    tags: ['nail care', 'beauty tips', 'nail health', 'manicure', 'salon tips', 'beauty professionals', 'nail strengthening', 'cuticle care'],
    component: NailCareSecretsArticle,
    featured: true
  },
  {
    id: 'ai-tools-makeup-artists-2025',
    slug: 'ai-tools-makeup-artists-2025',
    title: 'AI Tools Every Makeup Artist Should Use in 2025',
    description: 'Discover the cutting-edge AI tools that are revolutionizing the makeup industry and helping artists create stunning looks with unprecedented precision.',
    author: 'EmviApp Team',
    publishedAt: 'January 31, 2025',
    readTime: '8 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['AI tools', 'makeup artistry', 'technology', 'innovation', 'beauty tech'],
    image: aiMakeupToolsImage,
    featured: true,
    trending: true,
    component: AIToolsForMakeupArtists2025,
    url: '/blog/beauty-tips/ai-tools-makeup-artists-2025'
  },
  {
    id: 'client-loyalty-lash-techs-2025',
    slug: 'client-loyalty-lash-techs-2025',
    title: 'Building Client Loyalty: Proven Strategies for Lash Technicians',
    description: 'Master the art of client retention with strategies that turn first-time customers into lifelong advocates for your lash business.',
    author: 'EmviApp Team',
    publishedAt: 'January 31, 2025',
    readTime: '7 min read',
    category: 'Artist Spotlights',
    categorySlug: 'artist-spotlights',
    tags: ['lash technician', 'client loyalty', 'retention strategies', 'lash business', 'customer service'],
    image: lashClientLoyaltyImage,
    trending: true,
    component: ClientLoyaltyLashTechs2025,
    url: '/blog/artist-spotlights/client-loyalty-lash-techs-2025'
  },
  {
    id: 'client-retention-secrets-2025',
    slug: 'client-retention-secrets-2025',
    title: 'Client Retention Secrets: Keep Them Coming Back',
    description: 'Learn the insider strategies that top beauty professionals use to build lasting relationships and ensure clients return again and again.',
    author: 'EmviApp Team',
    publishedAt: 'January 30, 2025',
    readTime: '6 min read',
    category: 'Success Stories',
    categorySlug: 'success-stories',
    tags: ['client retention', 'customer loyalty', 'beauty business', 'relationship building'],
    image: clientRetentionSecretsImage,
    component: ClientRetentionSecrets2025,
    url: '/blog/success-stories/client-retention-secrets-2025'
  },
  {
    id: 'hiring-managing-salon-staff-2025',
    slug: 'hiring-managing-salon-staff-2025',
    title: 'The Ultimate Guide to Hiring and Managing Salon Staff in 2025',
    description: 'Build your dream team with proven strategies for recruiting, training, and retaining top talent in the competitive beauty industry.',
    author: 'EmviApp Team',
    publishedAt: 'January 30, 2025',
    readTime: '12 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['salon management', 'hiring', 'staff management', 'team building', 'HR'],
    image: salonStaffManagementImage,
    featured: true,
    component: HiringManagingSalonStaff2025,
    url: '/blog/salon-management/hiring-managing-salon-staff-2025'
  },
  {
    id: 'increase-salon-bookings-2024',
    slug: 'increase-salon-bookings-2024',
    title: 'How to Increase Your Salon Bookings by 300% in 2024',
    description: 'Proven strategies and actionable tips that successful salon owners use to dramatically boost their booking rates and revenue.',
    author: 'EmviApp Team',
    publishedAt: 'December 15, 2024',
    readTime: '10 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['salon growth', 'bookings', 'marketing', 'business strategy', 'revenue'],
    image: salonBookingsIncreaseImage,
    trending: true,
    component: IncreaseSalonBookings2024,
    url: '/blog/salon-management/increase-salon-bookings-2024'
  },
  {
    id: 'mobile-first-beauty-business-2025',
    slug: 'mobile-first-beauty-business-2025',
    title: 'Going Mobile-First: Beauty Business Strategies for 2025',
    description: 'Discover how to build a thriving mobile-first beauty business that meets clients where they are and drives unprecedented growth.',
    author: 'EmviApp Team',
    publishedAt: 'January 29, 2025',
    readTime: '9 min read',
    category: 'Trends',
    categorySlug: 'trends',
    tags: ['mobile business', 'digital transformation', 'beauty trends', 'technology', 'mobile apps'],
    image: mobileFirstBeautyImage,
    component: MobileFirstBeautyBusiness2025,
    url: '/blog/trends/mobile-first-beauty-business-2025'
  },
  {
    id: 'salon-pricing-strategies-2025',
    slug: 'salon-pricing-strategies-2025',
    title: 'Salon Pricing Strategies That Maximize Revenue in 2025',
    description: 'Master the art and science of salon pricing with strategies that boost your bottom line while maintaining client satisfaction.',
    author: 'EmviApp Team',
    publishedAt: 'January 28, 2025',
    readTime: '11 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['pricing strategy', 'revenue optimization', 'salon business', 'profit margins', 'value pricing'],
    image: salonPricingStrategiesImage,
    featured: true,
    component: SalonPricingStrategies2025,
    url: '/blog/salon-management/salon-pricing-strategies-2025'
  },
  {
    id: 'social-media-content-nail-salons-2025',
    slug: 'social-media-content-nail-salons-2025',
    title: 'Social Media Content Ideas for Nail Salons in 2025',
    description: 'Transform your nail salon\'s social media presence with creative content ideas that engage followers and drive bookings.',
    author: 'EmviApp Team',
    publishedAt: 'January 27, 2025',
    readTime: '8 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['social media', 'content marketing', 'nail salon', 'Instagram', 'TikTok'],
    image: nailSalonSocialMediaImage,
    trending: true,
    component: SocialMediaContentNailSalons2025,
    url: '/blog/salon-management/social-media-content-nail-salons-2025'
  },
  {
    id: 'social-media-marketing-salons-2025',
    slug: 'social-media-marketing-salons-2025',
    title: 'Social Media Marketing for Salons: The Complete 2025 Guide',
    description: 'Master social media marketing with our comprehensive guide designed specifically for salon owners and beauty professionals.',
    author: 'EmviApp Team',
    publishedAt: 'January 26, 2025',
    readTime: '14 min read',
    category: 'Salon Management',
    categorySlug: 'salon-management',
    tags: ['social media marketing', 'salon promotion', 'digital marketing', 'brand building', 'client acquisition'],
    image: salonSocialMediaMarketingImage,
    component: SocialMediaMarketingSalons2025,
    url: '/blog/salon-management/social-media-marketing-salons-2025'
  },
  {
    id: 'the-beauty-industrys-missing-piece-emviapp',
    slug: 'the-beauty-industrys-missing-piece-emviapp',
    title: 'The Beauty Industry\'s Missing Piece: How EmviApp is Changing the Game',
    description: 'Discover how EmviApp is revolutionizing the beauty industry by connecting artists, salons, and clients in ways never before possible.',
    author: 'EmviApp Team',
    publishedAt: 'January 25, 2025',
    readTime: '7 min read',
    category: 'Industry',
    categorySlug: 'industry',
    tags: ['EmviApp', 'beauty industry', 'innovation', 'technology', 'marketplace'],
    image: beautyIndustryMissingPieceImage,
    featured: true,
    component: TheBeautyIndustrysMissingPiece,
    url: '/blog/industry/the-beauty-industrys-missing-piece-emviapp'
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