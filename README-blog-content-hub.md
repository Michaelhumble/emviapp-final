# Blog Content Hub - SEO Implementation

## Overview
Added 5 SEO-optimized blog posts to EmviApp for enhanced content marketing and organic traffic:

### Posts Created
1. **Pillar Post**: `nail-salon-growth-2025` - "How to Grow a Nail Salon in the US (2025 Guide)" (~1,800 words)
2. **Supporting Posts**:
   - `hiring-nail-artists` - "How to Hire Nail Artists the Right Way" (~1,000 words)
   - `5-star-reviews` - "How to Get More 5-Star Reviews for Your Salon" (~1,000 words)  
   - `salon-marketing-2025` - "Salon Marketing Strategies That Work in 2025" (~1,000 words)
   - `nail-artists-best-jobs` - "How Nail Artists Can Find the Best Jobs in the US" (~1,000 words)

## SEO Features
- **JSON-LD Article Schema**: Each post includes structured data for Google Rich Results
- **Interlinking Strategy**: Pillar post links to supporting posts; all link back to Jobs/Salons/Artists pages
- **Meta Tags**: Proper og:title, og:description, canonical URLs
- **News Sitemap**: All posts included in `/sitemaps/news.xml` with lastmod timestamps

## File Structure
```
src/pages/blog/
├── nail-salon-growth-2025.tsx    (Pillar post)
├── hiring-nail-artists.tsx
├── 5-star-reviews.tsx
├── salon-marketing-2025.tsx
└── nail-artists-best-jobs.tsx
```

## Adding New Posts

### 1. Create New Post File
```tsx
// src/pages/blog/your-new-slug.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const YourNewPost: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Your Post Title",
    "description": "Your post description",
    "author": {
      "@type": "Person",
      "name": "EmviApp Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp"
    },
    "datePublished": "2025-01-20",
    "dateModified": "2025-01-20"
  };

  return (
    <>
      <Helmet>
        <title>Your Post Title | EmviApp Blog</title>
        <meta name="description" content="Your post description" />
        <link rel="canonical" href="https://www.emvi.app/blog/your-new-slug" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Your Post Title</h1>
        <div className="text-sm text-muted-foreground mb-8">
          By EmviApp Team | January 20, 2025
        </div>
        
        <div className="prose prose-lg max-w-none">
          {/* Your content here */}
        </div>
      </article>
    </>
  );
};

export default YourNewPost;
```

### 2. Add Route to App.tsx
```tsx
<Route path="/blog/your-new-slug" element={<YourNewPost />} />
```

### 3. Update News Sitemap
Add entry to `public/news-sitemap.xml`:
```xml
<url>
  <loc>https://www.emvi.app/blog/your-new-slug</loc>
  <lastmod>2025-01-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Content Guidelines
- **Target Length**: 800-1,500 words for optimal SEO
- **Internal Links**: Always link to relevant Jobs/Salons/Artists pages
- **Keywords**: Focus on beauty industry, nail salon, hiring, marketing terms
- **Vietnamese Context**: Include cultural context where relevant (Vietnamese salon owners, etc.)
- **Call-to-Actions**: Drive traffic to EmviApp job postings and profiles

## Validation Checklist
- [ ] Post loads at `/blog/slug-name`
- [ ] JSON-LD validates in Google Rich Results Test
- [ ] Internal links work correctly
- [ ] Added to news sitemap with proper lastmod
- [ ] Meta tags and canonical URL set
- [ ] Mobile responsive layout