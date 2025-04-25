
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useArtistProfileData } from "./artist-profile/hooks/useArtistProfileData";
import ArtistProfileContent from "./artist-profile/ArtistProfileContent";
import ArtistProfileLoading from "./artist-profile/ArtistProfileLoading";
import ArtistProfileError from "./artist-profile/ArtistProfileError";
import ArtistProfileSEO from "@/components/seo/ArtistProfileSEO";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const ArtistPublicProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const isMobile = useIsMobile();
  
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
    
    // Set page title if profile is loaded
    if (profile) {
      document.title = `${profile.full_name} | EmviApp Profile`;
    }
  }, [profile, loading, incrementViewCount]);
  
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
      
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
        className="w-full overflow-x-hidden"
      >
        <ArtistProfileContent
          profile={profile}
          services={services}
          portfolioImages={portfolioImages}
          viewCount={viewCount}
          isSalonOwner={isSalonOwner}
        />
      </motion.div>
    </Layout>
  );
};

export default ArtistPublicProfile;
