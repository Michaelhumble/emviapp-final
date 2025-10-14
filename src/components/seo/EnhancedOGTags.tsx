import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedOGTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'profile' | 'business';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  category?: string;
  siteName?: string;
  locale?: string;
  alternateLocales?: string[];
  twitterHandle?: string;
  facebookAppId?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const EnhancedOGTags: React.FC<EnhancedOGTagsProps> = ({
  title,
  description,
  image = 'https://www.emvi.app/emvi-heart-og.png',
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  category,
  siteName = 'EmviApp',
  locale = 'en_US',
  alternateLocales = [],
  twitterHandle = '@EmviApp',
  facebookAppId,
  canonicalUrl,
  noIndex = false,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630
}) => {
  // Ensure proper title formatting
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Ensure URL is absolute
  const absoluteURL = url.startsWith('http') ? url : `https://emvi.app${url}`;
  const absoluteImage = image.startsWith('http') ? image : `https://emvi.app${image}`;
  const finalCanonicalUrl = canonicalUrl || absoluteURL;
  
  // Generate structured data for articles
  const structuredData = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": absoluteURL
    },
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": absoluteImage,
      "width": imageWidth,
      "height": imageHeight,
      "alt": imageAlt || title
    },
    "author": {
      "@type": "Organization",
      "name": author || siteName
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": "https://emvi.app/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "keywords": tags.join(', '),
    "articleSection": category,
    "url": absoluteURL
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`beauty, salon, nails, hair, makeup, EmviApp, ${tags.join(', ')}`} />
      <meta name="author" content={author || siteName} />
      
      {/* Robots & Indexing */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph Core Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAlt || title} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:url" content={absoluteURL} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Alternate Locales */}
      {alternateLocales.map((altLocale) => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}
      
      {/* Facebook App ID */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
      
      {/* Article-specific Open Graph Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {category && <meta property="article:section" content={category} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt || title} />
      
      {/* Additional Social Media Tags */}
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* LinkedIn specific */}
      <meta property="linkedin:owner" content="EmviApp" />
      
      {/* WhatsApp specific (uses OG tags) */}
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* Schema.org Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData, null, 2)}
        </script>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Preload critical resources */}
      <link rel="preload" href={absoluteImage} as="image" />
      
      {/* DNS Prefetch for social platforms */}
      <link rel="dns-prefetch" href="//www.facebook.com" />
      <link rel="dns-prefetch" href="//platform.twitter.com" />
      <link rel="dns-prefetch" href="//www.linkedin.com" />
      <link rel="dns-prefetch" href="//pinterest.com" />
    </Helmet>
  );
};

export default EnhancedOGTags;