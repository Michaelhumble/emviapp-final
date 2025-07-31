#!/usr/bin/env node

/**
 * New Article Creation Script
 * Automatically adds a new article to the registry and creates the component file
 * Run with: npm run add-article
 */

import * as fs from 'fs';
import * as path from 'path';
import { BlogValidator } from './validateBlogLinks';

interface NewArticleData {
  title: string;
  description: string;
  author: string;
  category: string;
  categorySlug: string;
  tags: string[];
  image: string;
  featured?: boolean;
  trending?: boolean;
}

class ArticleGenerator {
  private articlesDir = path.join(process.cwd(), 'src/pages/blog/articles');
  private registryFile = path.join(process.cwd(), 'src/data/blogArticles.ts');

  async createArticle(data: NewArticleData): Promise<{ slug: string; componentName: string }> {
    // Generate slug from title
    const slug = this.generateSlug(data.title);
    const componentName = this.slugToComponentName(slug);
    const id = slug; // Use slug as ID for simplicity

    console.log(`🔧 Creating new article: ${data.title}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Component: ${componentName}`);

    // 1. Create the component file
    await this.createComponentFile(componentName, slug, data);

    // 2. Add to registry
    await this.addToRegistry(id, slug, componentName, data);

    // 3. Validate the new article
    await this.validateNewArticle(slug);

    console.log(`✅ Article created successfully!`);
    console.log(`   Component: src/pages/blog/articles/${componentName}.tsx`);
    console.log(`   URL: /blog/${data.categorySlug}/${slug}`);

    return { slug, componentName };
  }

  private async createComponentFile(componentName: string, slug: string, data: NewArticleData): Promise<void> {
    const filePath = path.join(this.articlesDir, `${componentName}.tsx`);
    
    if (fs.existsSync(filePath)) {
      throw new Error(`Component file already exists: ${componentName}.tsx`);
    }

    const componentContent = this.generateComponentTemplate(componentName, slug, data);
    
    fs.writeFileSync(filePath, componentContent, 'utf8');
    console.log(`   📄 Created component file: ${componentName}.tsx`);
  }

  private async addToRegistry(id: string, slug: string, componentName: string, data: NewArticleData): Promise<void> {
    // Read current registry
    const registryContent = fs.readFileSync(this.registryFile, 'utf8');
    
    // Add lazy import
    const importLine = `const ${componentName} = lazy(() => import('@/pages/blog/articles/${componentName}'));`;
    const importSection = registryContent.match(/(\/\/ Lazy load all article components\n)([\s\S]*?)(\n\n\/\/ Central registry)/);
    
    if (!importSection) {
      throw new Error('Could not find import section in registry file');
    }

    const newImportSection = importSection[2] + `\n${importLine}`;
    const updatedRegistryWithImport = registryContent.replace(
      importSection[0],
      `${importSection[1]}${newImportSection}${importSection[3]}`
    );

    // Add to articles array
    const url = `/blog/${data.categorySlug}/${slug}`;
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const articleEntry = `  {
    id: '${id}',
    slug: '${slug}',
    title: '${data.title}',
    description: '${data.description}',
    author: '${data.author}',
    publishedAt: '${currentDate}',
    readTime: '6 min read',
    category: '${data.category}',
    categorySlug: '${data.categorySlug}',
    tags: ${JSON.stringify(data.tags)},
    image: '${data.image}',${data.featured ? '\n    featured: true,' : ''}${data.trending ? '\n    trending: true,' : ''}
    component: ${componentName},
    url: '${url}'
  }`;

    // Find the articles array and add the new entry
    const articleArrayMatch = updatedRegistryWithImport.match(/(export const BLOG_ARTICLES: BlogArticle\[\] = \[\n)([\s\S]*?)(\n\];)/);
    
    if (!articleArrayMatch) {
      throw new Error('Could not find articles array in registry file');
    }

    const newArticleArray = articleArrayMatch[2] + `,\n${articleEntry}`;
    const finalRegistry = updatedRegistryWithImport.replace(
      articleArrayMatch[0],
      `${articleArrayMatch[1]}${newArticleArray}${articleArrayMatch[3]}`
    );

    fs.writeFileSync(this.registryFile, finalRegistry, 'utf8');
    console.log(`   📝 Added to registry: blogArticles.ts`);
  }

