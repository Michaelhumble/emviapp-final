import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'blog';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  site_name?: string;
  twitter_card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  facebook_app_id?: string;
  structuredData?: object;
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  url,
  image = 'https://emviapp.com/og-image.jpg',
  type = 'article',
  author = 'EmviApp',
  publishedTime,
  modifiedTime,
  tags = [],
  site_name = 'EmviApp',
  twitter_card = 'summary_large_image',
  facebook_app_id = '140586622674265',
  structuredData
}) => {
  const canonical = url;
  const imageUrl = image.startsWith('http') ? image : `https://emviapp.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:locale" content="en_US" />
      {facebook_app_id && <meta property="fb:app_id" content={facebook_app_id} />}
      
      {/* Article specific tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content={twitter_card} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:alt" content={title} />
      <meta property="twitter:site" content="@EmviApp" />
      <meta property="twitter:creator" content="@EmviApp" />

      {/* LinkedIn */}
      <meta property="linkedin:title" content={title} />
      <meta property="linkedin:description" content={description} />
      <meta property="linkedin:image" content={imageUrl} />

      {/* Pinterest */}
      <meta property="pinterest:title" content={title} />
      <meta property="pinterest:description" content={description} />
      <meta property="pinterest:image" content={imageUrl} />

      {/* WhatsApp */}
      <meta property="whatsapp:title" content={title} />
      <meta property="whatsapp:description" content={description} />
      <meta property="whatsapp:image" content={imageUrl} />

      {/* Additional Meta Tags for Better SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="1 days" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://www.facebook.com" />
      <link rel="preconnect" href="https://twitter.com" />
      <link rel="preconnect" href="https://www.linkedin.com" />
      <link rel="preconnect" href="https://pinterest.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
    </Helmet>
  );
};

export default EnhancedSEO;