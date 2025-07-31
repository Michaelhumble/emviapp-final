import { BlogArticle, getArticleBySlug, BLOG_ARTICLES } from '@/data/blogArticles';

/**
 * Generate a safe blog article link
 * This function ensures all blog links are generated from the central registry
 */
export const generateBlogLink = (slug: string): string => {
  const article = getArticleBySlug(slug);
  if (!article) {
    console.warn(`Blog article not found for slug: ${slug}`);
    return '/blog'; // Fallback to blog homepage
  }
  return article.url;
};

/**
 * Generate a safe blog article link by ID
 */
export const generateBlogLinkById = (id: string): string => {
  const article = BLOG_ARTICLES.find(a => a.id === id);
  if (!article) {
    console.warn(`Blog article not found for ID: ${id}`);
    return '/blog';
  }
  return article.url;
};

/**
 * Get article data for link generation with validation
 */
export const getArticleLinkData = (slug: string): { url: string; title: string; exists: boolean } => {
  const article = getArticleBySlug(slug);
  if (!article) {
    return {
      url: '/blog',
      title: 'Article Not Found',
      exists: false
    };
  }
  
  return {
    url: article.url,
    title: article.title,
    exists: true
  };
};

/**
 * Validate that a blog link exists before using it
 */
export const validateBlogLink = (slug: string): boolean => {
  return getArticleBySlug(slug) !== undefined;
};

/**
 * Generate category links
 */
export const generateCategoryLink = (categorySlug: string): string => {
  return `/blog/categories/${categorySlug}`;
};

/**
 * Generate tag search links
 */
export const generateTagLink = (tag: string): string => {
  return `/blog?tag=${encodeURIComponent(tag)}`;
};

/**
 * Extract slug from URL
 */
export const extractSlugFromUrl = (url: string): string | null => {
  const matches = url.match(/\/blog\/[^\/]+\/([^\/]+)$/);
  return matches ? matches[1] : null;
};

/**
 * Check if current URL matches an article
 */
export const isArticleUrl = (pathname: string): boolean => {
  const slug = extractSlugFromUrl(pathname);
  return slug ? validateBlogLink(slug) : false;
};

/**
 * Get breadcrumb data for articles
 */
export const getArticleBreadcrumbs = (slug: string): Array<{ label: string; href: string }> => {
  const article = getArticleBySlug(slug);
  if (!article) {
    return [
      { label: 'Blog', href: '/blog' },
      { label: 'Article Not Found', href: '#' }
    ];
  }
  
  return [
    { label: 'Blog', href: '/blog' },
    { label: article.category, href: generateCategoryLink(article.categorySlug) },
    { label: article.title, href: article.url }
  ];
};

/**
 * Generate social sharing URLs for articles
 */
export const generateSocialShareUrls = (slug: string) => {
  const article = getArticleBySlug(slug);
  if (!article) {
    return {};
  }
  
  const fullUrl = `https://emviapp.com${article.url}`;
  const encodedTitle = encodeURIComponent(article.title);
  const encodedDescription = encodeURIComponent(article.description);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&description=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodeURIComponent(fullUrl)}`
  };
};

/**
 * Development helper to list all available article slugs
 */
export const getAllArticleSlugs = (): string[] => {
  return BLOG_ARTICLES.map(article => article.slug);
};

/**
 * Development helper to verify all links are working
 */
export const validateAllBlogLinks = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  BLOG_ARTICLES.forEach(article => {
    // Check if component exists
    if (!article.component) {
      errors.push(`Article '${article.slug}' has no component defined`);
    }
    
    // Check URL format consistency
    const expectedUrl = `/blog/${article.categorySlug}/${article.slug}`;
    if (article.url !== expectedUrl) {
      errors.push(`Article '${article.slug}' URL mismatch. Expected: ${expectedUrl}, Got: ${article.url}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};