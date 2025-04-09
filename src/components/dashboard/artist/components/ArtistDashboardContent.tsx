
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Palette, MessageCircle, Users, BarChart, Heart } from "lucide-react";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import ArtistCalendar from "./ArtistCalendar";
import ArtistBookingsPanel from "../../artist/ArtistBookingsPanel";
import ArtistPortfolio from "./ArtistPortfolio";
import ArtistStats from "./ArtistStats";
import ArtistReferrals from "./ArtistReferrals";
import ArtistMessageCenter from "./ArtistMessageCenter";

const ArtistDashboardContent = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Load last active tab from localStorage if available
  useEffect(() => {
    const savedTab = localStorage.getItem('artist_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  // Save active tab to localStorage when it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('artist_dashboard_tab', value);
  };
  
  // Render profile completion warning if profile is incomplete
  const renderProfileCompletion = () => {
    if (userProfile && (!userProfile.bio || !userProfile.specialty || !userProfile.avatar_url)) {
      return (
        <div className="mb-6">
          <ProfileCompletionCard />
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      {renderProfileCompletion()}
      
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <div className="bg-white rounded-lg p-1 border overflow-x-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-slate-100">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-100">
              <Palette className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-slate-100">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-slate-100">
              <Users className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-100">
              <BarChart className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Analytics</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <ArtistStats />
          <ArtistCalendar />
          <div className="flex justify-center mt-6">
            <Button onClick={() => handleTabChange("bookings")}>
              View All Bookings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="bookings" className="mt-6">
          <ArtistBookingsPanel />
        </TabsContent>
        
        <TabsContent value="portfolio" className="mt-6">
          <ArtistPortfolio />
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
          <ArtistMessageCenter />
        </TabsContent>
        
        <TabsContent value="referrals" className="mt-6">
          <ArtistReferrals />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="bg-white rounded-lg p-6 border text-center">
            <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Analytics Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Track your business growth and customer engagement with detailed analytics.
              This feature is currently in development.
            </p>
            <Button variant="outline" onClick={() => handleTabChange("overview")}>
              Return to Overview
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistDashboardContent;
