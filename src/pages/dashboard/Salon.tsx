
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { SalonProvider } from "@/context/salon";
import Layout from "@/components/layout/Layout";
import SalonDashboardOverview from "@/components/dashboard/salon/SalonDashboardOverview";
import SalonBookingCalendar from "@/components/dashboard/salon/SalonBookingCalendar";
import SalonSettings from "@/components/dashboard/salon/SalonSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCompletionBar from "@/components/profile/ProfileCompletionBar";

const SalonDashboardPage = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      {/* VISUAL BANNER FOR IDENTIFICATION */}
      <div className="w-full bg-red-600 text-white text-center py-4 text-xl font-bold">
        🔍 THIS IS src/pages/dashboard/Salon.tsx
      </div>
      
      <SalonProvider>
        <div className="container mx-auto px-4 py-8">
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
    </Layout>
  );
};

export default SalonDashboardPage;
