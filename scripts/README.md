# EmviApp Blog SEO & Open Graph Audit Tools

This directory contains comprehensive tools for auditing and maintaining perfect Open Graph (OG) tags and social media sharing for the EmviApp blog system.

## 🎯 Quick Start

```bash
# Install dependencies
npm install

# Run comprehensive OG audit
npm run audit:og

# Test social sharing for all articles
npm run test:social

# Validate all blog links
npm run validate:blog

# Add a new article to the system
npm run add:article
```

## 🔍 Available Scripts

### 1. Open Graph Audit (`auditOpenGraph.ts`)
Comprehensive audit of all OG tags across the blog system.

**Checks:**
- ✅ Title length (30-60 characters)
- ✅ Description length (120-160 characters)  
- ✅ Image optimization (1200x630px, HTTPS)
- ✅ URL consistency
- ✅ Missing meta tags
- ✅ Social platform compatibility

**Usage:**
```bash
npm run audit:og
```

### 2. Social Sharing Test (`testSocialSharing.ts`)
Tests all article URLs across major social platforms.

**Platforms Tested:**
- 📘 Facebook (Sharing Debugger)
- 💼 LinkedIn (Post Inspector)
- 🐦 Twitter/X (Card Validator)
- 💬 WhatsApp (Rich Previews)
- 📌 Pinterest (Pin Creation)

**Usage:**
```bash
npm run test:social
```

### 3. Blog Link Validation (`validateBlogLinks.ts`)
Ensures all internal blog links are working correctly.

**Validates:**
- ✅ Registry consistency
- ✅ URL format correctness
- ✅ Component existence
- ✅ Category/slug matching

**Usage:**
```bash
npm run validate:blog
```

### 4. New Article Creation (`addNewArticle.ts`)
Automated script for adding new articles to the system.

**Features:**
- ✅ Auto-generates proper URLs
- ✅ Updates central registry
- ✅ Creates component template
- ✅ Validates OG tags

**Usage:**
```bash
npm run add:article
```

## 🧪 Manual Testing Tools

### Facebook Sharing Debugger
Test how your articles appear on Facebook:
```
https://developers.facebook.com/tools/debug/sharing/?q=[YOUR_ARTICLE_URL]
```

### LinkedIn Post Inspector
Test LinkedIn sharing previews:
```
https://www.linkedin.com/post-inspector/inspect/[YOUR_ARTICLE_URL]
```

### Twitter Card Validator
Validate Twitter card displays:
```
https://cards-dev.twitter.com/validator
```

## 📊 Health Monitoring

### Daily Checks
- Run `npm run audit:og` after any content changes
- Test new articles with `npm run test:social`
- Validate links before deployment with `npm run validate:blog`

### Weekly Maintenance
- Review audit reports for optimization opportunities
- Monitor social sharing performance
- Update OG images for seasonal campaigns

### Before Major Releases
- Run full audit suite
- Test all social sharing URLs manually
- Verify preview cards display correctly
- Check mobile social sharing experience

## 🚀 Optimization Best Practices

### OG Image Guidelines
- **Dimensions:** 1200x630px (Facebook recommended)
- **Format:** JPG or PNG, under 200KB
- **Content:** High-contrast text, EmviApp branding
- **Alt Text:** Descriptive for accessibility

### Title Optimization
- **Length:** 30-60 characters for best display
- **Format:** "Article Title | EmviApp"
- **Keywords:** Include primary topic keywords
- **Avoid:** Clickbait, excessive punctuation

### Description Guidelines
- **Length:** 120-160 characters
- **Style:** Compelling but informative
- **CTA:** Include subtle call-to-action
- **Keywords:** Natural keyword integration

### URL Structure
- **Format:** `/blog/[category]/[article-slug]`
- **Consistency:** Match registry exactly
- **SEO-friendly:** Hyphenated, lowercase
- **Canonical:** Always use absolute URLs

## 🔧 Troubleshooting

### Common Issues

**OG Image Not Displaying:**
1. Check image URL is HTTPS
2. Verify image exists and loads
3. Test with Facebook Debugger
4. Clear social platform cache

**Title/Description Cut Off:**
1. Check character limits
2. Test on all platforms
3. Optimize for shortest limit
4. Use platform debuggers

**Share Button Not Working:**
1. Verify absolute URLs
2. Check URL encoding
3. Test social platform APIs
4. Validate OG tags

**Poor Preview Quality:**
1. Upgrade image resolution
2. Add proper alt text
3. Optimize for mobile
4. Test loading speed

## 📈 Performance Metrics

Track these KPIs to measure OG success:

- **Social Shares:** Monitor sharing frequency
- **Click-through Rate:** From social platforms
- **Engagement Time:** On shared articles
- **Preview Quality Score:** From audit tools
- **Error Rate:** Broken or missing previews

## 🎯 Success Criteria

**Perfect Article Checklist:**
- ✅ 100% OG audit score
- ✅ All social platforms showing rich previews
- ✅ Zero broken internal links
- ✅ Mobile-optimized sharing experience
- ✅ Fast loading preview images (<2 seconds)
- ✅ Brand-consistent appearance across platforms

---

🏆 **Goal:** Achieve 100% OG compliance across all blog articles with zero broken social sharing links.

💡 **Tip:** Run these scripts in your CI/CD pipeline to catch issues before they reach production!