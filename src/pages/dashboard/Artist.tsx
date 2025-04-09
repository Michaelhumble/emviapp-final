
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import ArtistDashboardProfile from "@/components/dashboard/artist/ArtistDashboardProfile";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceManager from "@/components/dashboard/artist/services/ServiceManager";
import ArtistPortfolioSection from "@/components/portfolio/ArtistPortfolioSection";
import ArtistUpgradeSection from "@/components/dashboard/artist/ArtistUpgradeSection";
import ReferralSystem from "@/components/referral/ReferralSystem";
import ArtistAnalytics from "@/components/dashboard/artist/ArtistAnalytics";
import ArtistBookingCalendar from "@/components/dashboard/artist/ArtistBookingCalendar";
import ReviewsSection from "@/components/reviews/ReviewsSection";

const ArtistDashboard = () => {
  const { userProfile, user } = useAuth();
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
  }, []);
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-6">
          {/* Artist Dashboard Header */}
          <ArtistDashboardProfile artistProfile={userProfile} />
          
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="dashboard" className="mt-6">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              {/* Profile Completion Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ProfileCompletionCard />
                </div>
                <div>
                  {/* Simple Stats Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
                    <h3 className="text-lg font-medium mb-3">Profile Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Profile Views</span>
                        <span className="font-medium">{userProfile?.profile_views || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Portfolio Items</span>
                        <span className="font-medium">{userProfile?.portfolio_urls?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Services Offered</span>
                        <span className="font-medium">{userProfile?.skills?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Referrals</span>
                        <span className="font-medium">{userProfile?.referral_count || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Analytics Overview */}
              <ArtistAnalytics />
              
              {/* Services Preview */}
              <ServiceManager />
              
              {/* Additional Dashboard Components */}
              <ArtistUpgradeSection />
            </TabsContent>
            
            <TabsContent value="portfolio">
              <ArtistPortfolioSection />
            </TabsContent>
            
            <TabsContent value="services">
              <ServiceManager />
            </TabsContent>
            
            <TabsContent value="bookings">
              <ArtistBookingCalendar />
            </TabsContent>
            
            <TabsContent value="reviews">
              <ReviewsSection artistId={user?.id} />
            </TabsContent>
            
            <TabsContent value="earnings">
              <ArtistAnalytics />
            </TabsContent>
            
            <TabsContent value="referrals">
              <ReferralSystem />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ArtistDashboard;
