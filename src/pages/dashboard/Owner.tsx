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
import SalonTeamManager from "@/components/dashboard/salon/team/SalonTeamManager";
import SalonManagersSection from "@/components/dashboard/salon/team/SalonManagersSection";
import SalonServiceManager from "@/components/dashboard/salon/SalonServiceManager";
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RoleDashboardLayout>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
                  <SalonSwitcher />
                </div>
                
                <SmartReminderBanner />
                
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid grid-cols-7 mb-8">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Overview</TabsTrigger>
                    <TabsTrigger value="bookings" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Bookings</TabsTrigger>
                    <TabsTrigger value="clients" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Clients</TabsTrigger>
                    <TabsTrigger value="team" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Team</TabsTrigger>
                    <TabsTrigger value="services" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Services</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Analytics</TabsTrigger>
                    <TabsTrigger value="messages" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Messages</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-8 pt-4">
                    <SalonProfileCompletionCard />
                    
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

                  <TabsContent value="bookings" className="space-y-8">
                    <SalonBookingsOverview />
                    
                    <SalonBookingFeed />
                    
                    <SalonBookingManager />
                    
                    <BookingAnalyticsCard />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="lg:col-span-1">
                        <CreditUsageHistory />
                      </div>
                      
                      <div className="lg:col-span-1">
                        <MonthlyReportDownload />
                      </div>
                    </div>
                    
                    <SalonBookingCalendar />
                  </TabsContent>
                  
                  <TabsContent value="clients" className="space-y-8">
                    <SalonClientManagement />
                  </TabsContent>
                  
                  <TabsContent value="team" className="space-y-8">
                    <SalonTeamSection />
                  </TabsContent>
                  
                  <TabsContent value="services" className="space-y-8">
                    <SalonServiceManagement />
                    <SalonServiceManager />
                    <SalonCreditStatus />
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-8">
                    <SalonAnalytics />
                    
                    <BookingAnalyticsCard />
                    
                    <CreditUsageHistory />
                    
                    <MonthlyReportDownload />
                    
                    <SalonAnalyticsCards />
                    
                    <SalonListingsManagement />
                    
                    <SalonPostedJobsSection />
                  </TabsContent>
                  
                  <TabsContent value="messages" className="space-y-8">
                    <SalonMessagingCenter />
                    
                    <SalonNotificationCenter />
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
