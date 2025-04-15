
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { SalonDataProvider } from "@/components/dashboard/salon/context/SalonDataContext";
import SalonDashboard from "@/components/dashboard/salon/SalonDashboard";
import SalonAvailabilityManager from "@/components/dashboard/salon/SalonAvailabilityManager";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";

const SalonDashboardPage = () => {
  return (
    <Layout>
      <ProfileCompletionGuard>
        <SalonDataProvider>
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <SalonDashboard />
              <SalonAvailabilityManager />
            </div>
          </div>
        </SalonDataProvider>
      </ProfileCompletionGuard>
    </Layout>
  );
};

export default SalonDashboardPage;
