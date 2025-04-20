
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SalonStatsGrid from './components/SalonStatsGrid';
import SalonBoostBanner from './components/SalonBoostBanner';
import SalonAnalyticsCharts from './components/SalonAnalyticsCharts';
import { useSalonInsights } from '@/hooks/useSalonInsights';
import ReferralTracker from '@/components/referral/ReferralTracker';
import SalonBookingsOverview from './bookings/SalonBookingsOverview';

const SalonDashboard = () => {
  const { loading } = useSalonInsights();
  const [activeTab, setActiveTab] = useState("overview");
  const [dataLoaded, setDataLoaded] = useState(false);

  // Set a timeout to ensure loading state doesn't get stuck forever
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dataLoaded) {
        setDataLoaded(true);
      }
    }, 5000); // 5 second timeout as a fallback

    return () => clearTimeout(timer);
  }, [dataLoaded]);

  const handleBoostClick = () => {
    toast.success("Redirecting to salon boost options...");
    // In a real implementation, this would navigate to a boost page
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Mark data as loaded when we change tabs
  useEffect(() => {
    setDataLoaded(true);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <SalonBoostBanner onBoostClick={handleBoostClick} />
      
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="bg-gray-100/50 p-1 rounded-lg w-full">
          <TabsTrigger 
            value="overview" 
            className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="listings" 
            className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
          >
            Listings
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <SalonStatsGrid />
          <SalonAnalyticsCharts loading={loading && !dataLoaded} />
          
          <ReferralTracker />

          <SalonBookingsOverview />
          
          <Card>
            <CardHeader>
              <CardTitle>Salon Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Welcome to your enhanced salon dashboard! Check out the new analytics above.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listings Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your salon listings and job postings here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Salon Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure your salon profile and preferences.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalonDashboard;
