
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CalendarDays, DollarSign } from "lucide-react";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import OverviewTab from "./components/tabs/OverviewTab";
import EarningsTabContent from "./components/tabs/EarningsTabContent";
import CalendarTab from "./components/tabs/CalendarTab";
import QuickActions from "./components/QuickActions";
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif font-medium">Dashboard</h2>
        <QuickActions />
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Earnings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab 
            stats={stats}
            isLoadingStats={isLoadingStats}
            bookings={recentBookings}
            isLoadingBookings={isLoadingBookings}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <FallbackBoundary>
            <CalendarTab />
          </FallbackBoundary>
        </TabsContent>
        
        <TabsContent value="earnings">
          <FallbackBoundary>
            <EarningsTabContent />
          </FallbackBoundary>
        </TabsContent>
      </Tabs>
    </FallbackBoundary>
  );
};

export default ArtistDashboardWidgets;
