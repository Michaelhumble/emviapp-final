
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

const sectionHeaderStyle = "text-xl font-bold font-serif mb-4 mt-2 sm:mt-0 sm:mb-6";

const SalonDashboard = () => {
  // VISUAL BANNER FOR IDENTIFICATION
  console.log('🔍 RENDERING: src/components/dashboard/salon/SalonDashboard.tsx');
  
  const { loading } = useSalonInsights();
  const [activeTab, setActiveTab] = useState("overview");
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dataLoaded) {
        setDataLoaded(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dataLoaded]);

  const handleBoostClick = () => {
    toast.success("Redirecting to salon boost options...");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    setDataLoaded(true);
  }, [activeTab]);

  return (
    <>
      {/* VISUAL BANNER FOR IDENTIFICATION */}
      <div className="w-full bg-green-600 text-white text-center py-4 text-xl font-bold">
        🔍 THIS IS src/components/dashboard/salon/SalonDashboard.tsx
      </div>
      
      <div className="space-y-6 px-2 sm:px-4 md:px-6 py-4 md:py-8 max-w-7xl mx-auto">
        <div className="mb-4">
          <SalonBoostBanner onBoostClick={handleBoostClick} />
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="w-full flex flex-wrap gap-1 md:gap-3 bg-muted/50 px-1 py-2 rounded-lg mb-2 md:mb-0">
            <TabsTrigger 
              value="overview" 
              className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm w-[min(130px,32vw)]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm w-[min(130px,32vw)]"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm w-[min(130px,32vw)]"
            >
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm w-[min(130px,32vw)]"
            >
              Services
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm w-[min(130px,32vw)]"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-2">
            <h2 className={`${sectionHeaderStyle}`}>Dashboard Overview</h2>
            <div className="dashboard-section">
              <SalonStatsGrid />
              <SalonAnalyticsCharts loading={loading && !dataLoaded} />
            </div>
            <ReferralTracker />
            <SalonBookingsOverview className="mt-6 rounded-xl" />
            <Card className="mt-6 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle>Salon Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Welcome to your enhanced salon dashboard! Check out the new analytics above.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings" className="pt-4">
            <h2 className={sectionHeaderStyle}>Bookings</h2>
            {/* Wrap bookings table in a horizontally scrollable area for mobile */}
            <div className="w-full overflow-x-auto rounded-lg">
              <SalonBookingsOverview />
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="pt-4">
            <h2 className={sectionHeaderStyle}>Team</h2>
            {/* Assume TeamTab or TeamSection is shown in this slot */}
            <div className="w-full">
              {/* This section is layout only. Placeholders if Team component used */}
              {/* <SalonTeamSection /> */}
              {/* If using another, preserve layout */}
              <div className="rounded-lg bg-white shadow-sm px-2 py-4 md:p-6">
                <div className="text-center text-muted-foreground text-sm">Team management UI goes here.</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="pt-4">
            <h2 className={sectionHeaderStyle}>Services</h2>
            {/* Touch optimized card/list layout */}
            <div className="space-y-6">
              <div className="rounded-lg bg-white shadow-sm px-1 py-3 md:p-4">
                <div className="text-center text-muted-foreground text-sm">Salon services management UI goes here.</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-4">
            <h2 className={sectionHeaderStyle}>Analytics</h2>
            <SalonAnalyticsCharts loading={loading && !dataLoaded} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SalonDashboard;
