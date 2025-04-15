
import React from 'react';
import { ProfileCompletionGuard } from "@/components/profile/guards/ProfileCompletionGuard";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import ArtistPortfolioGallery from '@/components/artist/portfolio/ArtistPortfolioGallery';
import ServiceManager from '@/components/artist/services/ServiceManager';
import BookingCalendar from '@/components/artist/bookings/BookingCalendar';
import AnalyticsDashboard from '@/components/artist/analytics/AnalyticsDashboard';
import ReferralSection from '@/components/artist/referrals/ReferralSection';

export default function ArtistDashboardPage() {
  const { userRole } = useAuth();
  
  return (
    <Layout>
      <ProfileCompletionGuard role={userRole || 'artist'}>
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-serif font-semibold mb-6">Artist Dashboard</h1>
          
          <div className="space-y-8">
            <AnalyticsDashboard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BookingCalendar />
              <ReferralSection />
            </div>
            <ArtistPortfolioGallery />
            <ServiceManager />
          </div>
        </div>
      </ProfileCompletionGuard>
    </Layout>
  );
}
