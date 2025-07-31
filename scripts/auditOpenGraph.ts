/**
 * Open Graph Audit Script for EmviApp Blog System
 * Comprehensive audit of OG tags across all pages
 */

import { BLOG_ARTICLES } from '../src/data/blogArticles';

interface OGAuditIssue {
  type: 'error' | 'warning' | 'info';
  page: string;
  issue: string;
  suggestion: string;
}

interface OGTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

interface PageAudit {
  url: string;
  title: string;
  ogTags: OGTags;
  issues: OGAuditIssue[];
}

export class OpenGraphAuditor {
  private issues: OGAuditIssue[] = [];
  private pageAudits: PageAudit[] = [];

  constructor() {
    console.log('🔍 Starting Open Graph Audit for EmviApp...\n');
  }

  // Audit all blog articles from registry
  auditBlogArticles(): void {
    console.log('📝 Auditing Blog Articles...');
    
    BLOG_ARTICLES.forEach(article => {
      const pageAudit: PageAudit = {
        url: article.url,
        title: article.title,
        ogTags: {
          title: article.title,
          description: article.description,
          image: article.image,
          url: `https://emviapp.com${article.url}`,
          type: 'article',
          siteName: 'EmviApp'
        },
        issues: []
      };

      // Check for missing or poor OG data
      this.validateOGTags(pageAudit);
      this.pageAudits.push(pageAudit);
    });
  }

  // Validate individual OG tags
  private validateOGTags(pageAudit: PageAudit): void {
    const { ogTags, url, title } = pageAudit;

    // Title validation
    if (!ogTags.title) {
      pageAudit.issues.push({
        type: 'error',
        page: url,
        issue: 'Missing og:title',
        suggestion: 'Add og:title meta tag'
      });
    } else if (ogTags.title.length > 60) {
      pageAudit.issues.push({
        type: 'warning',
        page: url,
        issue: `og:title too long (${ogTags.title.length} chars)`,
        suggestion: 'Keep og:title under 60 characters'
      });
    } else if (ogTags.title.length < 30) {
      pageAudit.issues.push({
        type: 'warning',
        page: url,
        issue: `og:title too short (${ogTags.title.length} chars)`,
        suggestion: 'Make og:title more descriptive (30-60 chars)'
      });
    }

    // Description validation
    if (!ogTags.description) {
      pageAudit.issues.push({
        type: 'error',
        page: url,
        issue: 'Missing og:description',
        suggestion: 'Add og:description meta tag'
      });
    } else if (ogTags.description.length > 160) {
      pageAudit.issues.push({
        type: 'warning',
        page: url,
        issue: `og:description too long (${ogTags.description.length} chars)`,
        suggestion: 'Keep og:description under 160 characters'
      });
    } else if (ogTags.description.length < 120) {
      pageAudit.issues.push({
        type: 'warning',
        page: url,
        issue: `og:description could be longer (${ogTags.description.length} chars)`,
        suggestion: 'Expand og:description to 120-160 characters'
      });
    }

    // Image validation
    if (!ogTags.image) {
      pageAudit.issues.push({
        type: 'error',
        page: url,
        issue: 'Missing og:image',
        suggestion: 'Add high-quality og:image (1200x630px recommended)'
      });
    } else {
      if (!ogTags.image.startsWith('https://')) {
        pageAudit.issues.push({
          type: 'error',
          page: url,
          issue: 'og:image not using HTTPS',
          suggestion: 'Use HTTPS URLs for og:image'
        });
      }
      if (!ogTags.image.includes('1200') && !ogTags.image.includes('w=1200')) {
        pageAudit.issues.push({
          type: 'warning',
          page: url,
          issue: 'og:image may not be optimized size',
          suggestion: 'Use 1200x630px images for optimal social sharing'
        });
      }
    }

    // URL validation
    if (!ogTags.url) {
      pageAudit.issues.push({
        type: 'error',
        page: url,
        issue: 'Missing og:url',
        suggestion: 'Add canonical og:url meta tag'
      });
    } else if (!ogTags.url.startsWith('https://emviapp.com')) {
      pageAudit.issues.push({
        type: 'error',
        page: url,
        issue: 'og:url domain mismatch',
        suggestion: 'Use consistent domain in og:url'
      });
    }

    // Type validation
    if (!ogTags.type) {
      pageAudit.issues.push({
        type: 'warning',
        page: url,
        issue: 'Missing og:type',
        suggestion: 'Add og:type (article, website, etc.)'
      });
    }

    // Site name validation
    if (!ogTags.siteName) {
      pageAudit.issues.push({
        type: 'warning',
        page: url,
        issue: 'Missing og:site_name',
        suggestion: 'Add og:site_name for brand consistency'
      });
    }
  }

