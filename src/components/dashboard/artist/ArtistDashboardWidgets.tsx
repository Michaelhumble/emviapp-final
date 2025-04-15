
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import StatsGrid from "./components/StatsGrid";
import MainGrid from "./components/MainGrid";
import EarningsSection from "./components/EarningsSection";
import ArtistCalendar from "./components/ArtistCalendar";
import { useArtistDashboardData } from "./hooks/useArtistDashboardData";
import { BarChart3, CalendarDays, DollarSign } from "lucide-react";
import AnalyticsWidget from "./components/AnalyticsWidget";

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
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
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
            <AnalyticsWidget stats={stats} isLoading={isLoadingStats} />
            <EarningsSection 
              earningsData={earningsData}
              isLoading={isLoadingEarnings}
            />
          </FallbackBoundary>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <FallbackBoundary>
            <ArtistCalendar />
          </FallbackBoundary>
        </TabsContent>
      </Tabs>
    </FallbackBoundary>
  );
};

export default ArtistDashboardWidgets;
