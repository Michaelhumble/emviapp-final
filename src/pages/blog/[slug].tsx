import React, { Suspense } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { getArticleBySlug } from '@/data/blogArticles';
import { extractSlugFromUrl } from '@/utils/blogLinks';
import DynamicSEO from '@/components/seo/DynamicSEO';

const BlogArticlePage: React.FC = () => {
  const { slug, category } = useParams<{ slug: string; category: string }>();
  const location = useLocation();
  
  // Debug the routing
  console.log('🔍 Blog Route Debug:', {
    slug,
    category,
    pathname: location.pathname,
    extractedSlug: extractSlugFromUrl(location.pathname)
  });
  
  // Try to get slug from params first, then from URL path
  const articleSlug = slug || extractSlugFromUrl(location.pathname);
  
  console.log('🎯 Looking for article with slug:', articleSlug);
  
  if (!articleSlug) {
    console.log('❌ No article slug found');
    return <Navigate to="/blog" replace />;
  }
  
  const article = getArticleBySlug(articleSlug);
  console.log('📰 Article lookup result:', article ? `Found: ${article.title}` : 'NOT FOUND');
  
  if (!article) {
    return (
      <>
        <DynamicSEO
          title="Article Not Found | EmviApp Blog"
          description="The blog article you're looking for could not be found."
          url={`https://emvi.app/blog/${articleSlug}`}
          type="website"
        />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
          <Container className="py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Article Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, we couldn't find the article you're looking for.
              </p>
              <div className="space-y-4">
                <a 
                  href="/blog" 
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Back to Blog
                </a>
                <p className="text-sm text-gray-500">
                  Article slug: <code className="bg-gray-100 px-2 py-1 rounded">{articleSlug}</code>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
  
  const ArticleComponent = article.component;
  
  return (
    <>
      <DynamicSEO
        title={`${article.title} | EmviApp Blog`}
        description={article.description}
        url={`https://emvi.app${article.url}`}
        type="article"
        image={article.image}
        author={article.author}
        tags={article.tags}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://emvi.app${article.url}`
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
        }}
      />
      
      <Suspense 
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
            <Container className="py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading article...</p>
              </div>
            </Container>
          </div>
        }
      >
        <ArticleComponent />
      </Suspense>
    </>
  );
};

export default BlogArticlePage;