  // Check for URL consistency issues
  auditURLConsistency(): void {
    console.log('🔗 Auditing URL Consistency...');
    
    const urlIssues = new Set<string>();
    
    BLOG_ARTICLES.forEach(article => {
      // Check if share buttons use consistent URLs
      const expectedShareURL = `https://emviapp.com${article.url}`;
      
      // This would need to be checked in actual component implementations
      if (!expectedShareURL.includes(article.categorySlug)) {
        urlIssues.add(`Article ${article.slug} has inconsistent category in URL`);
      }
    });

    urlIssues.forEach(issue => {
      this.issues.push({
        type: 'warning',
        page: 'Multiple',
        issue,
        suggestion: 'Update URL structure to match category hierarchy'
      });
    });
  }

  // Generate social media debugging URLs
  generateSocialDebugURLs(): { [platform: string]: string[] } {
    console.log('🐛 Generating Social Media Debug URLs...');
    
    const debugURLs: { [platform: string]: string[] } = {
      facebook: [],
      linkedin: [],
      twitter: []
    };

    this.pageAudits.forEach(audit => {
      const encodedURL = encodeURIComponent(audit.ogTags.url || '');
      
      debugURLs.facebook.push(
        `https://developers.facebook.com/tools/debug/?q=${encodedURL}`
      );
      debugURLs.linkedin.push(
        `https://www.linkedin.com/post-inspector/inspect/${encodedURL}`
      );
      debugURLs.twitter.push(
        `https://cards-dev.twitter.com/validator?url=${encodedURL}`
      );
    });

    return debugURLs;
  }

  // Generate comprehensive report
  generateReport(): void {
    console.log('\n📊 OPEN GRAPH AUDIT REPORT');
    console.log('=' * 50);
    
    // Summary statistics
    const totalPages = this.pageAudits.length;
    const totalIssues = this.pageAudits.reduce((sum, audit) => sum + audit.issues.length, 0);
    const errorCount = this.pageAudits.reduce((sum, audit) => 
      sum + audit.issues.filter(issue => issue.type === 'error').length, 0
    );
    const warningCount = this.pageAudits.reduce((sum, audit) => 
      sum + audit.issues.filter(issue => issue.type === 'warning').length, 0
    );

    console.log(`📈 Summary:`);
    console.log(`   Total Pages Audited: ${totalPages}`);
    console.log(`   Total Issues Found: ${totalIssues}`);
    console.log(`   🔴 Errors: ${errorCount}`);
    console.log(`   🟡 Warnings: ${warningCount}`);
    console.log(`   📊 Health Score: ${Math.round(((totalPages * 6 - totalIssues) / (totalPages * 6)) * 100)}%\n`);

    // Issues by priority
    console.log('🔥 HIGH PRIORITY ISSUES (Errors):');
    this.pageAudits.forEach(audit => {
      const errors = audit.issues.filter(issue => issue.type === 'error');
      if (errors.length > 0) {
        console.log(`\n   📄 ${audit.title} (${audit.url})`);
        errors.forEach(error => {
          console.log(`      ❌ ${error.issue}`);
          console.log(`         💡 ${error.suggestion}`);
        });
      }
    });

    console.log('\n⚠️  MEDIUM PRIORITY ISSUES (Warnings):');
    this.pageAudits.forEach(audit => {
      const warnings = audit.issues.filter(issue => issue.type === 'warning');
      if (warnings.length > 0) {
        console.log(`\n   📄 ${audit.title} (${audit.url})`);
        warnings.forEach(warning => {
          console.log(`      ⚠️  ${warning.issue}`);
          console.log(`         💡 ${warning.suggestion}`);
        });
      }
    });

    // Social media testing URLs
    const debugURLs = this.generateSocialDebugURLs();
    console.log('\n🔧 SOCIAL MEDIA TESTING TOOLS:');
    console.log('\n   Facebook Sharing Debugger:');
    console.log('   https://developers.facebook.com/tools/debug/');
    console.log('\n   LinkedIn Post Inspector:');
    console.log('   https://www.linkedin.com/post-inspector/');
    console.log('\n   Twitter Card Validator:');
    console.log('   https://cards-dev.twitter.com/validator');

    // Recommendations
    console.log('\n✅ RECOMMENDATIONS:');
    console.log('   1. Fix all error-level issues immediately');
    console.log('   2. Create consistent OG image templates (1200x630px)');
    console.log('   3. Implement automated OG tag validation in CI/CD');
    console.log('   4. Test all share buttons on staging before deployment');
    console.log('   5. Monitor social sharing performance with analytics');
  }

  // Run complete audit
  runFullAudit(): void {
    this.auditBlogArticles();
    this.auditURLConsistency();
    this.generateReport();
  }
}

// CLI execution
if (require.main === module) {
  const auditor = new OpenGraphAuditor();
  auditor.runFullAudit();
}

export default OpenGraphAuditor;