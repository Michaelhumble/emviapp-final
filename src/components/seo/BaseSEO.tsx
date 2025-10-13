import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_BASE_URL } from '@/config/seo';
import { buildCanonicalUrl } from '@/components/seo/urlHelpers';

interface Hreflang {
  hrefLang: string;
  href: string;
}

interface BaseSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  noindex?: boolean;
  hreflangs?: Hreflang[];
  jsonLd?: any[]; // Array of JSON-LD objects
  type?: 'website' | 'article' | 'profile' | 'business';
}

const ABS_BASE = SITE_BASE_URL || 'https://www.emvi.app';

const toAbs = (url?: string) => {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${ABS_BASE}${url}`;
  return `${ABS_BASE}/${url}`;
};

const getCleanCanonical = (canonical?: string) => {
  if (!canonical) return buildCanonicalUrl('/');
  
  // If it's already absolute, extract the path and normalize
  if (canonical.startsWith('http')) {
    try {
      const url = new URL(canonical);
      return buildCanonicalUrl(url.pathname);
    } catch {
      return buildCanonicalUrl(canonical);
    }
  }
  
  // For relative URLs, use the helper
  return buildCanonicalUrl(canonical);
};

const BaseSEO: React.FC<BaseSEOProps> = ({
  title = "EmviApp - The Beauty Industry's Missing Piece",
  description = "Discover premium beauty opportunities, connect with top salons, and grow your career. Join thousands of nail technicians, hair stylists, barbers, and beauty professionals.",
  canonical,
  ogImage,
  ogImageWidth = "1200",
  ogImageHeight = "630",
  noindex = false,
  hreflangs = [],
  jsonLd = [],
  type = 'website',
}) => {
  const absCanonical = getCleanCanonical(canonical);
  
  // Enhanced fallback logic for og:image
  const getValidOgImage = (providedImage?: string) => {
    if (providedImage) {
      const absImage = toAbs(providedImage);
      // If it's a valid URL, use it
      if (absImage && (absImage.startsWith('http') || absImage.startsWith('/'))) {
        return absImage;
      }
    }
    // Fallback to EmviApp heart logo
    return toAbs('/emvi-heart-og.png');
  };
  
  const finalOgImage = getValidOgImage(ogImage);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absCanonical} />

      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, follow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absCanonical} /> 
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="EmviApp" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@EmviApp" />
      <meta name="twitter:creator" content="@EmviApp" />

      {/* Hreflang alternates */}
      {hreflangs.map((h) => (
        <link key={`${h.hrefLang}-${h.href}`} rel="alternate" hrefLang={h.hrefLang} href={toAbs(h.href)} />
      ))}

      {/* JSON-LD blocks */}
      {jsonLd.filter(obj => obj && typeof obj === 'object').map((obj, idx) => {
        try {
          // Validate that the object can be stringified
          const jsonString = JSON.stringify(obj);
          return <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonString }} />;
        } catch (error) {
          console.warn('Invalid JSON-LD object skipped:', error, obj);
          return null;
        }
      })}
    </Helmet>
  );
};

export default BaseSEO;