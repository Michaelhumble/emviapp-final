
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Heart, MessageCircle, Users } from "lucide-react";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import ArtistBookingsPanel from "../../artist/ArtistBookingsPanel";
import ArtistPortfolio from "./ArtistPortfolio";
import ArtistStats from "./ArtistStats";
import ArtistReferrals from "./ArtistReferrals";
import ArtistMessageCenter from "./ArtistMessageCenter";

const ArtistDashboardContent = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Load last active tab from localStorage if available
  useEffect(() => {
    const savedTab = localStorage.getItem('artist_dashboard_tab');
    if (savedTab && ['overview', 'bookings', 'portfolio', 'messages', 'referrals'].includes(savedTab)) {
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
          <TabsList className="grid grid-cols-3 md:grid-cols-3 gap-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100">
              <BarChart className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-slate-100">
              <Heart className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-100">
              <Users className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Portfolio</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <ArtistStats />
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
      </Tabs>
    </div>
  );
};

export default ArtistDashboardContent;
