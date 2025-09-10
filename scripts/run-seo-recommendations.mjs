#!/usr/bin/env node

/**
 * Minimal SEO Recommendations Engine
 * Runs SEO checks and suggests improvements using OpenAI (if available)
 * 
 * Usage: node scripts/run-seo-recommendations.mjs [--include-ai]
 * Output: reports/seo-recs-{date}.md
 */

import fs from 'fs/promises';
import path from 'path';

const today = new Date().toISOString().split('T')[0];
const reportsDir = 'reports';
const outputFile = path.join(reportsDir, `seo-recs-${today}.md`);

const includeAI = process.argv.includes('--include-ai');

// Basic page structure for EmviApp
const pages = [
  {
    url: '/',
    title: 'EmviApp - The Beauty Industry\'s Missing Piece',
    meta_desc: '',
    h1: 'Find Your Dream Beauty Job',
    type: 'homepage'
  },
  {
    url: '/jobs',
    title: 'Beauty Jobs & Opportunities | EmviApp',
    meta_desc: '',
    h1: 'Beauty Industry Jobs',
    type: 'listing'
  },
  {
    url: '/salons',
    title: 'Beauty Salons & Businesses | EmviApp',
    meta_desc: '',
    h1: 'Find Beauty Salons',
    type: 'listing'
  },
  {
    url: '/artists',
    title: 'Beauty Artists & Professionals | EmviApp',
    meta_desc: '',
    h1: 'Hire Beauty Professionals',
    type: 'listing'
  }
];

async function checkAIAvailability() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || !includeAI) {
    console.log('ℹ️ OpenAI not configured or not requested - skipping AI recommendations');
    return false;
  }
  
  console.log('✅ OpenAI API key found');
  return true;
}

async function generateAIMetaDescription(page) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `Write a compelling 150-character meta description for a beauty industry job platform page:
Page: ${page.url}
Title: ${page.title}
Focus: ${page.type}
Target audience: Beauty professionals and salon owners`
        }],
        max_tokens: 100,
        temperature: 0.7
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.choices[0].message.content.trim().replace(/"/g, '');
    }
  } catch (error) {
    console.warn(`⚠️ AI generation failed for ${page.url}: ${error.message}`);
  }
  
  return null;
}

function runBasicSEOChecks(pages) {
  const issues = [];
  const recommendations = [];
  
  for (const page of pages) {
    // Title length check
    if (page.title.length > 60) {
      issues.push({
        page: page.url,
        type: 'Title Too Long',
        current: `${page.title.length} characters`,
        recommendation: 'Shorten to under 60 characters',
        priority: 'Medium'
      });
    }
    
    if (page.title.length < 30) {
      issues.push({
        page: page.url,
        type: 'Title Too Short',
        current: `${page.title.length} characters`,
        recommendation: 'Expand to 30-60 characters with more keywords',
        priority: 'Medium'
      });
    }
    
    // Meta description check
    if (!page.meta_desc || page.meta_desc.length === 0) {
      issues.push({
        page: page.url,
        type: 'Missing Meta Description',
        current: 'None',
        recommendation: 'Add 150-160 character meta description',
        priority: 'High'
      });
    }
    
    // H1 check
    if (!page.h1) {
      issues.push({
        page: page.url,
        type: 'Missing H1',
        current: 'None',
        recommendation: 'Add descriptive H1 tag',
        priority: 'High'
      });
    }
    
    // Basic recommendations per page type
    if (page.type === 'homepage') {
      recommendations.push({
        page: page.url,
        category: 'Homepage Optimization',
        suggestions: [
          'Add structured data (Organization schema)',
          'Include key statistics (job count, user count)',
          'Optimize for "beauty industry jobs" keyword',
          'Add clear value proposition'
        ]
      });
    } else if (page.type === 'listing') {
      recommendations.push({
        page: page.url,
        category: 'Listing Page Optimization',
        suggestions: [
          'Add location-based keywords',
          'Implement faceted navigation',
          'Add job/listing counts',
          'Include recent activity indicators'
        ]
      });
    }
  }
  
  return { issues, recommendations };
}

function generateOrphanPageChecks() {
  return [
    {
      type: 'Orphan Pages Check',
      description: 'Pages not linked from main navigation',
      recommendation: 'Audit sitemap vs internal links to identify orphan pages',
      priority: 'Medium'
    },
    {
      type: 'Duplicate Content Check',
      description: 'Similar pages competing for same keywords',
      recommendation: 'Review job listing pages for duplicate content patterns',
      priority: 'Medium'
    }
  ];
}

