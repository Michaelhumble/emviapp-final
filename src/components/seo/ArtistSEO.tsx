import React from 'react';
import BaseSEO from './BaseSEO';
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from './jsonld';

interface Artist {
  id: string;
  username: string;
  full_name?: string;
  specialty?: string;
  location?: string;
  bio?: string;
  profile_image?: string;
  portfolio_images?: string[];
  years_experience?: number;
  verified?: boolean;
  created_at?: string;
}

interface ArtistSEOProps {
  artist: Artist;
  baseUrl?: string;
}

const ArtistSEO: React.FC<ArtistSEOProps> = ({ artist, baseUrl = 'https://www.emvi.app' }) => {
  const artistUrl = `${baseUrl}/u/${artist.username}`;
  
  // Create SEO-friendly title with specialty and location
  const title = `${artist.full_name || artist.username}${artist.specialty ? ` - ${artist.specialty}` : ''}${artist.location ? ` in ${artist.location}` : ''} | EmviApp`;
  
  // Generate compelling meta description
  const description = artist.bio 
    ? `${artist.bio.substring(0, 140)}... View portfolio on EmviApp.`
    : `${artist.full_name || artist.username}${artist.specialty ? ` - Professional ${artist.specialty}` : ' - Beauty Professional'}${artist.location ? ` based in ${artist.location}` : ''}${artist.years_experience ? ` with ${artist.years_experience}+ years experience` : ''}. View portfolio and book services on EmviApp.`;
  
  // Get primary profile image with proper fallback
  const getArtistOgImage = () => {
    if (artist.profile_image) return artist.profile_image;
    if (artist.portfolio_images?.[0]) return artist.portfolio_images[0];
    return '/og-artist.jpg'; // Fallback to default artist og image
  };
  
  const ogImage = getArtistOgImage();
  
  // Person JSON-LD for artist profile
  const personJsonLd = buildPersonJsonLd({
    name: artist.full_name || artist.username,
    jobTitle: artist.specialty || 'Beauty Professional',
    location: artist.location,
    bio: artist.bio,
    image: artist.profile_image,
    url: artistUrl,
    sameAs: [`${artistUrl}`], // Add social media links when available
    worksFor: 'Beauty Industry',
    yearsOfExperience: artist.years_experience
  });

  // Breadcrumb for artist profile
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: baseUrl },
    { name: 'Artists', url: `${baseUrl}/artists` },
    ...(artist.specialty ? [{ 
      name: `${artist.specialty} Artists`, 
      url: `${baseUrl}/artists/${artist.specialty.toLowerCase().replace(/\s+/g, '-')}` 
    }] : []),
    { name: artist.full_name || artist.username, url: artistUrl }
  ]);

  return (
    <BaseSEO
      title={title}
      description={description}
      canonical={artistUrl}
      ogImage={ogImage}
      noindex={false}
      jsonLd={[personJsonLd, breadcrumbJsonLd]}
      type="profile"
    />
  );
};

export default ArtistSEO;