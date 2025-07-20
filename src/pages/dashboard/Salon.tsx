
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { SalonProvider } from "@/context/salon";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import Layout from "@/components/layout/Layout";
import SalonDashboardNew from "@/components/dashboard/salon/SalonDashboardNew";
import SalonBookingCalendar from "@/components/dashboard/salon/SalonBookingCalendar";
import SalonSettings from "@/components/dashboard/salon/SalonSettings";
import SalonPhotoManager from "@/components/dashboard/salon/SalonPhotoManager";
import SalonJobManager from "@/components/dashboard/salon/SalonJobManager";
import SalonTeamManager from "@/components/dashboard/salon/SalonTeamManager";
import SalonAIFeatures from "@/components/dashboard/salon/SalonAIFeatures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCompletionBar from "@/components/profile/ProfileCompletionBar";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Calendar, 
  Camera, 
  Users, 
  Briefcase, 
  Settings, 
  Sparkles,
  Bell
} from "lucide-react";

const SalonDashboardPage = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <ProfileCompletionProvider>
        <SalonProvider>
          <div className="max-w-7xl mx-auto px-6">
            {/* Premium Header - Full Width */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm"></div>
              <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome back, {userProfile?.salon_name || "Salon Owner"}! ✨
                </h1>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                  Your premium salon management hub. Build something extraordinary.
                </p>
              </div>
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-7 mb-8 h-auto p-1 bg-white/80 backdrop-blur-sm border shadow-lg">
                    <TabsTrigger 
                      value="overview" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="calendar" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="hidden sm:inline">Calendar</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="photos" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="hidden sm:inline">Photos</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="team" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                    >
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Team</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="jobs" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span className="hidden sm:inline">Jobs</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ai-features" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white flex items-center gap-2 py-3 relative"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden sm:inline">AI Labs</span>
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 border-0">
                        NEW
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 animate-fade-in">
                    <SalonDashboardNew />
                  </TabsContent>
                  
                  <TabsContent value="calendar" className="space-y-4 animate-fade-in">
                    <SalonBookingCalendar />
                  </TabsContent>
                  
                  <TabsContent value="photos" className="space-y-4 animate-fade-in">
                    <SalonPhotoManager />
                  </TabsContent>
                  
                  <TabsContent value="team" className="space-y-4 animate-fade-in">
                    <SalonTeamManager />
                  </TabsContent>
                  
                  <TabsContent value="jobs" className="space-y-4 animate-fade-in">
                    <SalonJobManager />
                  </TabsContent>
                  
                  <TabsContent value="ai-features" className="space-y-4 animate-fade-in">
                    <SalonAIFeatures />
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4 animate-fade-in">
                    <SalonSettings />
                  </TabsContent>
            </Tabs>
          </div>
        </SalonProvider>
      </ProfileCompletionProvider>
    </Layout>
  );
};

export default SalonDashboardPage;
