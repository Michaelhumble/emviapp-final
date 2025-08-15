#!/usr/bin/env node

/**
 * Internal Links Suggestion Engine
 * 
 * Analyzes site content and suggests internal linking opportunities
 * for better topical authority and user navigation.
 * 
 * Usage: node scripts/internal-links-suggest.mjs [--analyze-only] [--max-suggestions=50]
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG = {
  siteUrl: process.env.SITE_URL || 'https://www.emvi.app',
  maxSuggestions: parseInt(process.argv.find(arg => arg.startsWith('--max-suggestions='))?.split('=')[1] || '50'),
  analyzeOnly: process.argv.includes('--analyze-only'),
  outputDir: './reports',
  sitemapUrl: process.env.SITEMAP_URL || 'https://www.emvi.app/sitemap.xml'
};

class InternalLinkSuggester {
  constructor() {
    this.pages = [];
    this.entities = new Map();
    this.linkingOpportunities = [];
    
    // Beauty industry entities and their variations
    this.beautyEntities = {
      'nail technician': ['nail tech', 'nail artist', 'manicurist', 'nail specialist'],
      'hair stylist': ['hairstylist', 'hair artist', 'colorist', 'hair designer'],
      'barber': ['barber shop', 'men\'s grooming', 'hair cutting'],
      'makeup artist': ['mua', 'beauty artist', 'cosmetic artist'],
      'esthetician': ['skincare specialist', 'facial specialist', 'skin therapist'],
      'massage therapist': ['massage', 'bodywork', 'spa therapist'],
      'beauty salon': ['salon', 'beauty shop', 'hair salon'],
      'nail salon': ['nail spa', 'nail studio', 'manicure salon'],
      'spa services': ['spa', 'wellness center', 'beauty spa'],
      'beauty training': ['cosmetology school', 'beauty education', 'training program']
    };
  }

  async init() {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(`🔗 Internal Link Suggestion Engine`);
    console.log(`🎯 Site: ${CONFIG.siteUrl}`);
    console.log(`📊 Max suggestions: ${CONFIG.maxSuggestions}`);
  }

  async fetchSitemap() {
    console.log('🗺️ Fetching sitemap...');
    
    try {
      const response = await fetch(CONFIG.sitemapUrl);
      const sitemapXml = await response.text();
      
      // Extract URLs from sitemap
      const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
      const urls = urlMatches.map(match => 
        match.replace('<loc>', '').replace('</loc>', '').trim()
      ).filter(url => 
        !url.includes('sitemap') && // Skip sitemap index files
        !url.includes('/auth/') && // Skip auth pages
        !url.includes('/dashboard/') // Skip private pages
      );

      console.log(`✅ Found ${urls.length} URLs in sitemap`);
      return urls;
    } catch (error) {
      console.error('❌ Failed to fetch sitemap:', error.message);
      
      // Fallback to default URL structure
      console.log('🔄 Using fallback URL structure');
      return [
        `${CONFIG.siteUrl}/`,
        `${CONFIG.siteUrl}/jobs`,
        `${CONFIG.siteUrl}/salons`,
        `${CONFIG.siteUrl}/artists`,
        `${CONFIG.siteUrl}/blog`,
        `${CONFIG.siteUrl}/nails`,
        `${CONFIG.siteUrl}/hair`,
        `${CONFIG.siteUrl}/barber`,
        `${CONFIG.siteUrl}/massage`,
        `${CONFIG.siteUrl}/makeup`,
        `${CONFIG.siteUrl}/skincare`
      ];
    }
  }

  async analyzePage(url) {
    console.log(`📄 Analyzing: ${url}`);
    
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'EmviApp-LinkAnalyzer/1.0' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const html = await response.text();
      
      // Extract basic content
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const descMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\'][^>]*/i);
      const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
      
      // Extract body text (simplified)
      let bodyText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Limit body text for performance  
      bodyText = bodyText.substring(0, 5000);
      
      // Extract existing internal links
      const linkMatches = html.match(/<a[^>]*href=["\']([^"\']+)["\'][^>]*>([^<]+)<\/a>/gi) || [];
      const existingLinks = linkMatches
        .map(link => {
          const hrefMatch = link.match(/href=["\']([^"\']+)["\']/) ;
          const textMatch = link.match(/>([^<]+)</) ;
          return {
            href: hrefMatch ? hrefMatch[1] : '',
            text: textMatch ? textMatch[1].trim() : ''
          };
        })
        .filter(link => 
          link.href.startsWith('/') || link.href.includes(CONFIG.siteUrl)
        );

      return {
        url,
        title: titleMatch ? titleMatch[1].trim() : '',
        description: descMatch ? descMatch[1].trim() : '',
        h1s: h1Matches.map(h1 => h1.replace(/<[^>]+>/g, '').trim()),
        bodyText,
        existingLinks,
        wordCount: bodyText.split(' ').length,
        status: 'success'
      };
      
    } catch (error) {
      console.warn(`⚠️ Failed to analyze ${url}: ${error.message}`);
      return {
        url,
        status: 'error',
        error: error.message
      };
    }
  }

  async analyzeAllPages(urls) {
    console.log(`🔍 Analyzing ${urls.length} pages...`);
    
    const results = [];
    const batchSize = 5; // Analyze in batches to avoid overwhelming the server
    
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(url => this.analyzePage(url))
      );
      
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + batchSize < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log(`✅ Processed ${Math.min(i + batchSize, urls.length)}/${urls.length} pages`);
    }
    
    this.pages = results.filter(page => page.status === 'success');
    console.log(`📊 Successfully analyzed ${this.pages.length} pages`);
    
    return this.pages;
  }

  identifyEntities() {
    console.log('🏷️ Identifying entity mentions...');
    
    for (const page of this.pages) {
      const pageEntities = new Set();
      const fullText = `${page.title} ${page.description} ${page.h1s.join(' ')} ${page.bodyText}`.toLowerCase();
      
      // Check for each beauty entity and its variations
      for (const [entity, variations] of Object.entries(this.beautyEntities)) {
        const allTerms = [entity, ...variations];
        
        for (const term of allTerms) {
          if (fullText.includes(term.toLowerCase())) {
            pageEntities.add(entity);
            break; // Found this entity, move to next
          }
        }
      }
      
      // Store entities for this page
      if (pageEntities.size > 0) {
        this.entities.set(page.url, Array.from(pageEntities));
      }
    }
    
    console.log(`✅ Identified entities on ${this.entities.size} pages`);
  }

  generateLinkingSuggestions() {
    console.log('💡 Generating linking suggestions...');
    
    const suggestions = [];
    
    for (const sourcePage of this.pages) {
      const sourceEntities = this.entities.get(sourcePage.url) || [];
      
      if (sourceEntities.length === 0) continue;
      
      // Find target pages with related entities
      for (const targetPage of this.pages) {
        if (sourcePage.url === targetPage.url) continue;
        
        const targetEntities = this.entities.get(targetPage.url) || [];
        const commonEntities = sourceEntities.filter(entity => 
          targetEntities.includes(entity)
        );
        
        if (commonEntities.length === 0) continue;
        
        // Check if link already exists
        const existingLink = sourcePage.existingLinks.find(link => 
          link.href === targetPage.url || 
          link.href === targetPage.url.replace(CONFIG.siteUrl, '') ||
          targetPage.url.includes(link.href)
        );
        
        if (existingLink) continue;
        
        // Calculate relevance score
        let score = 0;
        score += commonEntities.length * 10; // Shared entities
        score += targetPage.title.toLowerCase().includes(sourceEntities[0]) ? 5 : 0;
        score += sourcePage.wordCount > 500 ? 3 : 0; // Longer content gets priority
        
        // Suggest anchor text
        const anchorText = this.suggestAnchorText(targetPage, commonEntities[0]);
        
        suggestions.push({
          sourceUrl: sourcePage.url,
          sourceTitle: sourcePage.title,
          targetUrl: targetPage.url,
          targetTitle: targetPage.title,
          commonEntities,
          suggestedAnchor: anchorText,
          relevanceScore: score,
          reasoning: `Shared entities: ${commonEntities.join(', ')}`
        });
      }
    }
    
    // Sort by relevance score and limit
    this.linkingOpportunities = suggestions
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, CONFIG.maxSuggestions);
    
    console.log(`✅ Generated ${this.linkingOpportunities.length} linking suggestions`);
  }

  suggestAnchorText(targetPage, entity) {
    const title = targetPage.title.toLowerCase();
    const h1 = targetPage.h1s[0]?.toLowerCase() || '';
    
    // Try to use natural phrases from the page
    if (title.includes(entity)) {
      return targetPage.title;
    }
    
    if (h1.includes(entity)) {
      return targetPage.h1s[0];
    }
    
    // Fallback to entity-based anchor
    const entityVariations = this.beautyEntities[entity] || [entity];
    return entityVariations[0];
  }

  async generateReports() {
    console.log('📝 Generating reports...');
    
    // Linking opportunities CSV
    const suggestionsCsv = [
      'Source URL,Source Title,Target URL,Target Title,Suggested Anchor,Common Entities,Score,Reasoning',
      ...this.linkingOpportunities.map(s => 
        `"${s.sourceUrl}","${s.sourceTitle}","${s.targetUrl}","${s.targetTitle}","${s.suggestedAnchor}","${s.commonEntities.join(', ')}",${s.relevanceScore},"${s.reasoning}"`
      )
    ].join('\n');

    await fs.writeFile(
      path.join(CONFIG.outputDir, 'internal-links-suggestions.csv'),
      suggestionsCsv
    );

    // Entity mapping JSON
    const entityReport = {
      generated: new Date().toISOString(),
      totalPages: this.pages.length,
      pagesWithEntities: this.entities.size,
      entityDistribution: {},
      linkingSuggestions: this.linkingOpportunities.length
    };

    // Calculate entity distribution
    for (const [url, entities] of this.entities.entries()) {
      for (const entity of entities) {
        entityReport.entityDistribution[entity] = 
          (entityReport.entityDistribution[entity] || 0) + 1;
      }
    }

    await fs.writeFile(
      path.join(CONFIG.outputDir, 'entity-analysis.json'),
      JSON.stringify(entityReport, null, 2)
    );

    // Page analysis summary
    const pageAnalysis = this.pages.map(page => ({
      url: page.url,
      title: page.title,
      wordCount: page.wordCount,
      entities: this.entities.get(page.url) || [],
      existingLinksCount: page.existingLinks.length,
      suggestedLinksCount: this.linkingOpportunities.filter(s => s.sourceUrl === page.url).length
    }));

    await fs.writeFile(
      path.join(CONFIG.outputDir, 'page-analysis.json'),
      JSON.stringify(pageAnalysis, null, 2)
    );

    console.log(`✅ Reports generated:`);
    console.log(`   🔗 ${CONFIG.outputDir}/internal-links-suggestions.csv`);
    console.log(`   🏷️ ${CONFIG.outputDir}/entity-analysis.json`);
    console.log(`   📄 ${CONFIG.outputDir}/page-analysis.json`);

    return entityReport;
  }

  printSummary(entityReport) {
    console.log('\n📊 Internal Linking Analysis Summary:');
    console.log(`   Pages Analyzed: ${this.pages.length}`);
    console.log(`   Pages with Entities: ${entityReport.pagesWithEntities}`);
    console.log(`   Linking Opportunities: ${this.linkingOpportunities.length}`);
    
    console.log('\n🏷️ Top Entities:');
    const sortedEntities = Object.entries(entityReport.entityDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    for (const [entity, count] of sortedEntities) {
      console.log(`   ${entity}: ${count} pages`);
    }
    
    console.log('\n💡 Top Linking Opportunities:');
    this.linkingOpportunities.slice(0, 5).forEach((opp, index) => {
      console.log(`   ${index + 1}. ${opp.sourceTitle} → ${opp.targetTitle}`);
      console.log(`      Anchor: "${opp.suggestedAnchor}" (Score: ${opp.relevanceScore})`);
    });
  }

  async run() {
    try {
      await this.init();
      
      const urls = await this.fetchSitemap();
      
      if (CONFIG.analyzeOnly) {
        console.log('📊 Analysis-only mode - no suggestions will be generated');
      }
      
      await this.analyzeAllPages(urls);
      
      if (this.pages.length === 0) {
        console.log('⚠️ No pages successfully analyzed');
        return;
      }
      
      this.identifyEntities();
      
      if (!CONFIG.analyzeOnly) {
        this.generateLinkingSuggestions();
      }
      
      const entityReport = await this.generateReports();
      this.printSummary(entityReport);
      
    } catch (error) {
      console.error('❌ Internal linking analysis failed:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const suggester = new InternalLinkSuggester();
  suggester.run().catch(console.error);
}

export default InternalLinkSuggester;