  private async validateNewArticle(slug: string): Promise<void> {
    console.log(`   🔍 Validating new article...`);
    
    const validator = new BlogValidator();
    const result = await validator.validateAll();
    
    if (!result.success) {
      console.error(`   ❌ Validation failed for new article ${slug}:`);
      result.errors.forEach(error => console.error(`      ${error}`));
      throw new Error('Article validation failed');
    }
    
    console.log(`   ✅ Validation passed`);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  private slugToComponentName(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  private generateComponentTemplate(componentName: string, slug: string, data: NewArticleData): string {
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import ContinueReadingSection from '@/components/blog/ContinueReadingSection';
import { getArticleBySlug } from '@/data/blogArticles';

const ${componentName} = () => {
  // Get article data from registry
  const registryArticle = getArticleBySlug('${slug}');
  
  if (!registryArticle) {
    return <div>Article not found</div>;
  }

  const article = {
    title: registryArticle.title,
    description: registryArticle.description,
    author: registryArticle.author,
    publishedAt: registryArticle.publishedAt,
    readTime: registryArticle.readTime,
    category: registryArticle.category,
    tags: registryArticle.tags,
    image: registryArticle.image
  };

  return (
    <>
      <DynamicSEO
        title={article.title}
        description={article.description}
        url={\`https://emviapp.com\${registryArticle.url}\`}
        type="article"
        image={article.image}
        author={article.author}
        tags={article.tags}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": \`https://emviapp.com\${registryArticle.url}\`
          },
          "headline": article.title,
          "image": article.image,
          "datePublished": article.publishedAt,
          "author": {
            "@type": "Organization",
            "name": article.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "EmviApp",
            "logo": {
              "@type": "ImageObject",
              "url": "https://emviapp.com/logo.png"
            }
          },
          "description": article.description
        }}
      />

      <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Header Navigation */}
        <Container className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            {/* Article Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {article.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.publishedAt}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {article.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                {article.description}
              </p>

              {/* Author & Top Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div>
                    <p className="font-semibold">{article.author}</p>
                    <p className="text-sm text-muted-foreground">Beauty Industry Experts</p>
                  </div>
                </div>
              </div>

              {/* Top Share/Save Actions */}
              <BlogArticleActions
                articleSlug="${slug}"
                articleTitle={article.title}
                articleUrl={\`https://emviapp.com\${registryArticle.url}\`}
                articleDescription={article.description}
                articleImage={article.image}
                hashtags={article.tags}
                position="top"
                variant="full"
              />

              {/* Hero Image */}
              <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {/* Add your article content here */}
              <p className="text-xl leading-relaxed mb-8 text-muted-foreground">
                This is a placeholder for your article content. Replace this section with your actual article text, 
                images, and formatting. You can use all standard HTML and React components here.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Introduction</h2>
              <p className="mb-6">
                Add your introduction content here...
              </p>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Main Content</h2>
              <p className="mb-6">
                Add your main article content here...
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-200">
                <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Share/Save Actions */}
            <BlogArticleActions
              articleSlug="${slug}"
              articleTitle={article.title}
              articleUrl={\`https://emviapp.com\${registryArticle.url}\`}
              articleDescription={article.description}
              articleImage={article.image}
              hashtags={article.tags}
              position="bottom"
              variant="full"
            />
          </div>
        </Container>

        {/* Continue Reading Section */}
        <ContinueReadingSection 
          currentArticle={registryArticle}
          limit={3}
          title="Continue Reading"
        />
      </article>
    </>
  );
};

export default ${componentName};`;
  }
}

// CLI interface
async function main() {
  console.log('🚀 EmviApp Article Generator\n');

  // For demo purposes, we'll create a sample article
  // In a real scenario, you'd get this data from CLI prompts or a config file
  const sampleArticle: NewArticleData = {
    title: 'Sample New Article: Beauty Trends 2025',
    description: 'Discover the latest beauty trends that will define 2025 and how to incorporate them into your salon business.',
    author: 'EmviApp Team',
    category: 'Trends',
    categorySlug: 'trends',
    tags: ['beauty trends', '2025', 'innovation', 'salon business'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    trending: true
  };

  try {
    const generator = new ArticleGenerator();
    const result = await generator.createArticle(sampleArticle);
    
    console.log('\\n🎉 SUCCESS! New article created and ready to use.');
    console.log('\\nNext steps:');
    console.log('1. Edit the component file to add your actual content');
    console.log('2. Update the image URL with your specific article image');
    console.log('3. Customize the tags and metadata as needed');
    console.log('4. Run npm run validate-blog to ensure everything is working');
    
  } catch (error) {
    console.error('❌ Failed to create article:', error.message);
    process.exit(1);
  }
}

// Export for programmatic use
export { ArticleGenerator };

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Article creation failed:', error);
    process.exit(1);
  });
}