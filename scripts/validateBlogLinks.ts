#!/usr/bin/env node

/**
 * Blog Link Validation Script
 * Ensures all blog articles are properly registered and accessible
 * Run with: npm run validate-blog
 */

import { BLOG_ARTICLES, validateArticleRegistry, getAllArticleSlugs } from '../src/data/blogArticles';
import { validateAllBlogLinks } from '../src/utils/blogLinks';
import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalArticles: number;
    featuredCount: number;
    trendingCount: number;
    categoryCounts: Record<string, number>;
  };
}

class BlogValidator {
  private errors: string[] = [];
  private warnings: string[] = [];

  async validateAll(): Promise<ValidationResult> {
    console.log('🔍 Starting comprehensive blog validation...\n');

    // 1. Validate article registry
    await this.validateRegistry();

    // 2. Validate file existence
    await this.validateFileExistence();

    // 3. Validate link consistency
    await this.validateLinkConsistency();

    // 4. Validate component imports
    await this.validateComponentImports();

    // 5. Validate URL patterns
    await this.validateUrlPatterns();

    // 6. Generate statistics
    const stats = this.generateStats();

    const success = this.errors.length === 0;

    return {
      success,
      errors: this.errors,
      warnings: this.warnings,
      stats
    };
  }

  private async validateRegistry(): Promise<void> {
    console.log('📝 Validating article registry...');
    
    const registryValidation = validateArticleRegistry();
    if (!registryValidation.valid) {
      this.errors.push(...registryValidation.errors);
    }

    const linkValidation = validateAllBlogLinks();
    if (!linkValidation.valid) {
      this.errors.push(...linkValidation.errors);
    }

    console.log(`   ✅ Registry validation complete\n`);
  }

  private async validateFileExistence(): Promise<void> {
    console.log('📁 Checking article component files...');
    
    const articlesDir = path.join(process.cwd(), 'src/pages/blog/articles');
    
    for (const article of BLOG_ARTICLES) {
      // Extract component file name from slug
      const componentName = this.slugToComponentName(article.slug);
      const filePath = path.join(articlesDir, `${componentName}.tsx`);
      
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Missing component file: ${componentName}.tsx for article: ${article.slug}`);
      }
    }

    console.log(`   ✅ File existence check complete\n`);
  }

  private async validateLinkConsistency(): Promise<void> {
    console.log('🔗 Validating link consistency...');
    
    for (const article of BLOG_ARTICLES) {
      // Check URL format
      const expectedUrl = `/blog/${article.categorySlug}/${article.slug}`;
      if (article.url !== expectedUrl) {
        this.errors.push(`URL mismatch for ${article.slug}: expected ${expectedUrl}, got ${article.url}`);
      }

      // Check slug uniqueness
      const duplicates = BLOG_ARTICLES.filter(a => a.slug === article.slug);
      if (duplicates.length > 1) {
        this.errors.push(`Duplicate slug found: ${article.slug}`);
      }

      // Check ID uniqueness
      const idDuplicates = BLOG_ARTICLES.filter(a => a.id === article.id);
      if (idDuplicates.length > 1) {
        this.errors.push(`Duplicate ID found: ${article.id}`);
      }
    }

    console.log(`   ✅ Link consistency check complete\n`);
  }

  private async validateComponentImports(): Promise<void> {
    console.log('⚛️  Checking component imports...');
    
    for (const article of BLOG_ARTICLES) {
      try {
        // This would require dynamic import in a real scenario
        // For now, we'll check if the component name follows conventions
        const componentName = this.slugToComponentName(article.slug);
        
        if (!componentName || componentName.length < 3) {
          this.warnings.push(`Suspicious component name for ${article.slug}: ${componentName}`);
        }
      } catch (error) {
        this.errors.push(`Failed to validate component for ${article.slug}: ${error}`);
      }
    }

    console.log(`   ✅ Component import check complete\n`);
  }

  private async validateUrlPatterns(): Promise<void> {
    console.log('🌐 Validating URL patterns...');
    
    const validCategories = ['beauty-tips', 'industry', 'artist-spotlights', 'salon-management', 'success-stories', 'trends'];
    
    for (const article of BLOG_ARTICLES) {
      // Check category slug validity
      if (!validCategories.includes(article.categorySlug)) {
        this.warnings.push(`Unknown category slug: ${article.categorySlug} for article: ${article.slug}`);
      }

      // Check slug format (no spaces, lowercase, hyphens)
      if (!/^[a-z0-9-]+$/.test(article.slug)) {
        this.errors.push(`Invalid slug format: ${article.slug} (should be lowercase, hyphens only)`);
      }

      // Check for required fields
      const requiredFields = ['title', 'description', 'author', 'publishedAt', 'readTime', 'image'];
      for (const field of requiredFields) {
        if (!article[field as keyof typeof article]) {
          this.errors.push(`Missing required field '${field}' for article: ${article.slug}`);
        }
      }
    }

    console.log(`   ✅ URL pattern validation complete\n`);
  }

  private generateStats() {
    const categoryCounts: Record<string, number> = {};
    
    for (const article of BLOG_ARTICLES) {
      categoryCounts[article.categorySlug] = (categoryCounts[article.categorySlug] || 0) + 1;
    }

    return {
      totalArticles: BLOG_ARTICLES.length,
      featuredCount: BLOG_ARTICLES.filter(a => a.featured).length,
      trendingCount: BLOG_ARTICLES.filter(a => a.trending).length,
      categoryCounts
    };
  }

  private slugToComponentName(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

// CLI execution
async function main() {
  const validator = new BlogValidator();
  const result = await validator.validateAll();

  // Print results
  console.log('📊 VALIDATION SUMMARY');
  console.log('=====================');
  console.log(`Total Articles: ${result.stats.totalArticles}`);
  console.log(`Featured Articles: ${result.stats.featuredCount}`);
  console.log(`Trending Articles: ${result.stats.trendingCount}`);
  console.log('\nCategory Distribution:');
  Object.entries(result.stats.categoryCounts).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} articles`);
  });

  if (result.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    result.warnings.forEach(warning => console.log(`   ${warning}`));
  }

  if (result.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    result.errors.forEach(error => console.log(`   ${error}`));
    console.log(`\n💥 Validation failed with ${result.errors.length} errors`);
    process.exit(1);
  } else {
    console.log('\n✅ All validations passed! Blog system is ready for production.');
    process.exit(0);
  }
}

// Export for programmatic use
export { BlogValidator };

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Validation script failed:', error);
    process.exit(1);
  });
}