async function generateReport(issues, recommendations, aiMetaDescriptions) {
  const report = `# 🎯 SEO Recommendations Report - ${today}

## 📊 Executive Summary

**Site**: https://www.emvi.app  
**Report Date**: ${new Date().toLocaleDateString()}  
**Issues Found**: ${issues.length}  
**AI Assistance**: ${includeAI ? 'Enabled' : 'Disabled'}

## 🚨 Issues Found (${issues.length})

${issues.length === 0 ? '✅ No issues found!' : issues.map(issue => 
  `### ${issue.page} - ${issue.type}
- **Current**: ${issue.current}
- **Recommendation**: ${issue.recommendation}
- **Priority**: ${issue.priority}`
).join('\n\n')}

## 💡 Page-Specific Recommendations

${recommendations.map(rec => 
  `### ${rec.page} - ${rec.category}
${rec.suggestions.map(s => `- ${s}`).join('\n')}`
).join('\n\n')}

## 🤖 AI-Generated Meta Descriptions
${includeAI && aiMetaDescriptions.length > 0 ? 
  aiMetaDescriptions.map(meta => 
    `### ${meta.page}
\`\`\`
${meta.description}
\`\`\`
**Length**: ${meta.description ? meta.description.length : 0} characters`
  ).join('\n\n') : 
  '⚠️ AI meta descriptions not generated (use --include-ai flag or configure OPENAI_API_KEY)'
}

## 📋 Technical SEO Checklist

### Critical Items
- [ ] All pages have unique titles (30-60 characters)
- [ ] All pages have meta descriptions (150-160 characters)  
- [ ] Every page has one H1 tag
- [ ] Images have alt attributes
- [ ] Site has XML sitemap

### Schema Markup
- [ ] Organization schema on homepage
- [ ] JobPosting schema on job pages
- [ ] LocalBusiness schema on salon pages
- [ ] BreadcrumbList for navigation

### Performance
- [ ] Core Web Vitals passing
- [ ] Mobile-friendly design
- [ ] Fast loading times (<3s)
- [ ] Proper caching headers

## 🎯 Priority Actions

### This Week
1. Fix any missing meta descriptions
2. Ensure all pages have proper H1 tags
3. Add Organization schema to homepage
4. Check for broken internal links

### This Month  
1. Create location-specific landing pages
2. Add JobPosting schema to job listings
3. Optimize Core Web Vitals
4. Build internal linking structure

### Ongoing
1. Monitor keyword rankings
2. Create fresh content regularly
3. Build quality backlinks
4. Track user engagement metrics

---
*Generated by EmviApp SEO Agent on ${new Date().toLocaleString()}*
`;

  await fs.mkdir(reportsDir, { recursive: true });
  await fs.writeFile(outputFile, report);
  
  return outputFile;
}

async function main() {
  console.log('🎯 SEO Recommendations Engine (Minimal Version)');
  console.log(`📁 Output: ${outputFile}`);
  
  // Check AI availability
  const aiAvailable = await checkAIAvailability();
  
  // Run basic SEO checks
  console.log('🔍 Running SEO checks...');
  const { issues, recommendations } = runBasicSEOChecks(pages);
  
  // Add orphan page checks
  const orphanChecks = generateOrphanPageChecks();
  issues.push(...orphanChecks);
  
  // Generate AI meta descriptions if available
  let aiMetaDescriptions = [];
  if (aiAvailable) {
    console.log('🤖 Generating AI meta descriptions...');
    for (const page of pages) {
      if (!page.meta_desc) {
        const aiDesc = await generateAIMetaDescription(page);
        if (aiDesc) {
          aiMetaDescriptions.push({
            page: page.url,
            description: aiDesc
          });
        }
        // Small delay between API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // Generate report
  console.log('📝 Generating recommendations report...');
  const reportPath = await generateReport(issues, recommendations, aiMetaDescriptions);
  
  console.log(`✅ SEO recommendations saved to ${reportPath}`);
  console.log(`📊 Summary:`);
  console.log(`   - Issues found: ${issues.length}`);
  console.log(`   - Recommendations: ${recommendations.length}`);
  console.log(`   - AI descriptions: ${aiMetaDescriptions.length}`);
  
  if (issues.filter(i => i.priority === 'High').length > 0) {
    console.log('⚠️ High priority issues found - review report for immediate actions');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ SEO recommendations failed:', error.message);
    process.exit(1);
  });
}