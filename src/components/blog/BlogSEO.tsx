import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BlogSEOProps {
  title: string;
  description: string;
  canonical: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  tags?: string[];
  featuredImage?: string;
  type?: 'article' | 'blog';
}

const BlogSEO: React.FC<BlogSEOProps> = ({
  title,
  description,
  canonical,
  publishedAt,
  modifiedAt,
  author = 'EmviApp Team',
  tags = [],
  featuredImage,
  type = 'article'
}) => {
  const domain = 'https://www.emvi.app';
  const fullCanonical = canonical.startsWith('http') ? canonical : `${domain}${canonical}`;
  const ogImage = featuredImage || `${domain}/images/blog-default-og.jpg`;

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: fullCanonical,
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: modifiedAt || publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: author,
      url: domain
    },
    publisher: {
      '@type': 'Organization',
      name: 'EmviApp',
      url: domain,
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullCanonical
    },
    ...(featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: featuredImage,
        width: 1200,
        height: 630
      }
    }),
    ...(tags.length > 0 && { keywords: tags.join(', ') })
  };

  // Breadcrumb JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${domain}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: fullCanonical
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="EmviApp" />
      <meta property="og:image" content={ogImage} />
      
      {/* Article specific OG tags */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Tags */}
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}
      <meta name="robots" content="index, follow" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default BlogSEO;