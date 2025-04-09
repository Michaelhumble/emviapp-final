
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useArtistProfileData } from "./artist-profile/hooks/useArtistProfileData";
import ArtistProfileContent from "./artist-profile/ArtistProfileContent";
import ArtistProfileLoading from "./artist-profile/ArtistProfileLoading";
import ArtistProfileError from "./artist-profile/ArtistProfileError";
import ArtistProfileSEO from "@/components/seo/ArtistProfileSEO";

const ArtistPublicProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const {
    profile,
    services,
    portfolioImages,
    viewCount,
    loading,
    error,
    isSalonOwner,
    incrementViewCount
  } = useArtistProfileData(username);
  
  // Increment view count on page load
  useEffect(() => {
    if (profile && !loading) {
      incrementViewCount();
    }
  }, [profile, loading]);
  
  if (loading) {
    return (
      <Layout>
        <ArtistProfileLoading />
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <ArtistProfileError />
      </Layout>
    );
  }

  // Extract portfolio image URLs for SEO
  const portfolioImageUrls = portfolioImages.map(img => img.url);
  
  return (
    <Layout>
      {/* Add SEO component */}
      <ArtistProfileSEO profile={profile} portfolioImages={portfolioImageUrls} />
      
      <ArtistProfileContent
        profile={profile}
        services={services}
        portfolioImages={portfolioImages}
        viewCount={viewCount}
        isSalonOwner={isSalonOwner}
      />
    </Layout>
  );
};

export default ArtistPublicProfile;
