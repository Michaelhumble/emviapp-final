
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import StatsGrid from "./components/StatsGrid";
import MainGrid from "./components/MainGrid";
import EarningsSection from "./components/EarningsSection";
import { useArtistDashboardData } from "./hooks/useArtistDashboardData";

const ArtistDashboardWidgets = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    earningsData,
    isLoadingEarnings
  } = useArtistDashboardData(activeTab);

  return (
    <FallbackBoundary>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <StatsGrid stats={stats} isLoading={isLoadingStats} />
          <MainGrid 
            bookings={recentBookings}
            isLoadingBookings={isLoadingBookings}
            stats={stats}
          />
        </TabsContent>
        
        <TabsContent value="earnings" className="space-y-4">
          <FallbackBoundary>
            <EarningsSection 
              earningsData={earningsData}
              isLoading={isLoadingEarnings}
            />
          </FallbackBoundary>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="text-center py-12 text-muted-foreground">
            Calendar view will be available soon
          </div>
        </TabsContent>
      </Tabs>
    </FallbackBoundary>
  );
};

export default ArtistDashboardWidgets;
