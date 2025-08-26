/**
 * Blog Sitemap Generator for EmviApp
 * Generates XML sitemap from the blog article registry
 */

export interface BlogArticle {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
  priority?: number;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  categorySlug?: string;
}

export interface BlogSitemapOptions {
  includeLastMod?: boolean;
  defaultPriority?: number;
  defaultChangefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

/**
 * Generates a blog sitemap XML from article data
 * @param baseUrl - Base URL for the sitemap (e.g., 'https://www.emvi.app')
 * @param articles - Array of blog articles
 * @param options - Optional configuration
 * @returns XML sitemap string
 */
export function generateBlogSitemap(
  baseUrl: string, 
  articles: BlogArticle[], 
  options: BlogSitemapOptions = {}
): string {
  const {
    includeLastMod = true,
    defaultPriority = 0.7,
    defaultChangefreq = 'weekly'
  } = options;

  // Filter out any invalid articles and ensure we have real data
  const validArticles = articles.filter(article => 
    article.slug && 
    article.slug.trim() && 
    !article.slug.includes('placeholder') &&
    !article.slug.includes('example')
  );

  if (validArticles.length === 0) {
    console.warn('No valid blog articles found for sitemap generation');
  }

  // Generate XML entries for each article
  const urlEntries = validArticles.map(article => {
    const loc = `${baseUrl}/blog/${article.slug}`;
    
    // Use updatedAt if available, otherwise publishedAt, otherwise current date
    const lastMod = article.updatedAt || article.publishedAt || new Date().toISOString();
    const lastModFormatted = lastMod.split('T')[0]; // Format as YYYY-MM-DD
    
    const priority = article.priority ?? defaultPriority;
    const changefreq = article.changefreq ?? defaultChangefreq;

    let entry = `  <url>
    <loc>${loc}</loc>`;

    if (includeLastMod) {
      entry += `
    <lastmod>${lastModFormatted}</lastmod>`;
    }

    entry += `
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;

    return entry;
  }).join('\n');

  // Generate complete XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return xml;
}

/**
 * Validates blog article data for sitemap generation
 * @param articles - Array of blog articles to validate
 * @returns Validation result with issues found
 */
export function validateBlogArticles(articles: BlogArticle[]): {
  valid: boolean;
  errors: string[];
  warnings: string[];
  validCount: number;
  totalCount: number;
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  let validCount = 0;

  articles.forEach((article, index) => {
    // Check required fields
    if (!article.slug) {
      errors.push(`Article at index ${index}: Missing required 'slug' field`);
      return;
    }

    if (!article.slug.trim()) {
      errors.push(`Article at index ${index}: Empty slug`);
      return;
    }

    // Check for placeholder content
    if (article.slug.includes('placeholder') || article.slug.includes('example')) {
      warnings.push(`Article '${article.slug}': Appears to be placeholder content`);
    }

    // Check for valid date formats
    if (article.updatedAt && !isValidISODate(article.updatedAt)) {
      warnings.push(`Article '${article.slug}': Invalid updatedAt date format`);
    }

    if (article.publishedAt && !isValidISODate(article.publishedAt)) {
      warnings.push(`Article '${article.slug}': Invalid publishedAt date format`);
    }

    // Check priority range
    if (article.priority !== undefined && (article.priority < 0 || article.priority > 1)) {
      warnings.push(`Article '${article.slug}': Priority should be between 0 and 1`);
    }

    validCount++;
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    validCount,
    totalCount: articles.length
  };
}

/**
 * Helper function to validate ISO date strings
 */
function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString.includes('-');
}

/**
 * Transforms blog article registry data to sitemap-compatible format
 * @param articles - Articles from the blog registry
 * @returns Transformed articles for sitemap generation
 */
export function transformArticlesForSitemap(articles: any[]): BlogArticle[] {
  return articles.map(article => ({
    slug: article.slug,
    updatedAt: article.updatedAt,
    publishedAt: article.publishedAt,
    priority: article.featured ? 0.9 : 0.7, // Featured articles get higher priority
    changefreq: 'weekly' as const,
    categorySlug: article.categorySlug
  }));
}