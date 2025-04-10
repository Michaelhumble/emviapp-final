import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
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
import SalonTeamManagement from "@/components/dashboard/salon/SalonTeamManagement";
import SalonServiceManager from "@/components/dashboard/salon/SalonServiceManager";
import SalonBoostCreditPanel from "@/components/dashboard/salon/SalonBoostCreditPanel";
import SalonProfileCompletionMeter from "@/components/dashboard/salon/SalonProfileCompletionMeter";
import SalonBookingCalendar from "@/components/dashboard/salon/SalonBookingCalendar";
import SalonClientManagement from "@/components/dashboard/salon/SalonClientManagement";
import SalonAnalytics from "@/components/dashboard/salon/SalonAnalytics";
import SalonMessagingCenter from "@/components/dashboard/salon/SalonMessagingCenter";
import confetti from "canvas-confetti";

const OwnerDashboard = () => {
  const [showNotification, setShowNotification] = useState(true);
  const { userProfile } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
    console.log("Owner Dashboard rendered with profile:", userProfile);
    
    // Check if we should show confetti (e.g., first login, recent referred user, etc.)
    const shouldShowConfetti = localStorage.getItem('salon_success');
    
    if (shouldShowConfetti) {
      // Remove the flag so it only shows once
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

    // Restore active tab from localStorage if available
    const savedTab = localStorage.getItem('salon_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [userProfile]);

  // Save active tab to localStorage when it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('salon_dashboard_tab', value);
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
            <div className="space-y-8">
              {/* Salon Welcome Banner with Vietnamese text */}
              <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
              
              {/* Dashboard Tabs */}
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-7 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
                  {/* Profile Completion Meter */}
                  <SalonProfileCompletionMeter />
                  
                  {/* Quick Stats Grid */}
                  <SalonQuickStats />
                  
                  {/* NEW: Salon Boost & Credit Panel */}
                  <SalonBoostCreditPanel />
                  
                  {/* NEW: Next Steps Smart Panel */}
                  <NextStepsSmart />
                  
                  {/* NEW: Analytics Cards */}
                  <SalonAnalyticsCards />
                  
                  {/* Action Buttons with Vietnamese text */}
                  <SalonDashboardActionButtons />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* NEW: Credit Promotion Card */}
                    <div className="lg:col-span-1">
                      <SalonCreditPromotion />
                    </div>
                    
                    {/* NEW: Top Local Artists widget */}
                    <div className="lg:col-span-1">
                      <TopLocalArtists />
                    </div>
                    
                    {/* Posted Jobs Section - Now in a column span */}
                    <div className="lg:col-span-1">
                      <SalonReferralCard />
                    </div>
                  </div>
                </TabsContent>

                {/* Bookings Tab - New in Phase 3 */}
                <TabsContent value="bookings" className="space-y-8">
                  {/* Booking Calendar */}
                  <SalonBookingCalendar />
                </TabsContent>
                
                {/* Clients Tab - New in Phase 3 */}
                <TabsContent value="clients" className="space-y-8">
                  {/* Client Management */}
                  <SalonClientManagement />
                </TabsContent>
                
                {/* Team Tab */}
                <TabsContent value="team" className="space-y-8">
                  {/* Team Management Panel */}
                  <SalonTeamManagement />
                  
                  {/* Referral Card (repurposed for team invites) */}
                  <SalonReferralCard />
                </TabsContent>
                
                {/* Services Tab */}
                <TabsContent value="services" className="space-y-8">
                  {/* Service Manager */}
                  <SalonServiceManager />
                  
                  {/* Credit Status (for service boosts) */}
                  <SalonCreditStatus />
                </TabsContent>
                
                {/* Analytics Tab - Enhanced in Phase 3 */}
                <TabsContent value="analytics" className="space-y-8">
                  {/* Revenue & Booking Analytics - New in Phase 3 */}
                  <SalonAnalytics />
                  
                  {/* Original Analytics Cards */}
                  <SalonAnalyticsCards />
                  
                  {/* Jobs & Listings Section */}
                  <SalonListingsManagement />
                  
                  {/* Posted Jobs Section */}
                  <SalonPostedJobsSection />
                </TabsContent>
                
                {/* Messages Tab - New in Phase 3 */}
                <TabsContent value="messages" className="space-y-8">
                  {/* Messaging Center */}
                  <SalonMessagingCenter />
                  
                  {/* Notification Center */}
                  <SalonNotificationCenter />
                </TabsContent>
              </Tabs>
              
              {/* Suggestion Box */}
              <SalonSuggestionBox />
            </div>
          </RoleDashboardLayout>
        </motion.div>
      </div>
      
      {/* Visibility upgrade notification */}
      {showNotification && (
        <VisibilityNotification 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </Layout>
  );
};

export default OwnerDashboard;
