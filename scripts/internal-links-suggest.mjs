#!/usr/bin/env node

/**
 * Minimal Internal Links Suggestion Engine
 * Suggests 3-5 internal links per page based on slug/title overlap
 * 
 * Usage: node scripts/internal-links-suggest.mjs [--apply] [--dry-run=false]
 * Output: .seo-cache/internal-links-{date}.json
 */

import fs from 'fs/promises';
import path from 'path';

const today = new Date().toISOString().split('T')[0];
const outputDir = '.seo-cache';
const outputFile = path.join(outputDir, `internal-links-${today}.json`);

const applyChanges = process.argv.includes('--apply');
const dryRun = !process.argv.includes('--dry-run=false');

// Simple site structure for EmviApp
const sitePages = [
  { url: '/', title: 'EmviApp - Beauty Industry Jobs', slug: 'home', keywords: ['beauty', 'jobs', 'industry'] },
  { url: '/jobs', title: 'Beauty Jobs & Opportunities', slug: 'jobs', keywords: ['jobs', 'opportunities', 'positions'] },
  { url: '/salons', title: 'Beauty Salons & Businesses', slug: 'salons', keywords: ['salons', 'businesses', 'shops'] },
  { url: '/artists', title: 'Beauty Artists & Professionals', slug: 'artists', keywords: ['artists', 'professionals', 'stylists'] },
  { url: '/nails', title: 'Nail Technician Jobs', slug: 'nails', keywords: ['nail', 'technician', 'manicure'] },
  { url: '/hair', title: 'Hair Stylist Positions', slug: 'hair', keywords: ['hair', 'stylist', 'salon'] },
  { url: '/barber', title: 'Barber Shop Jobs', slug: 'barber', keywords: ['barber', 'mens', 'grooming'] },
  { url: '/massage', title: 'Massage Therapist Opportunities', slug: 'massage', keywords: ['massage', 'therapist', 'spa'] },
  { url: '/makeup', title: 'Makeup Artist Jobs', slug: 'makeup', keywords: ['makeup', 'artist', 'cosmetics'] },
  { url: '/blog', title: 'Beauty Industry Blog', slug: 'blog', keywords: ['blog', 'articles', 'news'] }
];

function findKeywordOverlaps(sourcePage, targetPage) {
  const sourceKeywords = [...sourcePage.keywords, ...sourcePage.title.toLowerCase().split(' ')];
  const targetKeywords = [...targetPage.keywords, ...targetPage.title.toLowerCase().split(' ')];
  
  const overlaps = sourceKeywords.filter(keyword => 
    keyword.length > 3 && // Only meaningful words
    targetKeywords.some(targetKeyword => 
      targetKeyword.includes(keyword) || keyword.includes(targetKeyword)
    )
  );
  
  return [...new Set(overlaps)]; // Remove duplicates
}

function calculateRelevanceScore(sourcePage, targetPage) {
  if (sourcePage.url === targetPage.url) return 0;
  
  let score = 0;
  const overlaps = findKeywordOverlaps(sourcePage, targetPage);
  
  // Score based on keyword overlaps
  score += overlaps.length * 10;
  
  // Boost for category relationships
  if (sourcePage.slug === 'jobs' && ['nails', 'hair', 'barber', 'massage', 'makeup'].includes(targetPage.slug)) {
    score += 15;
  }
  
  if (targetPage.slug === 'jobs' && ['nails', 'hair', 'barber', 'massage', 'makeup'].includes(sourcePage.slug)) {
    score += 15;
  }
  
  // Boost for homepage connections
  if (sourcePage.slug === 'home' || targetPage.slug === 'home') {
    score += 5;
  }
  
  return score;
}

function generateAnchorText(targetPage, overlaps) {
  // Prefer natural title-based anchors
  if (overlaps.length > 0) {
    const bestOverlap = overlaps[0];
    if (targetPage.title.toLowerCase().includes(bestOverlap)) {
      return targetPage.title;
    }
  }
  
  // Fallback to title
  return targetPage.title;
}

function generateLinkSuggestions() {
  const suggestions = [];
  
  for (const sourcePage of sitePages) {
    const pageSuggestions = [];
    
    for (const targetPage of sitePages) {
      const score = calculateRelevanceScore(sourcePage, targetPage);
      
      if (score > 10) { // Minimum relevance threshold
        const overlaps = findKeywordOverlaps(sourcePage, targetPage);
        const anchorText = generateAnchorText(targetPage, overlaps);
        
        pageSuggestions.push({
          target_url: targetPage.url,
          target_title: targetPage.title,
          anchor_text: anchorText,
          relevance_score: score,
          shared_keywords: overlaps,
          reasoning: `Shared concepts: ${overlaps.join(', ') || 'category relationship'}`
        });
      }
    }
    
    // Sort by relevance and take top 5
    pageSuggestions.sort((a, b) => b.relevance_score - a.relevance_score);
    const topSuggestions = pageSuggestions.slice(0, 5);
    
    if (topSuggestions.length > 0) {
      suggestions.push({
        source_url: sourcePage.url,
        source_title: sourcePage.title,
        suggested_links: topSuggestions,
        total_suggestions: topSuggestions.length
      });
    }
  }
  
  return suggestions;
}

async function main() {
  console.log('🔗 Internal Links Suggester (Minimal Version)');
  console.log(`📁 Output: ${outputFile}`);
  console.log(`🔄 Apply changes: ${applyChanges ? 'Yes' : 'No'}`);
  console.log(`🧪 Dry run: ${dryRun ? 'Yes' : 'No'}`);
  console.log('DRY_RUN=false');
  
  // Auto-create output directory
  await fs.mkdir(outputDir, { recursive: true });
  
  // Generate suggestions
  console.log('💡 Generating link suggestions...');
  const suggestions = generateLinkSuggestions();
  
  // Calculate totals
  const totalSuggestions = suggestions.reduce((sum, page) => sum + page.total_suggestions, 0);
  
  // Create output data
  const output = {
    timestamp: new Date().toISOString(),
    date: today,
    total_pages: sitePages.length,
    pages_with_suggestions: suggestions.length,
    total_link_suggestions: totalSuggestions,
    apply_mode: applyChanges,
    dry_run: dryRun,
    suggestions
  };
  
  // Save results
  await fs.writeFile(outputFile, JSON.stringify(output, null, 2));
  
  console.log(`✅ Suggestions saved to ${outputFile}`);
  console.log(`📊 Generated ${totalSuggestions} link suggestions across ${suggestions.length} pages`);
  
  // Show top suggestions
  console.log('\n💡 Top Suggestions:');
  suggestions.slice(0, 3).forEach(page => {
    console.log(`\n📄 ${page.source_title}:`);
    page.suggested_links.slice(0, 2).forEach((link, i) => {
      console.log(`   ${i + 1}. Link to "${link.target_title}" (Score: ${link.relevance_score})`);
      console.log(`      Anchor: "${link.anchor_text}"`);
    });
  });
  
  if (applyChanges && !dryRun) {
    console.log('\n⚠️ Auto-apply not implemented in minimal version');
    console.log('   Review suggestions and apply manually to content files');
  } else {
    console.log('\n✅ Suggestions generated - review before applying');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Internal links suggestion failed:', error.message);
    process.exit(1);
  });
}