#!/usr/bin/env node

/**
 * 🎯 Content Optimization Audit
 * Analyzes and fixes content quality issues across EmviApp
 */

import fs from 'fs/promises';
import path from 'path';

const AUDIT_CONFIG = {
  minTitleLength: 30,
  maxTitleLength: 65,
  minDescLength: 120,
  maxDescLength: 160,
  minContentLength: 300,
  targetKeywordDensity: 2, // 2%
  maxKeywordDensity: 5    // 5%
};

class ContentOptimizer {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  // Analyze page content quality
  analyzeContent(pageData) {
    const analysis = {
      title: this.analyzeTitle(pageData.title),
      description: this.analyzeDescription(pageData.description),
      content: this.analyzeContentLength(pageData.content),
      keywords: this.analyzeKeywords(pageData.content, pageData.targetKeywords),
      headings: this.analyzeHeadings(pageData.headings),
      issues: []
    };

    return analysis;
  }

  analyzeTitle(title) {
    if (!title) return { valid: false, issue: 'Missing title' };
    if (title.length < AUDIT_CONFIG.minTitleLength) {
      return { valid: false, issue: `Title too short: ${title.length} chars` };
    }
    if (title.length > AUDIT_CONFIG.maxTitleLength) {
      return { valid: false, issue: `Title too long: ${title.length} chars` };
    }
    return { valid: true, length: title.length };
  }

  analyzeDescription(description) {
    if (!description) return { valid: false, issue: 'Missing meta description' };
    if (description.length < AUDIT_CONFIG.minDescLength) {
      return { valid: false, issue: `Description too short: ${description.length} chars` };
    }
    if (description.length > AUDIT_CONFIG.maxDescLength) {
      return { valid: false, issue: `Description too long: ${description.length} chars` };
    }
    return { valid: true, length: description.length };
  }

  analyzeContentLength(content) {
    const textLength = content ? content.replace(/<[^>]*>/g, '').length : 0;
    if (textLength < AUDIT_CONFIG.minContentLength) {
      return { valid: false, issue: `Content too short: ${textLength} chars` };
    }
    return { valid: true, length: textLength };
  }

  analyzeKeywords(content, keywords) {
    if (!content || !keywords) return { valid: true };
    
    const analysis = {};
    keywords.forEach(keyword => {
      const density = this.calculateKeywordDensity(content, keyword);
      analysis[keyword] = {
        density,
        optimal: density >= AUDIT_CONFIG.targetKeywordDensity && density <= AUDIT_CONFIG.maxKeywordDensity
      };
    });

    return analysis;
  }

  calculateKeywordDensity(content, keyword) {
    const text = content.toLowerCase().replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const matches = (text.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    return words > 0 ? (matches / words) * 100 : 0;
  }

  analyzeHeadings(headings) {
    if (!headings || !Array.isArray(headings)) return { valid: true };
    
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) return { valid: false, issue: 'Missing H1 tag' };
    if (h1Count > 1) return { valid: false, issue: `Multiple H1 tags: ${h1Count}` };
    
    return { valid: true, h1Count, totalHeadings: headings.length };
  }

  // Generate content improvement suggestions
  generateSuggestions(analysis, pageUrl) {
    const suggestions = [];

    if (!analysis.title.valid) {
      suggestions.push({
        type: 'title',
        priority: 'high',
        issue: analysis.title.issue,
        suggestion: `Optimize title tag for ${pageUrl}`
      });
    }

    if (!analysis.description.valid) {
      suggestions.push({
        type: 'description', 
        priority: 'high',
        issue: analysis.description.issue,
        suggestion: `Write compelling 120-160 char meta description for ${pageUrl}`
      });
    }

    if (!analysis.content.valid) {
      suggestions.push({
        type: 'content',
        priority: 'medium',
        issue: analysis.content.issue,
        suggestion: `Add more valuable content to ${pageUrl} (target 500+ words)`
      });
    }

    return suggestions;
  }
}

export default ContentOptimizer;