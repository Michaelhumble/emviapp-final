/**
 * Social Sharing Test Script for EmviApp Blog
 * Tests all article URLs across major social platforms
 */

import { BLOG_ARTICLES } from '../src/data/blogArticles';
import OGImageGenerator from '../src/utils/ogImageGenerator';

interface SocialTestResult {
  platform: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  debugUrl?: string;
}

interface ArticleTestReport {
  slug: string;
  title: string;
  url: string;
  fullUrl: string;
  tests: SocialTestResult[];
  ogValidation: {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  };
}

class SocialSharingTester {
  private results: ArticleTestReport[] = [];
  private readonly baseUrl = 'https://emviapp.com';

  constructor() {
    console.log('🧪 Starting Social Sharing Tests for EmviApp Blog...\n');
  }

  /**
   * Test a single article across all social platforms
   */
  private testArticle(article: typeof BLOG_ARTICLES[0]): ArticleTestReport {
    const fullUrl = `${this.baseUrl}${article.url}`;
    const tests: SocialTestResult[] = [];
    
    // Validate OG image
    const ogValidation = OGImageGenerator.validateOGImage(article.image);
    
    // Generate test URLs
    const testUrls = OGImageGenerator.generateSocialTestURLs(fullUrl);

    // Test Facebook
    tests.push({
      platform: 'Facebook',
      status: this.validateTitle(article.title) && this.validateDescription(article.description) && ogValidation.isValid ? 'pass' : 'warning',
      message: ogValidation.isValid ? 'Ready for sharing' : 'OG image needs optimization',
      debugUrl: testUrls.facebook
    });

    // Test LinkedIn
    tests.push({
      platform: 'LinkedIn',
      status: this.validateBusinessContent(article.title, article.description) ? 'pass' : 'warning',
      message: this.validateBusinessContent(article.title, article.description) 
        ? 'Professional content ready' 
        : 'Consider more professional tone for LinkedIn',
      debugUrl: testUrls.linkedin
    });

    // Test Twitter
    tests.push({
      platform: 'Twitter/X',
      status: this.validateTwitterContent(article.title, article.description) ? 'pass' : 'warning',
      message: this.validateTwitterContent(article.title, article.description)
        ? 'Optimized for Twitter cards'
        : 'Title may be too long for Twitter display',
      debugUrl: testUrls.twitter
    });

    // Test WhatsApp
    tests.push({
      platform: 'WhatsApp',
      status: ogValidation.isValid ? 'pass' : 'warning',
      message: ogValidation.isValid ? 'Will show rich preview' : 'May show as basic link',
      debugUrl: testUrls.whatsapp
    });

    // Test Pinterest (if image is suitable)
    const isPinterestReady = this.validatePinterestImage(article.image);
    tests.push({
      platform: 'Pinterest',
      status: isPinterestReady ? 'pass' : 'warning',
      message: isPinterestReady ? 'Image optimized for Pinterest' : 'Consider vertical image orientation for Pinterest'
    });

    return {
      slug: article.slug,
      title: article.title,
      url: article.url,
      fullUrl,
      tests,
      ogValidation
    };
  }

  /**
   * Validate title length and content
   */
  private validateTitle(title: string): boolean {
    return title.length >= 30 && title.length <= 60;
  }

  /**
   * Validate description length and content
   */
  private validateDescription(description: string): boolean {
    return description.length >= 120 && description.length <= 160;
  }

  /**
   * Validate content for business/professional platforms
   */
  private validateBusinessContent(title: string, description: string): boolean {
    const businessKeywords = ['business', 'professional', 'strategy', 'growth', 'success', 'career', 'industry'];
    const content = `${title} ${description}`.toLowerCase();
    return businessKeywords.some(keyword => content.includes(keyword));
  }

  /**
   * Validate content for Twitter
   */
  private validateTwitterContent(title: string, description: string): boolean {
    // Twitter card title should be under 70 characters for optimal display
    return title.length <= 70;
  }

  /**
   * Validate image for Pinterest
   */
  private validatePinterestImage(imageUrl: string): boolean {
    // Pinterest prefers vertical or square images
    // This is a heuristic check - in reality you'd need to fetch image dimensions
    return imageUrl.includes('portrait') || imageUrl.includes('square') || imageUrl.includes('vertical');
  }

  /**
   * Run tests for all articles
   */
  public runAllTests(): void {
    console.log(`📊 Testing ${BLOG_ARTICLES.length} articles across all social platforms...\n`);

    this.results = BLOG_ARTICLES.map(article => this.testArticle(article));
    
    this.generateReport();
  }

