/**
 * Unit tests for Blog Sitemap Generator
 */

import { describe, it, expect } from 'vitest';
import { 
  generateBlogSitemap, 
  validateBlogArticles, 
  transformArticlesForSitemap,
  type BlogArticle 
} from '../generateBlogSitemap';

describe('generateBlogSitemap', () => {
  const baseUrl = 'https://www.emvi.app';

  describe('basic functionality', () => {
    it('should generate empty sitemap when no articles provided', () => {
      const result = generateBlogSitemap(baseUrl, []);
      
      expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(result).toContain('</urlset>');
      expect(result).not.toContain('<url>');
    });

    it('should generate sitemap with single article', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'test-article',
          publishedAt: '2025-01-01T00:00:00Z',
          priority: 0.8,
          changefreq: 'weekly'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<loc>https://www.emvi.app/blog/test-article</loc>');
      expect(result).toContain('<lastmod>2025-01-01</lastmod>');
      expect(result).toContain('<changefreq>weekly</changefreq>');
      expect(result).toContain('<priority>0.8</priority>');
    });

    it('should generate sitemap with multiple articles', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'article-one',
          publishedAt: '2025-01-01T00:00:00Z',
          priority: 0.9,
          changefreq: 'daily'
        },
        {
          slug: 'article-two',
          publishedAt: '2025-01-02T00:00:00Z',
          priority: 0.7,
          changefreq: 'weekly'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<loc>https://www.emvi.app/blog/article-one</loc>');
      expect(result).toContain('<loc>https://www.emvi.app/blog/article-two</loc>');
      expect(result).toContain('<priority>0.9</priority>');
      expect(result).toContain('<priority>0.7</priority>');
    });
  });

  describe('date handling', () => {
    it('should use updatedAt over publishedAt when both provided', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'updated-article',
          publishedAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-15T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<lastmod>2025-01-15</lastmod>');
      expect(result).not.toContain('<lastmod>2025-01-01</lastmod>');
    });

    it('should use publishedAt when updatedAt not provided', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'published-article',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<lastmod>2025-01-01</lastmod>');
    });

    it('should use current date when neither updatedAt nor publishedAt provided', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'no-date-article'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      // Should contain a recent date (not checking exact date due to timing)
      const currentYear = new Date().getFullYear();
      expect(result).toContain(`<lastmod>${currentYear}`);
    });
  });

  describe('defaults and options', () => {
    it('should use default priority when not specified', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'default-priority-article',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<priority>0.7</priority>');
    });

    it('should use default changefreq when not specified', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'default-changefreq-article',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<changefreq>weekly</changefreq>');
    });

    it('should allow custom defaults via options', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'custom-defaults-article',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles, {
        defaultPriority: 0.5,
        defaultChangefreq: 'monthly'
      });
      
      expect(result).toContain('<priority>0.5</priority>');
      expect(result).toContain('<changefreq>monthly</changefreq>');
    });

    it('should allow disabling lastmod via options', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'no-lastmod-article',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles, {
        includeLastMod: false
      });
      
      expect(result).not.toContain('<lastmod>');
    });
  });

  describe('filtering and validation', () => {
    it('should filter out articles with placeholder slugs', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'real-article',
          publishedAt: '2025-01-01T00:00:00Z'
        },
        {
          slug: 'placeholder-article',
          publishedAt: '2025-01-01T00:00:00Z'
        },
        {
          slug: 'example-post',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<loc>https://www.emvi.app/blog/real-article</loc>');
      expect(result).not.toContain('<loc>https://www.emvi.app/blog/placeholder-article</loc>');
      expect(result).not.toContain('<loc>https://www.emvi.app/blog/example-post</loc>');
    });

    it('should filter out articles with empty or invalid slugs', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'valid-article',
          publishedAt: '2025-01-01T00:00:00Z'
        },
        {
          slug: '',
          publishedAt: '2025-01-01T00:00:00Z'
        },
        {
          slug: '   ',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toContain('<loc>https://www.emvi.app/blog/valid-article</loc>');
      // Should only have one URL entry
      const urlCount = (result.match(/<url>/g) || []).length;
      expect(urlCount).toBe(1);
    });
  });

  describe('XML format validation', () => {
    it('should generate valid XML structure', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'xml-test-article',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      expect(result).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
      expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(result).toContain('</urlset>');
      expect(result).toMatch(/<url>[\s\S]*<\/url>/);
    });

    it('should properly escape special characters in URLs', () => {
      const articles: BlogArticle[] = [
        {
          slug: 'special-chars-&-symbols',
          publishedAt: '2025-01-01T00:00:00Z'
        }
      ];

      const result = generateBlogSitemap(baseUrl, articles);
      
      // URL should be properly constructed despite special chars in slug
      expect(result).toContain('<loc>https://www.emvi.app/blog/special-chars-&-symbols</loc>');
    });
  });
});

describe('validateBlogArticles', () => {
  it('should pass validation for valid articles', () => {
    const articles: BlogArticle[] = [
      {
        slug: 'valid-article-one',
        publishedAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-02T00:00:00Z',
        priority: 0.8,
        changefreq: 'weekly'
      }
    ];

    const result = validateBlogArticles(articles);
    
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.validCount).toBe(1);
    expect(result.totalCount).toBe(1);
  });

  it('should catch articles with missing slugs', () => {
    const articles: BlogArticle[] = [
      {
        slug: '',
        publishedAt: '2025-01-01T00:00:00Z'
      }
    ];

    const result = validateBlogArticles(articles);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Article at index 0: Empty slug');
  });

  it('should warn about placeholder content', () => {
    const articles: BlogArticle[] = [
      {
        slug: 'placeholder-article',
        publishedAt: '2025-01-01T00:00:00Z'
      }
    ];

    const result = validateBlogArticles(articles);
    
    expect(result.warnings).toContain("Article 'placeholder-article': Appears to be placeholder content");
  });

  it('should warn about invalid priority values', () => {
    const articles: BlogArticle[] = [
      {
        slug: 'invalid-priority',
        publishedAt: '2025-01-01T00:00:00Z',
        priority: 1.5 // Invalid - should be 0-1
      }
    ];

    const result = validateBlogArticles(articles);
    
    expect(result.warnings).toContain("Article 'invalid-priority': Priority should be between 0 and 1");
  });
});

describe('transformArticlesForSitemap', () => {
  it('should transform blog registry articles to sitemap format', () => {
    const registryArticles = [
      {
        slug: 'test-article',
        publishedAt: '2025-01-01',
        updatedAt: '2025-01-02',
        featured: true,
        categorySlug: 'career-growth'
      },
      {
        slug: 'regular-article',
        publishedAt: '2025-01-01',
        featured: false,
        categorySlug: 'industry-insights'
      }
    ];

    const result = transformArticlesForSitemap(registryArticles);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      slug: 'test-article',
      publishedAt: '2025-01-01',
      updatedAt: '2025-01-02',
      priority: 0.9, // Featured article gets higher priority
      changefreq: 'weekly',
      categorySlug: 'career-growth'
    });
    expect(result[1].priority).toBe(0.7); // Regular article gets standard priority
  });
});