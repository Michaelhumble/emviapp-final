import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_BASE_URL } from '@/config/seo';

interface Hreflang {
  hrefLang: string;
  href: string;
}

interface BaseSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
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

const BaseSEO: React.FC<BaseSEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  hreflangs = [],
  jsonLd = [],
  type = 'website',
}) => {
  const absCanonical = toAbs(canonical || '/');
  const absOgImage = toAbs(ogImage || '/og-image.jpg');

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {absCanonical && <link rel="canonical" href={absCanonical} />}

      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, follow' : 'index, follow'} />

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      {absCanonical && <meta property="og:url" content={absCanonical} />} 
      {absOgImage && <meta property="og:image" content={absOgImage} />}
      <meta property="og:site_name" content="EmviApp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {absOgImage && <meta name="twitter:image" content={absOgImage} />}
      <meta name="twitter:site" content="@EmviApp" />

      {/* Hreflang alternates */}
      {hreflangs.map((h) => (
        <link key={`${h.hrefLang}-${h.href}`} rel="alternate" hrefLang={h.hrefLang} href={toAbs(h.href)} />
      ))}

      {/* JSON-LD blocks */}
      {jsonLd.map((obj, idx) => (
        <script key={idx} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
};

export default BaseSEO;
