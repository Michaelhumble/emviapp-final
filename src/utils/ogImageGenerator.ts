/**
 * OG Image Generator and Validator for EmviApp Blog
 * Ensures all articles have proper 1200x630 OG images with consistent branding
 */

export interface OGImageConfig {
  title: string;
  category: string;
  author?: string;
  brandColor?: string;
  backgroundGradient?: string;
  logoUrl?: string;
}

export class OGImageGenerator {
  private static readonly OPTIMAL_WIDTH = 1200;
  private static readonly OPTIMAL_HEIGHT = 630;
  private static readonly BASE_URL = 'https://emviapp.com';

  /**
   * Generate optimized Unsplash URL for OG images
   */
  static generateUnsplashOGImage(unsplashId: string, title: string, category: string): string {
    const params = new URLSearchParams({
      w: this.OPTIMAL_WIDTH.toString(),
      h: this.OPTIMAL_HEIGHT.toString(),
      fit: 'crop',
      crop: 'center',
      auto: 'format',
      q: '80'
    });

    return `https://images.unsplash.com/photo-${unsplashId}?${params.toString()}`;
  }

  /**
   * Generate custom branded OG image URL using a service like Bannerbear or similar
   */
  static generateBrandedOGImage(config: OGImageConfig): string {
    const params = new URLSearchParams({
      title: config.title.substring(0, 60), // Truncate for visual appeal
      category: config.category,
      width: this.OPTIMAL_WIDTH.toString(),
      height: this.OPTIMAL_HEIGHT.toString(),
      brand: 'EmviApp',
      gradient: config.backgroundGradient || 'purple-to-pink',
      author: config.author || 'EmviApp Editorial'
    });

    // This would integrate with a service like Bannerbear, Placid, or custom generator
    return `${this.BASE_URL}/api/og-image?${params.toString()}`;
  }

  /**
   * Validate if an image URL is optimized for social sharing
   */
  static validateOGImage(imageUrl: string): {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check if HTTPS
    if (!imageUrl.startsWith('https://')) {
      issues.push('Image URL must use HTTPS');
      suggestions.push('Update image URL to use HTTPS protocol');
    }

    // Check if it's properly sized (heuristic check)
    if (!imageUrl.includes('w=1200') && !imageUrl.includes('1200') && !imageUrl.includes('og-')) {
      issues.push('Image may not be optimized for social sharing');
      suggestions.push('Use 1200x630px images for optimal display on all social platforms');
    }

    // Check for Unsplash optimization
    if (imageUrl.includes('unsplash.com') && !imageUrl.includes('w=')) {
      issues.push('Unsplash image is not optimized with proper parameters');
      suggestions.push('Add w=1200&h=630&fit=crop&auto=format&q=80 parameters to Unsplash URLs');
    }

    // Check for proper format
    if (!imageUrl.match(/\.(jpg|jpeg|png|webp)(\?|$)/i) && !imageUrl.includes('unsplash.com')) {
      issues.push('Image format should be JPG, PNG, or WebP');
      suggestions.push('Use JPG format for photos, PNG for graphics with transparency');
    }

    return {
      isValid: issues.length === 0,
      issues,
      suggestions
    };
  }

  /**
   * Generate fallback OG image with EmviApp branding
   */
  static generateFallbackOGImage(title: string, category: string = 'Beauty'): string {
    // This could integrate with a dynamic image generation service
    const params = new URLSearchParams({
      title: encodeURIComponent(title.substring(0, 50)),
      category: encodeURIComponent(category),
      brand: 'EmviApp',
      template: 'blog-default'
    });

    return `${this.BASE_URL}/api/generate-og?${params.toString()}`;
  }

  /**
   * Batch optimize all article images
   */
  static optimizeArticleImages(articles: Array<{ slug: string; title: string; category: string; image?: string }>): Array<{
    slug: string;
    currentImage: string;
    optimizedImage: string;
    issues: string[];
  }> {
    return articles.map(article => {
      const currentImage = article.image || '';
      const validation = this.validateOGImage(currentImage);
      
      let optimizedImage = currentImage;
      
      // If current image has issues, generate optimized version
      if (!validation.isValid || !currentImage) {
        if (currentImage.includes('unsplash.com')) {
          // Extract Unsplash photo ID and optimize
          const match = currentImage.match(/photo-([a-zA-Z0-9_-]+)/);
          if (match) {
            optimizedImage = this.generateUnsplashOGImage(match[1], article.title, article.category);
          }
        } else {
          // Generate fallback branded image
          optimizedImage = this.generateFallbackOGImage(article.title, article.category);
        }
      }

      return {
        slug: article.slug,
        currentImage,
        optimizedImage,
        issues: validation.issues
      };
    });
  }

  /**
   * Generate social sharing test URLs for a specific article
   */
  static generateSocialTestURLs(articleUrl: string): {
    facebook: string;
    linkedin: string;
    twitter: string;
    whatsapp: string;
    telegram: string;
  } {
    const fullUrl = articleUrl.startsWith('http') ? articleUrl : `${this.BASE_URL}${articleUrl}`;
    const encodedUrl = encodeURIComponent(fullUrl);

    return {
      facebook: `https://developers.facebook.com/tools/debug/sharing/?q=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/post-inspector/inspect/${encodedUrl}`,
      twitter: `https://cards-dev.twitter.com/validator?url=${encodedUrl}`,
      whatsapp: `whatsapp://send?text=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}`
    };
  }

  /**
   * Generate a comprehensive social sharing report
   */
  static generateSocialSharingReport(articles: Array<{ 
    slug: string; 
    title: string; 
    category: string; 
    image?: string; 
    url: string;
  }>): {
    summary: {
      totalArticles: number;
      articlesWithIssues: number;
      optimizationScore: number;
    };
    articles: Array<{
      slug: string;
      title: string;
      url: string;
      image: string;
      issues: string[];
      testUrls: ReturnType<typeof OGImageGenerator.generateSocialTestURLs>;
    }>;
    recommendations: string[];
  } {
    const articleReports = articles.map(article => {
      const validation = this.validateOGImage(article.image || '');
      const testUrls = this.generateSocialTestURLs(article.url);

      return {
        slug: article.slug,
        title: article.title,
        url: article.url,
        image: article.image || '',
        issues: validation.issues,
        testUrls
      };
    });

    const articlesWithIssues = articleReports.filter(report => report.issues.length > 0).length;
    const optimizationScore = Math.round(((articles.length - articlesWithIssues) / articles.length) * 100);

    const recommendations = [
      'Use consistent 1200x630px images for all articles',
      'Implement automated OG image generation with EmviApp branding',
      'Test all social sharing URLs using platform debugging tools',
      'Monitor social sharing performance and click-through rates',
      'Create category-specific OG image templates for brand consistency',
      'Optimize images for fast loading (under 200KB when possible)',
      'Add descriptive alt text for all OG images',
      'Use high-contrast text overlays for better readability'
    ];

    return {
      summary: {
        totalArticles: articles.length,
        articlesWithIssues,
        optimizationScore
      },
      articles: articleReports,
      recommendations
    };
  }
}

export default OGImageGenerator;