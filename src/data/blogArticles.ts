import { lazy } from 'react';

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
const WinterSkincareTips2025 = lazy(() => import('@/pages/blog/articles/WinterSkincareTips2025'));
const PerfectWingEyeliner2025 = lazy(() => import('@/pages/blog/articles/PerfectWingEyeliner2025'));
const NailArtTrends2025 = lazy(() => import('@/pages/blog/articles/NailArtTrends2025'));
const HairMaskDIYRecipes2025 = lazy(() => import('@/pages/blog/articles/HairMaskDIYRecipes2025'));
const ContouredBrows2025 = lazy(() => import('@/pages/blog/articles/ContouredBrows2025'));

// Central registry of all blog articles
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'ai-tools-makeup-artists-2025',
    slug: 'ai-tools-makeup-artists-2025',
    title: 'AI Tools Every Makeup Artist Should Use in 2025',
    description: 'Discover 8 essential AI tools every makeup artist needs in 2025. Free platforms, smart booking, automated marketing & client management that transform beauty businesses.',
    author: 'EmviApp Team',
    publishedAt: 'January 31, 2025',
    readTime: '8 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['AI tools', 'makeup artistry', 'technology', 'innovation', 'beauty tech'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    trending: true,
    component: AIToolsForMakeupArtists2025,
    url: '/blog/beauty-tips/ai-tools-makeup-artists-2025'
  },
  {
    id: 'client-loyalty-lash-techs-2025',
    slug: 'client-loyalty-lash-techs-2025',
    title: 'Building Client Loyalty: Proven Strategies for Lash Technicians',
    description: 'Master proven strategies that turn first-time lash clients into lifelong advocates. Free tools, retention programs & personalized service techniques that boost revenue 3x.',
    author: 'EmviApp Team',
    publishedAt: 'January 31, 2025',
    readTime: '7 min read',
    category: 'Artist Spotlights',
    categorySlug: 'artist-spotlights',
    tags: ['lash technician', 'client loyalty', 'retention strategies', 'lash business', 'customer service'],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
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
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
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
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
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
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
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
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=2127&q=80',
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
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2339&q=80',
    component: SocialMediaMarketingSalons2025,
    url: '/blog/salon-management/social-media-marketing-salons-2025'
  },
  {
    id: 'the-beauty-industrys-missing-piece-emviapp',
    slug: 'the-beauty-industrys-missing-piece-emviapp',
    title: 'The Beauty Industry\'s Missing Piece: How EmviApp is Revolutionizing Beauty Booking | Free AI Platform 2025',
    description: 'Discover why 94% of beauty professionals choose EmviApp\'s free AI-powered booking platform. No fees, unlimited growth, and smart artist matching that transforms salon operations.',
    author: 'EmviApp Team',
    publishedAt: 'January 25, 2025',
    readTime: '7 min read',
    category: 'Industry',
    categorySlug: 'industry',
    tags: ['EmviApp', 'beauty industry', 'innovation', 'technology', 'marketplace'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    featured: true,
    component: TheBeautyIndustrysMissingPiece,
    url: '/blog/industry/the-beauty-industrys-missing-piece-emviapp'
  },
  {
    id: 'winter-skincare-tips-2025',
    slug: 'winter-skincare-tips-2025',
    title: 'Winter Skincare Tips: 10 Essential Beauty Secrets for 2025',
    description: 'Master winter skincare with expert tips that will keep your skin glowing all season long. Professional-grade advice for beauty enthusiasts.',
    author: 'EmviApp Team',
    publishedAt: 'February 1, 2025',
    readTime: '7 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['winter skincare', 'beauty tips', 'skin health', 'seasonal beauty', 'skincare routine'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    component: WinterSkincareTips2025,
    url: '/blog/beauty-tips/winter-skincare-tips-2025'
  },
  {
    id: 'perfect-winged-eyeliner-2025',
    slug: 'perfect-winged-eyeliner-2025',
    title: 'Perfect Winged Eyeliner: Master the Art in 5 Simple Steps',
    description: 'Learn the professional techniques makeup artists use to create flawless winged eyeliner every time. Step-by-step guide with expert tips.',
    author: 'EmviApp Team',
    publishedAt: 'February 1, 2025',
    readTime: '6 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['eyeliner', 'makeup tutorial', 'winged eyeliner', 'eye makeup', 'beauty techniques'],
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    trending: true,
    component: PerfectWingEyeliner2025,
    url: '/blog/beauty-tips/perfect-winged-eyeliner-2025'
  },
  {
    id: 'nail-art-trends-2025',
    slug: 'nail-art-trends-2025',
    title: '2025 Nail Art Trends: 12 Designs That Will Dominate This Year',
    description: 'Discover the hottest nail art trends for 2025, from minimalist designs to bold statements. Professional techniques and inspiration for nail technicians.',
    author: 'EmviApp Team',
    publishedAt: 'February 1, 2025',
    readTime: '9 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['nail art', 'nail trends', '2025 trends', 'nail design', 'manicure'],
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=2127&q=80',
    featured: true,
    component: NailArtTrends2025,
    url: '/blog/beauty-tips/nail-art-trends-2025'
  },
  {
    id: 'hair-mask-diy-recipes-2025',
    slug: 'hair-mask-diy-recipes-2025',
    title: 'DIY Hair Masks: 8 Professional-Grade Recipes You Can Make at Home',
    description: 'Transform your hair with these expert-approved DIY hair mask recipes using natural ingredients. Professional results without the salon price tag.',
    author: 'EmviApp Team',
    publishedAt: 'February 1, 2025',
    readTime: '10 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['hair care', 'DIY beauty', 'hair masks', 'natural ingredients', 'hair treatment'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    trending: true,
    component: HairMaskDIYRecipes2025,
    url: '/blog/beauty-tips/hair-mask-diy-recipes-2025'
  },
  {
    id: 'contoured-brows-2025',
    slug: 'contoured-brows-2025',
    title: 'Contoured Brows: The Ultimate Guide to Professional Eyebrow Shaping',
    description: 'Master the art of eyebrow contouring with professional techniques that create perfectly sculpted brows for any face shape. Step-by-step guide included.',
    author: 'EmviApp Team',
    publishedAt: 'February 1, 2025',
    readTime: '8 min read',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    tags: ['eyebrows', 'brow shaping', 'contouring', 'makeup techniques', 'face shaping'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    component: ContouredBrows2025,
    url: '/blog/beauty-tips/contoured-brows-2025'
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