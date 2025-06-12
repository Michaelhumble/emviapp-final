
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
    console.log('🟪 EMVI.APP SALON DASHBOARD REBUILD LOADED - JUNE 2025:', new Date().toISOString());
    console.log('🟪 Dashboard components initialized successfully');
  }, []);

  return (
    <Layout>
      {/* Huge Debug Banner */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 mb-6">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            🟪 EMVI.APP SALON DASHBOARD REBUILD (JUNE 2025) — TESTING LIVE! 🟪
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Timestamp: {new Date().toISOString()} | All Features Active | Mobile Optimized
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
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-purple-700">
              🟪 Debug: Salon Dashboard Rebuild Complete | All Sections Loaded | 
              Components: Header, Stats, Credits, Referrals, Jobs, Bookings, Team, Services, Future Features
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
