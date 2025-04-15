
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useArtistDashboardData } from './hooks/useArtistDashboardData';
import AnalyticsWidget from './components/AnalyticsWidget';
import WeeklyCalendar from './calendar/WeeklyCalendar';
import ServicesManager from './services/ServicesManager';
import ArtistPortfolioManager from './portfolio/ArtistPortfolioManager';
import ReferralWidget from './components/ReferralWidget';
import EarningsSection from './components/EarningsSection';
import MainGrid from './components/MainGrid';

const ArtistDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    earningsData,
    isLoadingEarnings
  } = useArtistDashboardData(activeTab);

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="overview" 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
          <TabsTrigger value="calendar" className="py-3">Calendar</TabsTrigger>
          <TabsTrigger value="services" className="py-3">Services</TabsTrigger>
          <TabsTrigger value="earnings" className="py-3">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <MainGrid 
            bookings={recentBookings}
            isLoadingBookings={isLoadingBookings}
            stats={stats}
          />
          <div className="grid grid-cols-1 gap-6">
            <ArtistPortfolioManager />
          </div>
          <ReferralWidget />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-6 mt-6">
          <WeeklyCalendar />
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6 mt-6">
          <ServicesManager />
        </TabsContent>
        
        <TabsContent value="earnings" className="space-y-6 mt-6">
          <AnalyticsWidget stats={stats} isLoading={isLoadingStats} />
          <EarningsSection 
            earningsData={earningsData}
            isLoading={isLoadingEarnings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistDashboard;
