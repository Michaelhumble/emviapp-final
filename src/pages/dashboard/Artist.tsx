
import React from "react";
import Layout from "@/components/layout/Layout";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistDashboardLayout from "@/components/dashboard/artist/ArtistDashboardLayout";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import DashboardSessionProvider from "@/components/dashboard/DashboardSessionProvider";

const ArtistDashboardPage = () => {
  return (
    <Layout>
      <ProfileCompletionProvider>
        <DashboardSessionProvider requiredRole={['artist', 'nail technician/artist']}>
          <ArtistDashboardLayout>
            <ArtistDashboard />
          </ArtistDashboardLayout>
        </DashboardSessionProvider>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default ArtistDashboardPage;
