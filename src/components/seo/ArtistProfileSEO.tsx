
import React from "react";
import { Helmet } from "react-helmet";
import { UserProfile } from "@/types/profile";

interface ArtistProfileSEOProps {
  profile: UserProfile;
  portfolioImages: string[];
}

const ArtistProfileSEO: React.FC<ArtistProfileSEOProps> = ({ profile, portfolioImages }) => {
  const title = `${profile.full_name || 'Artist'} - ${profile.specialty || 'Beauty Professional'} | EmviApp`;
  const description = profile.bio ? 
    `${profile.bio.substring(0, 160)}${profile.bio.length > 160 ? '...' : ''}` : 
    `View ${profile.full_name || 'this artist'}'s professional portfolio and services on EmviApp. Book appointments directly.`;

  // Get the first portfolio image for og:image if available
  const imageUrl = portfolioImages && portfolioImages.length > 0 ? 
    portfolioImages[0] : 
    profile.avatar_url || '';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Additional profile metadata */}
      {profile.location && <meta name="geo.placename" content={profile.location} />}
      {profile.specialty && <meta name="profile:profession" content={profile.specialty} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${window.location.origin}/a/${profile.instagram || profile.id}`} />
    </Helmet>
  );
};

export default ArtistProfileSEO;
