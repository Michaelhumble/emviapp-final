import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_BASE_URL } from '@/config/seo';

interface ComprehensiveSEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile' | 'business';
  author?: string;
  publishedTime?: string;
  tags?: string[];
  structuredData?: object[];
  canonicalUrl?: string;
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const ComprehensiveSEO: React.FC<ComprehensiveSEOProps> = ({
  title = 'EmviApp - The Beauty Industry\'s Missing Piece',
  description = 'Discover premium beauty opportunities, connect with top salons, and grow your career. Join thousands of nail technicians, hair stylists, barbers, and beauty professionals.',
  image = 'https://www.emvi.app/emvi-heart-og.png',
  type = 'website',
  author,
  publishedTime,
  tags = [],
  structuredData = [],
  canonicalUrl,
  noIndex = false,
  breadcrumbs = []
}) => {
  const location = useLocation();
  const siteName = 'EmviApp';
  const baseUrl = SITE_BASE_URL || 'https://www.emvi.app';
  
  // Ensure title includes site name if not already present
  const fullTitle = title.includes('EmviApp') ? title : `${title} | ${siteName}`;
  
  // Generate canonical URL
  const finalCanonicalUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  
  // Generate absolute image URL
  const absoluteImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  // Generate Organization structured data for all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EmviApp",
    "url": baseUrl,
    "logo": `${baseUrl}/icons/emvi-master-512.png`,
    "sameAs": [
      "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c",
      "https://twitter.com/EmviApp",
      "https://www.linkedin.com/company/emviapp/"
    ],
    "description": "AI-powered platform connecting salons, beauty professionals, and customers through intelligent technology",
    "founder": {
      "@type": "Person",
      "name": "Michael Humble"
    },
    "foundingDate": "2025",
    "industry": "Beauty and Personal Care Technology"
  };

  // Generate breadcrumb structured data if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url.startsWith('http') ? breadcrumb.url : `${baseUrl}${breadcrumb.url}`
    }))
  } : null;

  // Combine all structured data
  const allStructuredData = [
    organizationSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...structuredData
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`beauty jobs, nail technician, hair stylist, barber jobs, makeup artist, esthetician, massage therapist, salon opportunities, beauty careers, premium beauty platform, ${tags.join(', ')}`} />
      <meta name="author" content={author || 'EmviApp'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
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
      {allStructuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default ComprehensiveSEO;