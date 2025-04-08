
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useArtistProfileData } from "./artist-profile/hooks/useArtistProfileData";
import ArtistProfileContent from "./artist-profile/ArtistProfileContent";
import ArtistProfileLoading from "./artist-profile/ArtistProfileLoading";
import ArtistProfileError from "./artist-profile/ArtistProfileError";

const ArtistPublicProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const {
    profile,
    services,
    portfolioImages,
    viewCount,
    loading,
    error,
    isSalonOwner
  } = useArtistProfileData(username);
  
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
  
  return (
    <Layout>
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
