
import { useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import SalonDashboardHeader from "@/components/dashboard/salon/SalonDashboardHeader";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonCreditPromotion from "@/components/dashboard/salon/SalonCreditPromotion";
import SalonReferralPanel from "@/components/dashboard/salon/referral/SalonReferralPanel";
import SalonJobManagement from "@/components/dashboard/salon/SalonJobManagement";
import SalonBookingOverview from "@/components/dashboard/salon/SalonBookingOverview";
import SalonTeamManagement from "@/components/dashboard/salon/SalonTeamManagement";
import SalonServicesManager from "@/components/dashboard/salon/SalonServicesManager";
import SalonFutureFeatures from "@/components/dashboard/salon/SalonFutureFeatures";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";

export default function SalonDashboard() {
  // Debug logging for verification
  useEffect(() => {
    console.log('🟥 TESTING IF THIS IS THE RIGHT FILE - RED BANNER TEST:', new Date().toISOString());
    console.log('🟥 If you see this red banner, we found the right file!');
  }, []);

  return (
    <Layout>
      {/* HUGE RED TEST BANNER */}
      <div className="w-full bg-red-600 text-white py-8 px-6 mb-6 border-4 border-red-800">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold animate-pulse">
            🟥 RED BANNER TEST - IS THIS THE RIGHT FILE? 🟥
          </h1>
          <p className="text-xl mt-4 font-bold">
            If you see this RED BANNER, we found the correct salon dashboard file!
          </p>
          <p className="text-lg mt-2">
            Timestamp: {new Date().toISOString()}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header with Welcome */}
        <SalonDashboardHeader />

        {/* Quick Actions */}
        <SalonDashboardActionButtons />

        {/* Quick Stats Row */}
        <SalonQuickStats />

        {/* Credits & Referral Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalonCreditPromotion />
          <SalonReferralPanel />
        </div>

        {/* Job Management */}
        <SalonJobManagement />

        {/* Booking & Team Management Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalonBookingOverview />
          <SalonTeamManagement />
        </div>

        {/* Services Manager */}
        <SalonServicesManager />

        {/* Future Features Teaser */}
        <SalonFutureFeatures />

        {/* Debug Footer */}
        <Card className="border-red-500 bg-red-100">
          <CardContent className="p-4 text-center">
            <p className="text-lg font-bold text-red-800">
              🟥 RED TEST: If you see this, we're editing the right file! 🟥
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
