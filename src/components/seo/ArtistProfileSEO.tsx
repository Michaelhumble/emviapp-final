
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserProfile, getLocationString } from '@/types/profile';

interface ArtistProfileSEOProps {
  profile: UserProfile;
  portfolioImages: string[];
}

const ArtistProfileSEO: React.FC<ArtistProfileSEOProps> = ({ profile, portfolioImages }) => {
  // Format the title with specialty and location for better SEO
  const title = `Book ${profile.full_name || 'Artist'} – ${profile.specialty || 'Beauty Professional'} in ${profile.location || 'Your Area'} | EmviApp`;
  
  // Create a description from the bio or default text
  const description = profile.bio 
    ? `${profile.full_name}'s professional beauty portfolio. View services, gallery, and book appointments online.`
    : `Professional beauty services by ${profile.full_name || 'a talented artist'}. Browse gallery and book appointments on EmviApp.`;
  
  // Get primary image for social sharing
  const primaryImage = profile.avatar_url || 
    (portfolioImages.length > 0 ? portfolioImages[0] : '');
  
  // Get location for rich results
  const locationString = getLocationString(profile.location);
  
  // Domain for absolute URLs
  const domain = 'https://www.emvi.app';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // Check if profile should be hidden from search engines
  const shouldNoIndex = (profile as any).available_for_hire === false || (profile as any).is_hidden === true;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl || domain} />
      
      {/* Noindex for hidden or unavailable profiles */}
      {shouldNoIndex && <meta name="robots" content="noindex, follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="EmviApp" />
      {primaryImage && <meta property="og:image" content={primaryImage.startsWith('http') ? primaryImage : `${domain}${primaryImage}`} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {primaryImage && <meta name="twitter:image" content={primaryImage.startsWith('http') ? primaryImage : `${domain}${primaryImage}`} />}
      
      {/* Professional information */}
      {locationString && <meta name="geo.placename" content={locationString} />}
      {profile.specialty && (
        <meta name="keywords" content={`${profile.specialty}, beauty professional, nail artist, ${profile.specialty.toLowerCase()} services, beauty services in ${profile.location}`} />
      )}
      
      {/* Structured data for rich results */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": profile.full_name,
          "description": profile.bio,
          "image": primaryImage,
          "url": currentUrl || `${domain}/u/${profile.username || ''}`,
          "jobTitle": profile.specialty,
          ...(profile.specialty ? { "knowsAbout": [profile.specialty] } : {}),
          "worksFor": profile.salon_name || profile.company_name,
          ...(locationString ? {
            "address": {
              "@type": "PostalAddress",
              "addressLocality": locationString
            },
            "areaServed": locationString
          } : {}),
          ...(Array.isArray((profile as any).links) ? { "sameAs": ((profile as any).links as string[]).filter((l) => /^https?:\/\//i.test(l)) } : {}),
          ...(profile.website && /^https?:\/\//i.test(profile.website) ? { "sameAs": [profile.website] } : {})
        })}
      </script>
    </Helmet>
  );
};

export default ArtistProfileSEO;
