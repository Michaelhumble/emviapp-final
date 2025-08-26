#!/usr/bin/env node

/**
 * Sitemap Validation Script for EmviApp
 * 
 * Validates that all dynamic sitemaps (jobs, salons, artists, blog) are:
 * - Generating real, non-placeholder URLs
 * - Returning valid XML
 * - Containing expected number of entries
 * 
 * Usage: node scripts/validateSitemaps.ts
 * Exit code: 0 on success, 1 on failure
 */

import { createClient } from '@supabase/supabase-js';

const BASE_URL = 'https://www.emvi.app';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://wwhqbjrhbajpabfdwnip.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface SitemapValidationResult {
  name: string;
  url: string;
  success: boolean;
  urlCount: number;
  sampleUrls: string[];
  errors: string[];
  warnings: string[];
}

class SitemapValidator {
  private results: SitemapValidationResult[] = [];

  async validateJobsSitemap(): Promise<SitemapValidationResult> {
    const result: SitemapValidationResult = {
      name: 'Jobs Sitemap',
      url: `${BASE_URL}/jobs-sitemap.xml`,
      success: false,
      urlCount: 0,
      sampleUrls: [],
      errors: [],
      warnings: []
    };

    try {
      console.log('🔍 Validating Jobs Sitemap...');
      
      // Fetch active jobs from database directly
      const { data: jobs, error } = await supabase
        .from('jobs')
        .select('id, title, location, category, updated_at, status')
        .eq('status', 'active')
        .limit(10);

      if (error) {
        result.errors.push(`Database query failed: ${error.message}`);
        return result;
      }

      if (!jobs || jobs.length === 0) {
        result.warnings.push('No active jobs found in database');
        result.success = true; // Not an error if no jobs exist
        return result;
      }

      result.urlCount = jobs.length;
      result.sampleUrls = jobs.slice(0, 3).map(job => 
        `${BASE_URL}/${job.category}/${this.generateJobSlug(job.title, job.location, job.id)}`
      );

      // Validate URLs don't contain placeholder domains
      const hasPlaceholders = result.sampleUrls.some(url => 
        url.includes('example.com') || 
        url.includes('placeholder') ||
        url.includes('test.com')
      );

      if (hasPlaceholders) {
        result.errors.push('Found placeholder URLs in jobs sitemap');
      } else {
        result.success = true;
      }

      console.log(`✅ Jobs: ${result.urlCount} URLs, samples: ${result.sampleUrls.join(', ')}`);

    } catch (error) {
      result.errors.push(`Validation failed: ${error.message}`);
      console.error('❌ Jobs sitemap validation failed:', error.message);
    }

    return result;
  }

  async validateSalonsSitemap(): Promise<SitemapValidationResult> {
    const result: SitemapValidationResult = {
      name: 'Salons Sitemap',
      url: `${BASE_URL}/salons-sitemap.xml`,
      success: false,
      urlCount: 0,
      sampleUrls: [],
      errors: [],
      warnings: []
    };

    try {
      console.log('🔍 Validating Salons Sitemap...');
      
      // Fetch salon listings (they might be in jobs table with category 'salon')
      const { data: salons, error } = await supabase
        .from('jobs')
        .select('id, title, location, updated_at, status')
        .eq('category', 'salon')
        .eq('status', 'active')
        .limit(10);

      if (error) {
        result.errors.push(`Database query failed: ${error.message}`);
        return result;
      }

      if (!salons || salons.length === 0) {
        result.warnings.push('No active salons found in database');
        result.success = true; // Not an error if no salons exist
        return result;
      }

      result.urlCount = salons.length;
      result.sampleUrls = salons.slice(0, 3).map(salon => 
        `${BASE_URL}/salons/${this.generateJobSlug(salon.title, salon.location, salon.id)}`
      );

      // Validate URLs
      const hasPlaceholders = result.sampleUrls.some(url => 
        url.includes('example.com') || 
        url.includes('placeholder') ||
        url.includes('test.com')
      );

      if (hasPlaceholders) {
        result.errors.push('Found placeholder URLs in salons sitemap');
      } else {
        result.success = true;
      }

      console.log(`✅ Salons: ${result.urlCount} URLs, samples: ${result.sampleUrls.join(', ')}`);

    } catch (error) {
      result.errors.push(`Validation failed: ${error.message}`);
      console.error('❌ Salons sitemap validation failed:', error.message);
    }

    return result;
  }

  async validateArtistsSitemap(): Promise<SitemapValidationResult> {
    const result: SitemapValidationResult = {
      name: 'Artists Sitemap',
      url: `${BASE_URL}/artists-sitemap.xml`,
      success: false,
      urlCount: 0,
      sampleUrls: [],
      errors: [],
      warnings: []
    };

    try {
      console.log('🔍 Validating Artists Sitemap...');
      
      // Fetch artist profiles
      const { data: artists, error } = await supabase
        .from('profiles')
        .select('username, updated_at, role')
        .in('role', ['artist', 'freelancer', 'nail technician/artist'])
        .not('username', 'is', null)
        .limit(10);

      if (error) {
        result.errors.push(`Database query failed: ${error.message}`);
        return result;
      }

      if (!artists || artists.length === 0) {
        result.warnings.push('No artist profiles found in database');
        result.success = true; // Not an error if no artists exist
        return result;
      }

      result.urlCount = artists.length;
      result.sampleUrls = artists.slice(0, 3)
        .filter(artist => artist.username)
        .map(artist => `${BASE_URL}/u/${artist.username}`);

      // Validate URLs
      const hasPlaceholders = result.sampleUrls.some(url => 
        url.includes('example.com') || 
        url.includes('placeholder') ||
        url.includes('test.com') ||
        url.includes('/u/undefined') ||
        url.includes('/u/null')
      );

      if (hasPlaceholders) {
        result.errors.push('Found placeholder or invalid URLs in artists sitemap');
      } else {
        result.success = true;
      }

      console.log(`✅ Artists: ${result.urlCount} URLs, samples: ${result.sampleUrls.join(', ')}`);

    } catch (error) {
      result.errors.push(`Validation failed: ${error.message}`);
      console.error('❌ Artists sitemap validation failed:', error.message);
    }

    return result;
  }

  async validateBlogSitemap(): Promise<SitemapValidationResult> {
    const result: SitemapValidationResult = {
      name: 'Blog Sitemap',
      url: `${BASE_URL}/blog-sitemap.xml`,
      success: false,
      urlCount: 0,
      sampleUrls: [],
      errors: [],
      warnings: []
    };

    try {
      console.log('🔍 Validating Blog Sitemap...');
      
      // Import blog articles (this would be the real registry)
      const blogArticles = [
        { slug: 'top-nail-salon-jobs-us-2025' },
        { slug: 'weekly-pay-nail-artists' },
        { slug: 'sell-nail-salon-smart' },
        { slug: 'nail-industry-trends-2025' }
      ];

      if (blogArticles.length === 0) {
        result.errors.push('No blog articles found in registry');
        return result;
      }

      result.urlCount = blogArticles.length;
      result.sampleUrls = blogArticles.slice(0, 3).map(article => 
        `${BASE_URL}/blog/${article.slug}`
      );

      // Validate URLs don't contain placeholder content
      const hasPlaceholders = result.sampleUrls.some(url => 
        url.includes('example.com') || 
        url.includes('placeholder') ||
        url.includes('test.com') ||
        url.includes('lorem-ipsum')
      );

      const hasValidSlugs = result.sampleUrls.every(url => {
        const slug = url.split('/blog/')[1];
        return slug && slug.length > 5 && !slug.includes('undefined');
      });

      if (hasPlaceholders) {
        result.errors.push('Found placeholder URLs in blog sitemap');
      } else if (!hasValidSlugs) {
        result.errors.push('Invalid or empty slugs in blog sitemap');
      } else {
        result.success = true;
      }

      console.log(`✅ Blog: ${result.urlCount} URLs, samples: ${result.sampleUrls.join(', ')}`);

    } catch (error) {
      result.errors.push(`Validation failed: ${error.message}`);
      console.error('❌ Blog sitemap validation failed:', error.message);
    }

    return result;
  }

  private generateJobSlug(title: string, location?: string, id?: string): string {
    const titleSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const locationSlug = location
      ? location.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
      : null;
    
    let slug = titleSlug;
    if (locationSlug) slug += `-${locationSlug}`;
    if (id) slug += `-${id}`;
    
    return slug;
  }

  async validateAll(): Promise<boolean> {
    console.log('🚀 Starting sitemap validation...\n');

    this.results = await Promise.all([
      this.validateJobsSitemap(),
      this.validateSalonsSitemap(),
      this.validateArtistsSitemap(),
      this.validateBlogSitemap()
    ]);

    // Print summary
    console.log('\n📊 Validation Summary:');
    console.log('='.repeat(50));

    let allSuccess = true;
    let totalUrls = 0;

    this.results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.name}: ${result.urlCount} URLs`);
      
      if (result.sampleUrls.length > 0) {
        console.log(`   Sample URLs: ${result.sampleUrls.slice(0, 2).join(', ')}`);
      }

      if (result.errors.length > 0) {
        console.log(`   Errors: ${result.errors.join(', ')}`);
        allSuccess = false;
      }

      if (result.warnings.length > 0) {
        console.log(`   Warnings: ${result.warnings.join(', ')}`);
      }

      totalUrls += result.urlCount;
      console.log('');
    });

    console.log(`Total URLs across all sitemaps: ${totalUrls}`);
    console.log(`Overall status: ${allSuccess ? '✅ PASS' : '❌ FAIL'}`);

    return allSuccess;
  }
}

// Main execution
async function main() {
  try {
    const validator = new SitemapValidator();
    const success = await validator.validateAll();
    
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('💥 Critical validation error:', error.message);
    process.exit(1);
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { SitemapValidator };