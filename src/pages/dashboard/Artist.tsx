
import React from "react";
import Layout from "@/components/layout/Layout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistRouteGuard from "@/components/auth/ArtistRouteGuard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import ArtistDashboardLayout from "@/components/dashboard/artist/ArtistDashboardLayout";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import ArtistErrorState from "@/components/dashboard/artist/ArtistErrorState";

const ArtistDashboardPage = () => {
  return (
    <Layout>
      <ProfileCompletionProvider>
        <ArtistRouteGuard>
          <ArtistDashboardLayout>
            <FallbackBoundary
              fallback={
                <ArtistErrorState 
                  error={new Error("Something went wrong with the dashboard. Please refresh the page.")} 
                  retryAction={() => window.location.reload()}
                />
              }
            >
              <ArtistDashboard />
            </FallbackBoundary>
          </ArtistDashboardLayout>
        </ArtistRouteGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
