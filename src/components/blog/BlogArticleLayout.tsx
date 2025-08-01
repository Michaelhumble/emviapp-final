import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';
import BlogImage from '@/components/blog/BlogImage';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import DynamicSEO from '@/components/seo/DynamicSEO';

interface BlogArticle {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

interface BlogArticleLayoutProps {
  article: BlogArticle;
  articleSlug: string;
  articleUrl: string;
  children: React.ReactNode;
  backLink?: string;
  backText?: string;
}

const BlogArticleLayout: React.FC<BlogArticleLayoutProps> = ({
  article,
  articleSlug,
  articleUrl,
  children,
  backLink = "/blog",
  backText = "Back to Blog"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
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
        "url": "https://emvi.app/logo.png"
      }
    },
    "description": article.description
  };

  return (
    <>
      <DynamicSEO
        title={article.title}
        description={article.description}
        image={article.image}
        url={articleUrl}
        type="article"
        author={article.author}
        tags={article.tags}
        structuredData={structuredData}
      />

      <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <Container className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link 
                to={backLink}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {backText}
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
                articleSlug={articleSlug}
                articleTitle={article.title}
                articleUrl={articleUrl}
                articleDescription={article.description}
                articleImage={article.image}
                hashtags={article.tags}
                position="top"
                variant="full"
              />

              {/* Hero Image */}
              <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <BlogImage 
                  src={article.image}
                  alt={`${article.title} - EmviApp Blog`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {children}
            </div>

            {/* Bottom Share/Save Actions */}
            <BlogArticleActions
              articleSlug={articleSlug}
              articleTitle={article.title}
              articleUrl={articleUrl}
              articleDescription={article.description}
              articleImage={article.image}
              hashtags={article.tags}
              position="bottom"
              variant="full"
            />
          </div>
        </Container>
      </article>
    </>
  );
};

export default BlogArticleLayout;