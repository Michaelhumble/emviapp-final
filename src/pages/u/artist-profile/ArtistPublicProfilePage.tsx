
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useArtistProfileData } from "./hooks/useArtistProfileData";
import ArtistProfile from "@/components/artist-profile/ArtistProfile";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const ArtistPublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const isMobile = useIsMobile();
  
  const {
    profile,
    services,
    portfolioImages,
    loading,
    error,
    viewCount,
    incrementViewCount
  } = useArtistProfileData(username);
  
  React.useEffect(() => {
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
        <div className="container max-w-5xl mx-auto py-8 px-4">
          <div className="animate-pulse space-y-8">
            {/* Profile header skeleton */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="h-32 w-32 rounded-full bg-gray-200" />
              <div className="space-y-4 flex-1">
                <div className="h-8 w-64 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </div>
            </div>
            {/* Portfolio skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded" />
                ))}
              </div>
            </div>
            {/* Services skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
          <div className="bg-red-50 p-8 rounded-lg border border-red-100">
            <h2 className="text-2xl font-medium text-red-600 mb-2">Artist Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || "We couldn't find the artist profile you're looking for."}
            </p>
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
      >
        <div className="container max-w-5xl mx-auto py-8 px-4">
          <ArtistProfile 
            profile={profile}
            services={services}
            portfolioImages={portfolioImages}
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default ArtistPublicProfilePage;
