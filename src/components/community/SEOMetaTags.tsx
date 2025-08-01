import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title = 'EmviApp - Premium Beauty Community',
  description = 'Join the most exclusive beauty community. Share your work, learn from pros, and grow your beauty career with EmviApp.',
  image = 'https://emvi.app/og-image.jpg',
  url = 'https://emvi.app',
  type = 'website',
  author,
  publishedTime,
  tags = []
}) => {
  const siteName = 'EmviApp';
  const fullTitle = title.includes('EmviApp') ? title : `${title} | ${siteName}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`beauty, nails, hair, makeup, skincare, community, professionals, ${tags.join(', ')}`} />
      <meta name="author" content={author || 'EmviApp'} />
      
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
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": fullTitle,
          "description": description,
          "image": image,
          "url": url,
          "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
              "@type": "ImageObject",
              "url": "https://emvi.app/logo.png"
            }
          },
          ...(type === 'article' && author && {
            "author": {
              "@type": "Person",
              "name": author
            }
          }),
          ...(publishedTime && {
            "datePublished": publishedTime
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEOMetaTags;