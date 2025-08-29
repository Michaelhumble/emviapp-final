# Blog Publishing Guide - EmviApp

## Overview
This guide explains how to publish 5 high-quality blog articles per week using EmviApp's streamlined blog system.

## Quick Start Checklist
✅ Create article component in `src/pages/blog/`  
✅ Add metadata and content  
✅ Register in `src/data/blogArticles.ts`  
✅ Add lazy import to App.tsx routing  
✅ Verify SEO metadata  
✅ Test article loads properly  

## File Structure & Naming

### 1. Article Component Location
```
src/pages/blog/[article-slug].tsx
```

### 2. Slug Naming Convention
- Use kebab-case (lowercase with hyphens)
- Include primary keyword
- Keep under 60 characters
- Examples:
  - `hire-nail-technicians-interview-questions`
  - `salon-marketing-strategies-2025`
  - `beauty-industry-trends-technology`

### 3. Image Assets
```
src/assets/blog/[article-slug]-hero.jpg
```

## Article Component Template

```tsx
import React from 'react';
import { Container } from '@/components/ui/container';
import BaseSEO from '@/components/seo/BaseSEO';
import BlogImage from '@/components/blog/BlogImage';
import heroImage from '@/assets/blog/your-article-slug-hero.jpg';

const YourArticleComponent = () => {
  return (
    <>
      <BaseSEO
        title="Your Article Title (Under 60 chars) | EmviApp Blog"
        description="Your meta description (150-160 characters exactly). Include primary keyword naturally."
        canonical="https://www.emvi.app/blog/your-article-slug"
        type="article"
        image={heroImage}
        author="EmviApp Team"
        tags={["keyword1", "keyword2", "keyword3"]}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container className="py-16">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Article Title Here (Only One H1)
              </h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <span>By EmviApp Team</span>
                <span>•</span>
                <span>Published January 15, 2025</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            {/* Hero Image */}
            <div className="mb-12">
              <BlogImage
                src={heroImage}
                alt="Descriptive alt text with keyword"
                className="rounded-2xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="lead text-xl text-muted-foreground mb-8">
                Your engaging opening paragraph that hooks readers...
              </p>

              <h2>Section Heading (Use H2 for main sections)</h2>
              <p>Your content here...</p>

              <h3>Subsection (Use H3 for subsections)</h3>
              <p>More content...</p>

              {/* Call-to-Action */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 my-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Take Action?</h3>
                <p className="mb-6">Connect with top beauty professionals on EmviApp.</p>
                <div className="flex gap-4">
                  <a 
                    href="/jobs" 
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Find Jobs
                  </a>
                  <a 
                    href="/salons" 
                    className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Browse Salons
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Container>
      </div>
    </>
  );
};

export default YourArticleComponent;
```

## Registration Process

### 1. Add to Blog Registry (`src/data/blogArticles.ts`)

Add your article to the `BLOG_ARTICLES` array:

```tsx
{
  id: 'your-article-slug',
  slug: 'your-article-slug', 
  title: 'Your Article Title Here',
  description: 'Your 150-160 character meta description with primary keyword naturally included.',
  author: 'EmviApp Team',
  publishedAt: '2025-01-15', // YYYY-MM-DD format
  readTime: '8 min read',
  category: 'Category Name', // Choose from existing categories
  categorySlug: 'category-slug', // Choose from: hiring-recruitment, salon-management, career-growth, industry-insights, technology, marketing
  tags: ['keyword1', 'keyword2', 'keyword3', 'primary keyword'],
  image: yourArticleHeroImage, // Import at top of file
  featured: true, // Set to true for featured articles
  trending: false, // Set to true if currently trending
  component: lazy(() => import('@/pages/blog/YourArticleComponent')),
  url: '/blog/your-article-slug'
}
```

### 2. Add Route to App.tsx

In the blog routes section, add:

```tsx
const YourArticleComponent = lazy(() => import("@/pages/blog/YourArticleComponent"));

// In routes section:
<Route path="/blog/your-article-slug" element={<Layout><YourArticleComponent /></Layout>} />
```

## Categories Available

| Category | Slug | Focus |
|----------|------|-------|
| Hiring & Recruitment | `hiring-recruitment` | Staffing, interviews, team building |
| Salon Management | `salon-management` | Operations, business growth, systems |
| Career Growth | `career-growth` | Professional development, skills |
| Industry Insights | `industry-insights` | Trends, market analysis, future |
| Technology | `technology` | AI tools, software, innovation |
| Marketing | `marketing` | Social media, promotion, branding |

## SEO Requirements

### Meta Tags (Required)
- **Title**: Under 60 characters, include primary keyword
- **Description**: 150-160 characters exactly, natural keyword usage
- **Canonical**: `https://www.emvi.app/blog/article-slug`
- **Image**: High-quality hero image (1200x630 recommended)

### Content Structure (Required)
- **One H1**: Article title only
- **H2s**: Main section headings (3-5 recommended)
- **H3s**: Subsection headings as needed
- **Word Count**: 1000-2500 words for substantial content
- **Internal Links**: Link to 2-3 other EmviApp pages (jobs, salons, press)

### JSON-LD Structured Data (Auto-generated)
The system automatically generates:
- Article schema with author, publisher, dates
- Breadcrumb navigation
- Word count estimation
- Category and keyword tagging

## Auto-Features

When you add an article properly:

✅ **Auto-appears** in blog index (/blog)  
✅ **Auto-categorized** in category pages  
✅ **Auto-added** to sitemap-blog.xml  
✅ **Auto-generates** JSON-LD structured data  
✅ **Auto-creates** related posts suggestions  
✅ **Auto-optimizes** for mobile and desktop  

## Quality Checklist

Before publishing, verify:

- [ ] Title is compelling and under 60 characters
- [ ] Meta description is exactly 150-160 characters  
- [ ] One H1 tag only (article title)
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Hero image is high-quality and relevant
- [ ] Content is 1000+ words with valuable insights
- [ ] Internal links to EmviApp pages included
- [ ] Call-to-action section included
- [ ] Article loads without errors
- [ ] Mobile responsive design verified

## Publishing Schedule

**Target**: 5 articles per week (Mon-Fri)
- Monday: Industry Insights or Technology
- Tuesday: Hiring & Recruitment  
- Wednesday: Career Growth
- Thursday: Salon Management
- Friday: Marketing or trending topic

## Performance Tracking

Monitor these metrics:
- Page views and engagement time
- Search rankings for target keywords
- Internal link click-through rates
- Social media shares and comments
- Conversion to jobs/salons/artists pages

## Support

For technical issues or questions:
- Check existing articles for examples
- Test in development environment first
- Verify all links work before publishing
- Ensure images load properly across devices

---

**Remember**: Quality over quantity. Each article should provide genuine value to beauty professionals and establish EmviApp as an industry authority.