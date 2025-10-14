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
  title = 'EmviApp - The Beauty Industry\'s Missing Piece',
  description = 'Discover premium beauty opportunities, connect with top salons, and grow your career. Join thousands of nail technicians, hair stylists, barbers, and beauty professionals.',
  image = '/emvi-heart-og.png',
  url = 'https://www.emvi.app',
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
  const finalCanonicalUrl = canonicalUrl || url;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`beauty jobs, nail technician, hair stylist, barber jobs, makeup artist, esthetician, massage therapist, salon opportunities, beauty careers, premium beauty platform, ${tags.join(', ')}`} />
      <meta name="author" content={author || 'EmviApp'} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
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
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" href="/emvi-heart-icon.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/emvi-heart-icon.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/emvi-heart-icon.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/emvi-heart-icon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/emvi-heart-icon.png" />
      
      {/* Favicons */}
      <link rel="icon" href="/emvi-heart-icon.png" type="image/png" />
      <link rel="shortcut icon" href="/emvi-heart-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/emvi-heart-icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/emvi-heart-icon.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Safari Pinned Tab */}
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F25C05" />
      
      {/* Theme Colors */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="EmviApp" />
      
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