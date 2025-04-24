
import React from "react";
import Layout from "@/components/layout/Layout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistRouteGuard from "@/components/auth/ArtistRouteGuard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import ArtistDashboardLayout from "@/components/dashboard/artist/ArtistDashboardLayout";

const ArtistDashboardPage = () => {
  return (
    <Layout>
      <ProfileCompletionProvider>
        <ArtistRouteGuard>
          <ArtistDashboardLayout>
            <ArtistDashboard />
          </ArtistDashboardLayout>
        </ArtistRouteGuard>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
