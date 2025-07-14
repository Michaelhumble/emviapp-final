import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import SmartReminderBanner from "@/components/dashboard/salon/SmartReminderBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";
import SalonCreditStatus from "@/components/dashboard/salon/SalonCreditStatus";
import { useAuth } from "@/context/auth";
import SalonPostedJobsSection from "@/components/dashboard/salon/SalonPostedJobsSection";
import SalonBoostStatus from "@/components/dashboard/salon/SalonBoostStatus";
import SalonAnalyticsCards from "@/components/dashboard/salon/SalonAnalyticsCards";
import SalonNotificationCenter from "@/components/dashboard/salon/SalonNotificationCenter";
import SalonSuggestionBox from "@/components/dashboard/salon/SalonSuggestionBox";
import VisibilityNotification from "@/components/dashboard/salon/VisibilityNotification";
import SalonListingsManagement from "@/components/dashboard/salon/SalonListingsManagement";
import SalonCreditPromotion from "@/components/dashboard/salon/SalonCreditPromotion";
import TopLocalArtists from "@/components/dashboard/salon/TopLocalArtists";
import NextStepsSmart from "@/components/dashboard/salon/NextStepsSmart";
import SalonTeamManagement from "@/components/dashboard/salon/team/SalonTeamManagement";
import SalonTeamManager from "@/components/dashboard/salon/SalonTeamManager";
import SalonManagersSection from "@/components/dashboard/salon/team/SalonManagersSection";
import SalonServiceManager from "@/components/dashboard/salon/SalonServiceManager";
import SalonPhotoManager from "@/components/dashboard/salon/SalonPhotoManager";
import SalonJobManager from "@/components/dashboard/salon/SalonJobManager";
import SalonAIFeatures from "@/components/dashboard/salon/SalonAIFeatures";
import SalonSettings from "@/components/dashboard/salon/SalonSettings";
import SalonBoostCreditPanel from "@/components/dashboard/salon/SalonBoostCreditPanel";
import { SalonProfileCompletionCard } from "@/components/salon/SalonProfileCompletionCard";
import SalonBookingCalendar from "@/components/dashboard/salon/SalonBookingCalendar";
import SalonClientManagement from "@/components/dashboard/salon/SalonClientManagement";
import SalonAnalytics from "@/components/dashboard/salon/SalonAnalytics";
import SalonMessagingCenter from "@/components/dashboard/salon/SalonMessagingCenter";
import SalonBookingManager from "@/components/dashboard/salon/bookings/SalonBookingManager";
import SalonBookingFeed from "@/components/dashboard/salon/bookings/SalonBookingFeed";
import confetti from "canvas-confetti";
import BookingAnalyticsCard from "@/components/dashboard/salon/analytics/BookingAnalyticsCard";
import CreditUsageHistory from "@/components/dashboard/salon/credits/CreditUsageHistory";
import MonthlyReportDownload from "@/components/dashboard/salon/reports/MonthlyReportDownload";
import { SalonProvider } from "@/context/salon";
import SalonSwitcher from "@/components/dashboard/salon/SalonSwitcher";
import AISmartReminder from "@/components/ai/AISmartReminder";
import SalonReferralPanel from "@/components/dashboard/salon/referral/SalonReferralPanel";
import SalonAvailabilityManager from "@/components/dashboard/salon/SalonAvailabilityManager";
import SalonBookingsOverview from "@/components/dashboard/salon/bookings/SalonBookingsOverview";
import SalonServiceManagement from "@/components/dashboard/salon/services/SalonServiceManagement";
import { SalonTeamSection } from "@/components/dashboard/salon/team/SalonTeamSection";
import { SalonEarningsSection } from "@/components/dashboard/salon/earnings/SalonEarningsSection";
import SalonTeamChat from '@/components/dashboard/salon/team/SalonTeamChat';

