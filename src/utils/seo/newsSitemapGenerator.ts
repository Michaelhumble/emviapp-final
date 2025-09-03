/**
 * News Sitemap Generator for Google News
 * Generates news sitemaps for press mentions within 48-hour window
 */

interface NewsItem {
  url: string;
  title: string;
  publishDate: string;
  language: string;
  outlet: string;
  keywords?: string[];
}

interface NewsSitemapOptions {
  baseUrl: string;
  publicationName: string;
  language: string;
  maxAge: number; // hours
}

export class NewsSitemapGenerator {
  private options: NewsSitemapOptions;

  constructor(options: Partial<NewsSitemapOptions> = {}) {
    this.options = {
      baseUrl: 'https://www.emvi.app',
      publicationName: 'EmviApp',
      language: 'en',
      maxAge: 48,
      ...options
    };
  }

  /**
   * Generate news sitemap XML for recent press mentions
   */
  async generateNewsSitemap(newsItems: NewsItem[] = []): Promise<string> {
    const recentItems = this.filterRecentItems(newsItems);
    
    if (recentItems.length === 0) {
      return this.generateEmptySitemap();
    }

    const sitemapEntries = recentItems.map(item => this.generateNewsEntry(item)).join('\n');
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${sitemapEntries}
</urlset>`;
  }

  /**
   * Generate news sitemap from press coverage data
   */
  async generateFromPressData(): Promise<string> {
    const pressItems = await this.fetchRecentPressItems();
    return this.generateNewsSitemap(pressItems);
  }

  /**
   * Filter items to only include those within the time window
   */
  private filterRecentItems(items: NewsItem[]): NewsItem[] {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - this.options.maxAge);

    return items.filter(item => {
      const publishDate = new Date(item.publishDate);
      return publishDate > cutoffTime;
    });
  }

  /**
   * Generate a single news entry for the sitemap
   */
  private generateNewsEntry(item: NewsItem): string {
    const escapedTitle = this.escapeXml(item.title);
    const keywords = item.keywords ? item.keywords.join(', ') : '';

    return `  <url>
    <loc>${item.url}</loc>
    <news:news>
      <news:publication>
        <news:name>${this.options.publicationName}</news:name>
        <news:language>${item.language || this.options.language}</news:language>
      </news:publication>
      <news:publication_date>${item.publishDate}</news:publication_date>
      <news:title><![CDATA[${escapedTitle}]]></news:title>${keywords ? `
      <news:keywords>${this.escapeXml(keywords)}</news:keywords>` : ''}
    </news:news>
    <lastmod>${item.publishDate}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>`;
  }

  /**
   * Generate empty sitemap when no recent items
   */
  private generateEmptySitemap(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
  }

  /**
   * Fetch recent press items (mock implementation)
   */
  private async fetchRecentPressItems(): Promise<NewsItem[]> {
    // In production, this would fetch from your press database
    const mockItems: NewsItem[] = [
      {
        url: `${this.options.baseUrl}/press/ap-news-ai-beauty-platform-launch`,
        title: 'EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry',
        publishDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        language: 'en',
        outlet: 'Associated Press',
        keywords: ['EmviApp', 'AI', 'beauty industry', 'platform launch']
      },
      {
        url: `${this.options.baseUrl}/press/kron4-beauty-tech-revolution`,
        title: 'EmviApp Revolutionizes Beauty Industry Hiring with AI Technology',
        publishDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        language: 'en',
        outlet: 'KRON4',
        keywords: ['EmviApp', 'beauty hiring', 'AI technology', 'revolution']
      }
    ];

    return mockItems;
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return char;
      }
    });
  }

  /**
   * Validate news sitemap XML
   */
  async validateSitemap(xml: string): Promise<boolean> {
    try {
      // Basic XML structure validation
      if (!xml.includes('<?xml version="1.0"')) return false;
      if (!xml.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"')) return false;
      if (!xml.includes('<urlset')) return false;
      if (!xml.includes('</urlset>')) return false;

      // Count news:news elements - should match URL count
      const newsElements = (xml.match(/<news:news>/g) || []).length;
      const urlElements = (xml.match(/<url>/g) || []).length;
      
      return newsElements === urlElements;
    } catch (error) {
      console.error('Sitemap validation error:', error);
      return false;
    }
  }

  /**
   * Submit sitemap to search engines
   */
  async submitToSearchEngines(sitemapUrl: string): Promise<void> {
    const searchEngines = [
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    ];

    const promises = searchEngines.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'GET' });
        console.log(`Submitted to ${url}: ${response.status}`);
      } catch (error) {
        console.error(`Failed to submit to ${url}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Generate news sitemap index for multiple sitemaps
   */
  generateSitemapIndex(sitemapUrls: string[]): string {
    const now = new Date().toISOString();
    const sitemapEntries = sitemapUrls.map(url => 
      `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
  }
}

/**
 * Utility function to generate news sitemap
 */
export async function generateNewsSitemap(options?: Partial<NewsSitemapOptions>): Promise<string> {
  const generator = new NewsSitemapGenerator(options);
  return generator.generateFromPressData();
}

/**
 * Update robots.txt with news sitemap reference
 */
export function updateRobotsTxtWithNewsSitemap(baseUrl: string): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemaps/jobs-sitemap.xml
Sitemap: ${baseUrl}/sitemaps/news-sitemap.xml

# News sitemap for Google News
Sitemap: ${baseUrl}/sitemaps/news.xml`;
}

export default NewsSitemapGenerator;