import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
  baseUrl?: string;
  type?: 'Article' | 'BlogPosting' | 'NewsArticle';
}

const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  url,
  image,
  category,
  tags = [],
  readingTime,
  baseUrl = 'https://www.emvi.app',
  type = 'Article'
}) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "headline": title,
    "description": description,
    "image": image || `${baseUrl}/og-default.jpg`,
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${baseUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icons/emvi-master-512.png`,
        "width": 512,
        "height": 512
      },
      "url": baseUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
    "articleSection": category || "Beauty Industry",
    "keywords": tags.join(', '),
    "wordCount": readingTime ? readingTime * 200 : undefined, // Estimate 200 words per minute
    "timeRequired": readingTime ? `PT${readingTime}M` : undefined,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "about": {
      "@type": "Thing",
      "name": "Beauty Industry",
      "description": "Professional beauty services, salon management, and career development"
    },
    "mentions": [
      {
        "@type": "Thing", 
        "name": "Beauty Professionals"
      },
      {
        "@type": "Thing",
        "name": "Salon Management"
      },
      {
        "@type": "Thing",
        "name": "Beauty Careers"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Beauty Professionals, Salon Owners, Beauty Students"
    }
  };

  // Add breadcrumb if this is a blog post
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog", 
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": url
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default ArticleStructuredData;