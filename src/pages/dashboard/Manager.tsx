
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import { useAuth } from "@/context/auth";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import SmartReminderBanner from "@/components/dashboard/salon/SmartReminderBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";
import SalonCreditStatus from "@/components/dashboard/salon/SalonCreditStatus";
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
import SalonTeamManagement from "@/components/dashboard/salon/SalonTeamManagement";
import SalonTeamManager from "@/components/dashboard/salon/team/SalonTeamManager";
import SalonManagersSection from "@/components/dashboard/salon/team/SalonManagersSection";
import SalonServiceManager from "@/components/dashboard/salon/SalonServiceManager";
import SalonBoostCreditPanel from "@/components/dashboard/salon/SalonBoostCreditPanel";
import SalonProfileCompletionMeter from "@/components/dashboard/salon/SalonProfileCompletionMeter";
import SalonBookingCalendar from "@/components/dashboard/salon/SalonBookingCalendar";
import SalonClientManagement from "@/components/dashboard/salon/SalonClientManagement";
import SalonAnalytics from "@/components/dashboard/salon/SalonAnalytics";
import SalonMessagingCenter from "@/components/dashboard/salon/SalonMessagingCenter";
import SalonBookingManager from "@/components/dashboard/salon/bookings/SalonBookingManager";
import SalonBookingFeed from "@/components/dashboard/salon/bookings/SalonBookingFeed";
import BookingAnalyticsCard from "@/components/dashboard/salon/analytics/BookingAnalyticsCard";
import CreditUsageHistory from "@/components/dashboard/salon/credits/CreditUsageHistory";
import MonthlyReportDownload from "@/components/dashboard/salon/reports/MonthlyReportDownload";
import { SalonProvider, useSalon } from "@/context/salon";
import SalonSwitcher from "@/components/dashboard/salon/SalonSwitcher";
import AISmartReminder from "@/components/ai/AISmartReminder";
import SalonReferralPanel from "@/components/dashboard/salon/referral/SalonReferralPanel";
import SalonAvailabilityManager from "@/components/dashboard/salon/SalonAvailabilityManager";
import { useBookingNotifications } from "@/hooks/useBookingNotifications";
import { Toaster } from "@/components/ui/toaster";

const ManagerDashboardContent = () => {
  const [showNotification, setShowNotification] = useState(true);
  const { userProfile } = useAuth();
  const { currentSalon } = useSalon();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Initialize booking notifications
  const { subscribed } = useBookingNotifications();
  
  useEffect(() => {
    document.title = "Salon Manager Dashboard | EmviApp";
    console.log("Manager Dashboard rendered with profile:", userProfile);
    
    const savedTab = localStorage.getItem('manager_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [userProfile]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('manager_dashboard_tab', value);
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RoleDashboardLayout>
            <div className="space-y-6">
              {/* Add personalized greeting */}
              <DashboardGreeting className="mb-6" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
                <SalonSwitcher />
              </div>
              
              <SmartReminderBanner />
              
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-6 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <SalonProfileCompletionMeter />
                  
                  <SalonQuickStats />
                  
                  {/* Show upcoming bookings in overview tab */}
                  <SalonBookingFeed />
                  
                  {currentSalon?.id && <SalonAvailabilityManager salonId={currentSalon.id} />}
                  
                  <SalonDashboardActionButtons />
                  
                  <SalonTeamManager />
                  
                  <SalonServiceManager />
                  
                  <SalonCreditStatus />
                </TabsContent>

                <TabsContent value="bookings" className="space-y-8">
                  <SalonBookingFeed />
                  
                  <SalonBookingManager />
                  
                  <BookingAnalyticsCard />
                  
                  {currentSalon?.id && <SalonAvailabilityManager salonId={currentSalon.id} />}
                  
                  <SalonBookingCalendar />
                </TabsContent>
                
                <TabsContent value="clients" className="space-y-8">
                  <SalonClientManagement />
                </TabsContent>
                
                <TabsContent value="team" className="space-y-8">
                  <SalonManagersSection />
                  <SalonTeamManager />
                </TabsContent>
                
                <TabsContent value="services" className="space-y-8">
                  <SalonServiceManager />
                </TabsContent>
                
                <TabsContent value="reports" className="space-y-8">
                  <SalonAnalytics />
                  <MonthlyReportDownload />
                  <CreditUsageHistory />
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
      
      {/* Add Toaster for notifications */}
      <Toaster />
    </Layout>
  );
};

const ManagerDashboard = () => {
  return (
    <SalonProvider>
      <ManagerDashboardContent />
    </SalonProvider>
  );
};

export default ManagerDashboard;
