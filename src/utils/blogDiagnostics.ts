// Blog system diagnostic script
// This script validates all blog routes and asset references

import { BLOG_ARTICLES, validateArticleRegistry } from '@/data/blogArticles';

export const runBlogDiagnostics = () => {
  console.log('🔍 BLOG SYSTEM DIAGNOSTICS - Starting validation...');
  
  // 1. Validate article registry
  const registryValidation = validateArticleRegistry();
  console.log('📋 Registry Validation:', registryValidation);
  
  // 2. Check all image imports
  const imageValidation = BLOG_ARTICLES.map(article => {
    const hasValidImage = typeof article.image === 'string' && article.image.length > 0;
    return {
      slug: article.slug,
      imageValid: hasValidImage,
      imageType: typeof article.image,
      imageValue: article.image
    };
  });
  
  console.log('🖼️ Image Asset Validation:', imageValidation);
  
  // 3. Check URL patterns
  const urlValidation = BLOG_ARTICLES.map(article => {
    const expectedPattern = `/blog/${article.categorySlug}/${article.slug}`;
    const urlMatches = article.url === expectedPattern;
    return {
      slug: article.slug,
      expectedUrl: expectedPattern,
      actualUrl: article.url,
      matches: urlMatches
    };
  });
  
  console.log('🔗 URL Pattern Validation:', urlValidation);
  
  // 4. Check for route conflicts
  const slugs = BLOG_ARTICLES.map(a => a.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  console.log('⚠️ Duplicate Slugs:', duplicateSlugs);
  
  // 5. Summary
  const hasErrors = !registryValidation.valid || 
                   imageValidation.some(i => !i.imageValid) || 
                   urlValidation.some(u => !u.matches) || 
                   duplicateSlugs.length > 0;
  
  console.log('✅ BLOG SYSTEM STATUS:', hasErrors ? '❌ ERRORS FOUND' : '✅ ALL SYSTEMS OPERATIONAL');
  
  return {
    registryValid: registryValidation.valid,
    imagesValid: imageValidation.every(i => i.imageValid),
    urlsValid: urlValidation.every(u => u.matches),
    noDuplicates: duplicateSlugs.length === 0,
    overallValid: !hasErrors
  };
};

// Auto-run diagnostics in development
if (import.meta.env.DEV) {
  runBlogDiagnostics();
}