const OwnerDashboard = () => {
  const [showNotification, setShowNotification] = useState(true);
  const { userProfile } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
    console.log("Owner Dashboard rendered with profile:", userProfile);
    
    const shouldShowConfetti = localStorage.getItem('salon_success');
    
    if (shouldShowConfetti) {
      localStorage.removeItem('salon_success');
      
      setTimeout(() => {
        setShowConfetti(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    }

    const savedTab = localStorage.getItem('salon_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [userProfile]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('salon_dashboard_tab', value);
  };
  
  return (
    <SalonProvider>
      <Layout>
        <div className="container px-4 mx-auto py-12">
          <motion.div>
            <RoleDashboardLayout>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
                  <SalonSwitcher />
                </div>
                
                <SmartReminderBanner />

                {/* DEBUG: Add a visible indicator */}
                <div className="bg-red-100 p-4 rounded-lg border-2 border-red-500">
                  <p className="text-red-800 font-bold">🚨 DEBUG: Tabs should appear below this line! Active tab: {activeTab}</p>
                </div>
                
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-7 mb-8 h-auto p-1 bg-white/80 backdrop-blur-sm border shadow-lg">
                    <TabsTrigger value="overview" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white flex items-center gap-2 py-3">
                      Calendar
                    </TabsTrigger>
                    <TabsTrigger value="photos" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white flex items-center gap-2 py-3">
                      Photos
                    </TabsTrigger>
                    <TabsTrigger value="team" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white flex items-center gap-2 py-3">
                      Team & Recognition
                    </TabsTrigger>
                    <TabsTrigger value="jobs" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white flex items-center gap-2 py-3">
                      Jobs/Hiring
                    </TabsTrigger>
                    <TabsTrigger value="ai-labs" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white flex items-center gap-2 py-3 relative">
                      AI Labs
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="font-inter data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white flex items-center gap-2 py-3">
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-8 pt-4">
                    {/* Remove the duplicate SalonProfileCompletionCard */}
                    
                    <SalonQuickStats />
                    
                    <SalonAvailabilityManager />
                    
                    <SalonBoostCreditPanel />
                    
                    <SalonDashboardActionButtons />
                    
                    <SalonBookingFeed />
                    
                    <SalonTeamManager />
                    
                    <SalonServiceManager />
                    
                    <NextStepsSmart />
                    
                    <SalonAnalyticsCards />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1">
                        <SalonCreditPromotion />
                      </div>
                      
                      <div className="lg:col-span-1">
                        <TopLocalArtists />
                      </div>
                      
                      <div className="lg:col-span-1">
                        <SalonReferralPanel />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="calendar" className="space-y-4 animate-fade-in">
                    <SalonBookingCalendar />
                    <SalonBookingsOverview />
                    <SalonBookingFeed />
                  </TabsContent>
                  
                  <TabsContent value="photos" className="space-y-4 animate-fade-in">
                    <SalonPhotoManager />
                  </TabsContent>
                  
                  <TabsContent value="team" className="space-y-4 animate-fade-in">
                    <SalonTeamManager />
                    <SalonTeamSection />
                    <SalonTeamChat />
                  </TabsContent>
                  
                  <TabsContent value="jobs" className="space-y-4 animate-fade-in">
                    <SalonJobManager />
                    <SalonPostedJobsSection />
                  </TabsContent>
                  
                  <TabsContent value="ai-labs" className="space-y-4 animate-fade-in">
                    <SalonAIFeatures />
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4 animate-fade-in">
                    <SalonSettings />
                    <SalonServiceManagement />
                    <SalonAnalytics />
                  </TabsContent>
                </Tabs>
                
                <SalonSuggestionBox />
              </div>
            </RoleDashboardLayout>
          </motion.div>
        </div>
        
        {showNotification && (
          <VisibilityNotification 
            onClose={() => setShowNotification(false)} 
          />
        )}
      </Layout>
    </SalonProvider>
  );
};

export default OwnerDashboard;