  /**
   * Generate comprehensive test report
   */
  private generateReport(): void {
    console.log('\n📋 SOCIAL SHARING TEST REPORT');
    console.log('=' * 60);

    // Summary statistics
    const totalArticles = this.results.length;
    const totalTests = this.results.reduce((sum, result) => sum + result.tests.length, 0);
    const passedTests = this.results.reduce((sum, result) => 
      sum + result.tests.filter(test => test.status === 'pass').length, 0
    );
    const warningTests = this.results.reduce((sum, result) => 
      sum + result.tests.filter(test => test.status === 'warning').length, 0
    );
    const failedTests = this.results.reduce((sum, result) => 
      sum + result.tests.filter(test => test.status === 'fail').length, 0
    );

    console.log(`\n📈 Summary:`);
    console.log(`   Total Articles: ${totalArticles}`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   ✅ Passed: ${passedTests} (${Math.round((passedTests / totalTests) * 100)}%)`);
    console.log(`   ⚠️  Warnings: ${warningTests} (${Math.round((warningTests / totalTests) * 100)}%)`);
    console.log(`   ❌ Failed: ${failedTests} (${Math.round((failedTests / totalTests) * 100)}%)`);
    console.log(`   🎯 Overall Score: ${Math.round(((passedTests + warningTests * 0.5) / totalTests) * 100)}%\n`);

    // Detailed results by platform
    const platforms = ['Facebook', 'LinkedIn', 'Twitter/X', 'WhatsApp', 'Pinterest'];
    
    console.log('🔍 Platform-Specific Results:');
    platforms.forEach(platform => {
      const platformTests = this.results.flatMap(result => 
        result.tests.filter(test => test.platform === platform)
      );
      const platformPassed = platformTests.filter(test => test.status === 'pass').length;
      const platformTotal = platformTests.length;
      const platformScore = Math.round((platformPassed / platformTotal) * 100);
      
      console.log(`   ${platform}: ${platformPassed}/${platformTotal} (${platformScore}%) ready`);
    });

    // Articles with issues
    console.log('\n⚠️  Articles Needing Attention:');
    this.results.forEach(result => {
      const hasIssues = result.tests.some(test => test.status !== 'pass') || !result.ogValidation.isValid;
      
      if (hasIssues) {
        console.log(`\n   📄 ${result.title}`);
        console.log(`      URL: ${result.fullUrl}`);
        
        // Show test failures/warnings
        result.tests.forEach(test => {
          if (test.status !== 'pass') {
            const icon = test.status === 'fail' ? '❌' : '⚠️';
            console.log(`      ${icon} ${test.platform}: ${test.message}`);
            if (test.debugUrl) {
              console.log(`         Debug: ${test.debugUrl}`);
            }
          }
        });

        // Show OG validation issues
        if (!result.ogValidation.isValid) {
          console.log(`      🖼️  Image Issues:`);
          result.ogValidation.issues.forEach(issue => {
            console.log(`         • ${issue}`);
          });
        }
      }
    });

    // Quick fix recommendations
    console.log('\n🔧 Quick Fix Recommendations:');
    console.log('   1. Update all article images to 1200x630px format');
    console.log('   2. Ensure all titles are 30-60 characters long');
    console.log('   3. Optimize descriptions to 120-160 characters');
    console.log('   4. Test share buttons on staging before deployment');
    console.log('   5. Use platform debugging tools to verify previews');
    
    // Testing URLs for manual verification
    console.log('\n🧪 Manual Testing URLs:');
    console.log('   Facebook Debugger: https://developers.facebook.com/tools/debug/');
    console.log('   LinkedIn Inspector: https://www.linkedin.com/post-inspector/');
    console.log('   Twitter Validator: https://cards-dev.twitter.com/validator');
    console.log('\n   💡 Paste any article URL into these tools to see live previews!');
  }

  /**
   * Generate quick fix script for common issues
   */
  public generateFixScript(): string {
    const fixes: string[] = [];
    
    this.results.forEach(result => {
      if (!result.ogValidation.isValid) {
        result.ogValidation.suggestions.forEach(suggestion => {
          fixes.push(`// Fix for ${result.slug}: ${suggestion}`);
        });
      }
    });

    return fixes.join('\n');
  }
}

// CLI execution
if (require.main === module) {
  const tester = new SocialSharingTester();
  tester.runAllTests();
}

export default SocialSharingTester;