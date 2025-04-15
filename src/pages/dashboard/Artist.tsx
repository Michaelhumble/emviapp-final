
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { ArtistDataProvider } from "@/components/dashboard/artist/context/ArtistDataContext";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistAvailabilityManager from "@/components/dashboard/artist/ArtistAvailabilityManager";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";

const ArtistDashboardPage = () => {
  return (
    <Layout>
      <ProfileCompletionGuard>
        <ArtistDataProvider>
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <ArtistDashboard />
              <ArtistAvailabilityManager />
            </div>
          </div>
        </ArtistDataProvider>
      </ProfileCompletionGuard>
    </Layout>
  );
};

export default ArtistDashboardPage;
