// Comprehensive blog audit script
import { BLOG_ARTICLES, validateArticleRegistry } from '@/data/blogArticles';

export const performComprehensiveAudit = () => {
  console.log('🔍 COMPREHENSIVE BLOG AUDIT - Starting full system check...');
  
  // 1. Registry validation
  const registryResult = validateArticleRegistry();
  console.log('📋 Registry Status:', registryResult.valid ? '✅ VALID' : '❌ INVALID');
  if (!registryResult.valid) {
    console.log('❌ Registry Errors:', registryResult.errors);
  }
  
  // 2. Component imports validation
  const componentValidation = BLOG_ARTICLES.map(article => {
    const hasComponent = !!article.component;
    return {
      slug: article.slug,
      title: article.title,
      url: article.url,
      hasComponent,
      status: hasComponent ? '✅ OK' : '❌ MISSING COMPONENT'
    };
  });
  
  console.log('🧩 Component Validation:', componentValidation);
  
  // 3. URL consistency check
  const urlConsistency = BLOG_ARTICLES.map(article => {
    const expectedPattern = `/blog/${article.categorySlug}/${article.slug}`;
    const matches = article.url === expectedPattern;
    return {
      slug: article.slug,
      expected: expectedPattern,
      actual: article.url,
      status: matches ? '✅ CONSISTENT' : '❌ MISMATCH'
    };
  });
  
  console.log('🔗 URL Consistency:', urlConsistency);
  
  // 4. Image validation
  const imageValidation = BLOG_ARTICLES.map(article => {
    const hasValidImage = typeof article.image === 'string' && article.image.length > 0;
    const isImported = !article.image.startsWith('/src/');
    return {
      slug: article.slug,
      image: article.image,
      hasImage: hasValidImage,
      properlyImported: isImported,
      status: hasValidImage && isImported ? '✅ OK' : '❌ ISSUE'
    };
  });
  
  console.log('🖼️ Image Validation:', imageValidation);
  
  // 5. Summary
  const componentIssues = componentValidation.filter(c => !c.hasComponent);
  const urlIssues = urlConsistency.filter(u => u.status.includes('❌'));
  const imageIssues = imageValidation.filter(i => i.status.includes('❌'));
  
  const summary = {
    totalArticles: BLOG_ARTICLES.length,
    componentIssues: componentIssues.length,
    urlIssues: urlIssues.length,
    imageIssues: imageIssues.length,
    overallStatus: componentIssues.length === 0 && urlIssues.length === 0 && imageIssues.length === 0 ? '✅ ALL SYSTEMS OPERATIONAL' : '❌ ISSUES DETECTED'
  };
  
  console.log('📊 AUDIT SUMMARY:', summary);
  
  if (summary.overallStatus.includes('❌')) {
    console.log('🚨 ISSUES DETECTED:');
    if (componentIssues.length > 0) console.log('   Missing Components:', componentIssues.map(c => c.slug));
    if (urlIssues.length > 0) console.log('   URL Mismatches:', urlIssues.map(u => u.slug));
    if (imageIssues.length > 0) console.log('   Image Issues:', imageIssues.map(i => i.slug));
  }
  
  return summary;
};

// Auto-run in development
if (import.meta.env.DEV) {
  performComprehensiveAudit();
}