import React from 'react';
import { Helmet } from 'react-helmet-async';

interface DynamicSEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'business';
  author?: string;
  publishedTime?: string;
  tags?: string[];
  structuredData?: object;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const DynamicSEO: React.FC<DynamicSEOProps> = ({
  title = 'EmviApp - Premium Beauty Community',
  description = 'Join the most exclusive beauty community. Share your work, learn from pros, and grow your beauty career with EmviApp.',
  image = 'https://emviapp.com/og-image.jpg',
  url,
  type = 'website',
  author,
  publishedTime,
  tags = [],
  structuredData,
  canonicalUrl,
  noIndex = false
}) => {
  const siteName = 'EmviApp';
  const fullTitle = title.includes('EmviApp') ? title : `${title} | ${siteName}`;
  
  // Generate dynamic URL if not provided
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://emviapp.com';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const dynamicUrl = url || `${currentDomain}${currentPath}`;
  const finalCanonicalUrl = canonicalUrl || dynamicUrl;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`beauty, nails, hair, makeup, skincare, community, professionals, ${tags.join(', ')}`} />
      <meta name="author" content={author || 'EmviApp'} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={dynamicUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@EmviApp" />
      <meta name="twitter:creator" content="@EmviApp" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Article-specific tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Schema.org structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSEO;