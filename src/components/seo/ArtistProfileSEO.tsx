
import { Helmet } from "react-helmet";
import { UserProfile } from "@/types/profile";

interface ArtistProfileSEOProps {
  profile: UserProfile;
  portfolioImages?: string[];
}

const ArtistProfileSEO: React.FC<ArtistProfileSEOProps> = ({ profile, portfolioImages = [] }) => {
  // Extract profile data for SEO
  const name = profile.full_name || "";
  const specialty = profile.specialty || "Beauty Professional";
  const location = profile.location || "";
  const username = profile.id || "";
  const avatarUrl = profile.avatar_url || "";

  // Dynamic title tag format: "{name} | {specialty} in {location} — EmviApp"
  const title = `${name} | ${specialty}${location ? ` in ${location}` : ""} — EmviApp`;
  
  // Dynamic meta description
  const description = `View ${name}'s professional beauty profile on EmviApp. Browse their portfolio, services, prices, and book directly online.`;
  
  // Dynamic URL for canonical and OG tags
  const profileUrl = `https://www.emvi.app/u/${username}`;

  // Create JSON-LD structured data for the artist
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "image": avatarUrl,
    "jobTitle": specialty,
    "description": `Professional ${specialty}${location ? ` in ${location}` : ""}. Portfolio, pricing, and online booking available via EmviApp.`,
    "address": location ? {
      "@type": "PostalAddress",
      "addressLocality": location
    } : undefined,
    "url": profileUrl
  };

  // Remove undefined fields from structured data
  const cleanStructuredData = JSON.stringify(structuredData, (key, value) => {
    return value === undefined ? undefined : value;
  });

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={profileUrl} />

      {/* Open Graph Tags for Facebook, LinkedIn */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={`Explore ${name}'s work and book services instantly on EmviApp — the leading platform for beauty professionals.`} />
      {avatarUrl && <meta property="og:image" content={avatarUrl} />}
      <meta property="og:url" content={profileUrl} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${name} | ${specialty}${location ? ` in ${location}` : ""}`} />
      <meta name="twitter:description" content={`Book ${name} on EmviApp. See portfolio, services, and pricing today.`} />
      {avatarUrl && <meta name="twitter:image" content={avatarUrl} />}
      
      {/* Preload the avatar image for performance */}
      {avatarUrl && <link rel="preload" href={avatarUrl} as="image" />}

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">{cleanStructuredData}</script>
      
      {/* SEO keywords in page content */}
      <meta name="keywords" content={`${specialty}, ${name}, ${location}, beauty professional, salon, beauty services, book online, ${specialty.toLowerCase()} portfolio`} />
    </Helmet>
  );
};

export default ArtistProfileSEO;
