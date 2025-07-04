import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { SalonProvider } from "@/context/salon";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// SOURCE OF TRUTH: This is now the main Salon Dashboard used by /dashboard/owner
const SalonDashboardPage = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
    // DEBUG: Confirm which file is rendering
    console.log("🔍 DEBUG: Rendering from src/pages/dashboard/Salon.tsx");
    console.log("🔍 DEBUG: User profile:", userProfile);
  }, [userProfile]);

  // Placeholder components for dashboard sections
  const SalonDashboardOverview = () => (
    <Card>
      <CardHeader>
        <CardTitle>Salon Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Dashboard overview content coming soon...</p>
      </CardContent>
    </Card>
  );

  const SalonBookingCalendar = () => (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Booking calendar coming soon...</p>
      </CardContent>
    </Card>
  );

  const SalonSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Salon Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Settings panel coming soon...</p>
      </CardContent>
    </Card>
  );

  const ProfileCompletionBar = () => (
    <Card className="border-muted shadow-sm mb-4">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">Complete your profile to unlock more features</p>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* DEBUG BANNER */}
      <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-center font-bold w-full">
        🟡 RENDERING Salon.tsx
      </div>
      
      <ProfileCompletionProvider>
        <SalonProvider>
          <div className="container mx-auto px-4 py-8">
            {/* DEBUG BANNER - Remove after confirmation */}
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              <strong>🔍 DEBUG:</strong> This is rendering from <code>src/pages/dashboard/Salon.tsx</code>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <ProfileCompletionBar />
                  
                  <Card className="border-muted shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-playfair">
                        {userProfile?.salon_name || "Your Salon"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground font-inter">
                        {userProfile?.bio || "Complete your salon profile to showcase your business."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger 
                      value="overview" 
                      className="font-inter data-[state=active]:bg-emvi-accent/10 data-[state=active]:text-emvi-accent"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="calendar" 
                      className="font-inter data-[state=active]:bg-emvi-accent/10 data-[state=active]:text-emvi-accent"
                    >
                      Booking Calendar
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="font-inter data-[state=active]:bg-emvi-accent/10 data-[state=active]:text-emvi-accent"
                    >
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <SalonDashboardOverview />
                  </TabsContent>
                  
                  <TabsContent value="calendar" className="space-y-4">
                    <SalonBookingCalendar />
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4">
                    <SalonSettings />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </SalonProvider>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default SalonDashboardPage;
