
import React from 'react';
import { Helmet } from 'react-helmet';
import { UserProfile, getLocationString } from '@/types/profile';

interface ArtistProfileSEOProps {
  profile: UserProfile;
  portfolioImages: string[];
}

const ArtistProfileSEO: React.FC<ArtistProfileSEOProps> = ({ profile, portfolioImages }) => {
  // Format the title
  const title = `${profile.full_name || 'Artist'} | ${profile.specialty || 'Beauty Professional'} | EmviApp`;
  
  // Create a description from the bio or default text
  const description = profile.bio 
    ? `${profile.full_name}'s professional beauty portfolio. View services, gallery, and book appointments online.`
    : `Professional beauty services by ${profile.full_name || 'a talented artist'}. Browse gallery and book appointments on EmviApp.`;
  
  // Get primary image for social sharing
  const primaryImage = profile.avatar_url || 
    (portfolioImages.length > 0 ? portfolioImages[0] : '');
  
  // Get location for rich results
  const locationString = getLocationString(profile.location);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {primaryImage && <meta property="og:image" content={primaryImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {primaryImage && <meta name="twitter:image" content={primaryImage} />}
      
      {/* Professional information */}
      {locationString && <meta name="geo.placename" content={locationString} />}
      {profile.specialty && (
        <meta name="keywords" content={`${profile.specialty}, beauty professional, nail artist, ${profile.specialty.toLowerCase()} services`} />
      )}
      
      {/* Structured data for rich results */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": profile.full_name,
          "description": profile.bio,
          "image": primaryImage,
          "url": window.location.href,
          "jobTitle": profile.specialty,
          "worksFor": profile.salon_name || profile.salonName || profile.company_name,
          ...(locationString ? {
            "address": {
              "@type": "PostalAddress",
              "addressLocality": locationString
            }
          } : {})
        })}
      </script>
    </Helmet>
  );
};

export default ArtistProfileSEO;
