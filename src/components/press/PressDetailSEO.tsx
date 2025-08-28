import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from '@/lib/press';

interface PressDetailSEOProps {
  outlet: Outlet;
  headline: string;
  excerpt?: string;
  canonicalUrl?: string;
  featuredImage?: string;
}

const PressDetailSEO: React.FC<PressDetailSEOProps> = ({
  outlet,
  headline,
  excerpt = '',
  canonicalUrl,
  featuredImage
}) => {
  const baseUrl = 'https://www.emvi.app';
  const pressUrl = canonicalUrl || `${baseUrl}/press/${outlet.key}`;
  const title = `${headline} | ${outlet.name} - EmviApp Press`;
  const description = excerpt || `Read about EmviApp's coverage in ${outlet.name}: ${headline}`;
  const imageUrl = featuredImage || `${baseUrl}/press/${outlet.key}-feature.jpg`;
  
  // NewsArticle JSON-LD Schema
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": headline,
    "description": description,
    "url": pressUrl,
    "datePublished": outlet.dateISO,
    "dateModified": outlet.dateISO,
    "author": {
      "@type": "Organization",
      "name": outlet.name,
      "url": `https://${outlet.domain}`
    },
    "publisher": {
      "@type": "Organization", 
      "name": "EmviApp",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icons/emvi-master-512.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pressUrl
    },
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "isBasedOn": {
      "@type": "NewsArticle",
      "url": outlet.url,
      "name": headline,
      "publisher": {
        "@type": "Organization",
        "name": outlet.name
      }
    },
    "citation": outlet.url,
    "about": [
      {
        "@type": "Thing",
        "name": "Beauty Industry Technology"
      },
      {
        "@type": "Organization", 
        "name": "EmviApp",
        "description": "AI-powered beauty industry platform"
      }
    ]
  };

  // Breadcrumb Schema  
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
        "name": "Press & Media",
        "item": `${baseUrl}/press`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": outlet.name,
        "item": pressUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pressUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pressUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="EmviApp" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Article Meta */}
      <meta property="article:published_time" content={outlet.dateISO} />
      <meta property="article:author" content={outlet.name} />
      <meta property="article:section" content="Press Coverage" />
      <meta property="article:tag" content="EmviApp" />
      <meta property="article:tag" content="Beauty Technology" />
      <meta property="article:tag" content="AI Platform" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(newsArticleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default PressDetailSEO;