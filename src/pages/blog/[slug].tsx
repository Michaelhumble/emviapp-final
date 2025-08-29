import React, { Suspense } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { getArticleBySlug, getRelatedArticles, BLOG_ARTICLES } from '@/data/blogArticles';
import { extractSlugFromUrl } from '@/utils/blogLinks';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogArticleGrid from '@/components/blog/BlogArticleGrid';
import { Link } from 'react-router-dom';

const BlogArticlePage: React.FC = () => {
  const { slug, category } = useParams<{ slug: string; category: string }>();
  const location = useLocation();
  
  // Try to get slug from params first, then from URL path
  const articleSlug = slug || extractSlugFromUrl(location.pathname);
  
  if (!articleSlug) {
    return <Navigate to="/blog" replace />;
  }
  
  const article = getArticleBySlug(articleSlug);
  
  // Get related articles for this post
  const relatedArticles = article ? getRelatedArticles(article, 4) : [];
  
  if (!article) {
    return (
      <>
        <DynamicSEO
          title="Article Not Found | EmviApp Blog"
          description="The blog article you're looking for could not be found."
          url={`https://www.emvi.app/blog/${articleSlug}`}
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

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: article.title, href: article.url, current: true }
  ];
  
  return (
    <>
      <DynamicSEO
        title={`${article.title} | EmviApp Blog`}
        description={article.description}
        url={`https://www.emvi.app${article.url}`}
        type="article"
        image={article.image}
        author={article.author}
        tags={article.tags}
        canonicalUrl={`https://www.emvi.app${article.url}`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.emvi.app${article.url}`
            },
            "headline": article.title,
            "image": {
              "@type": "ImageObject",
              "url": article.image,
              "width": 1200,
              "height": 630
            },
            "datePublished": article.publishedAt,
            "dateModified": article.publishedAt,
            "wordCount": article.description.split(' ').length * 8, // Estimate based on description
            "author": {
              "@type": "Organization",
              "name": article.author,
              "url": "https://www.emvi.app"
            },
            "publisher": {
              "@type": "Organization",
              "name": "EmviApp",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.emvi.app/logo-512.png",
                "width": 512,
                "height": 512
              }
            },
            "description": article.description,
            "articleSection": article.category,
            "keywords": article.tags.join(", "),
            "inLanguage": "en-US"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.emvi.app"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Blog",
                "item": "https://www.emvi.app/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": article.category,
                "item": `https://www.emvi.app/blog/categories/${article.categorySlug}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": article.title,
                "item": `https://www.emvi.app${article.url}`
              }
            ]
          }
        ]}
      />
      
      <div className="min-h-screen">
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

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <Container className="py-16">
            <div className="border-t border-gray-200 pt-16">
              <h2 className="text-3xl font-bold text-center mb-4">Related Articles</h2>
              <p className="text-gray-600 text-center mb-12">
                Continue exploring {article.category.toLowerCase()} insights and expert tips
              </p>
              <BlogArticleGrid 
                articles={relatedArticles}
                columns={Math.min(Math.max(relatedArticles.length, 1), 4) as 1 | 2 | 3 | 4}
                variant="compact"
              />
            </div>
            
            {/* Internal Links to Other Pages */}
            <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Explore More</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link 
                  to="/jobs"
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Find Jobs</h4>
                  <p className="text-sm text-gray-600">Discover beauty job opportunities</p>
                </Link>
                <Link 
                  to="/salons"
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16l4-2 4 2 4-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Browse Salons</h4>
                  <p className="text-sm text-gray-600">Explore salon opportunities</p>
                </Link>
                <Link 
                  to="/press"
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Press & News</h4>
                  <p className="text-sm text-gray-600">Latest industry coverage</p>
                </Link>
              </div>
            </div>
          </Container>
        )}
      </div>
    </>
  );
};

export default BlogArticlePage;