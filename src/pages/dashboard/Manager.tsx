
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonTeamManager from "@/components/dashboard/salon/team/SalonTeamManager";
import SalonServiceManager from "@/components/dashboard/salon/SalonServiceManager";
import SalonBookingManager from "@/components/dashboard/salon/bookings/SalonBookingManager";
import SalonBookingFeed from "@/components/dashboard/salon/bookings/SalonBookingFeed";
import BookingAnalyticsCard from "@/components/dashboard/salon/analytics/BookingAnalyticsCard";
import SalonMessagingCenter from "@/components/dashboard/salon/SalonMessagingCenter";
import SalonAvailabilityManager from "@/components/dashboard/salon/SalonAvailabilityManager";
import SalonPostedJobsSection from "@/components/dashboard/salon/SalonPostedJobsSection";
import SalonClientManagement from "@/components/dashboard/salon/SalonClientManagement";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Building2, Store } from "lucide-react";
import { Salon } from "@/context/salon/types";

const ManagerDashboard = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [managedSalon, setManagedSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Salon Manager Dashboard | EmviApp";
    
    const fetchManagedSalon = async () => {
      if (!userProfile?.id) return;
      
      try {
        // First get the manager_for_salon_id from the user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('manager_for_salon_id')
          .eq('id', userProfile.id)
          .single();
          
        if (userError) throw userError;
        
        if (!userData.manager_for_salon_id) {
          setLoading(false);
          return;
        }
        
        // Then fetch the salon details
        const { data: salonData, error: salonError } = await supabase
          .from('salons')
          .select('*')
          .eq('id', userData.manager_for_salon_id)
          .single();
          
        if (salonError) throw salonError;
        
        setManagedSalon(salonData);
      } catch (err) {
        console.error('Error fetching managed salon:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchManagedSalon();
    
    const savedTab = localStorage.getItem('manager_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [userProfile]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('manager_dashboard_tab', value);
  };
  
  // If not managing any salon, show a message
  if (!loading && !managedSalon) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RoleDashboardLayout>
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-amber-600" />
                    <CardTitle>No Salon Assigned</CardTitle>
                  </div>
                  <CardDescription>
                    You currently don't have manager access to any salon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A salon owner needs to invite you as a manager to their salon. Once you're invited, you'll be able to manage the salon from this dashboard.
                  </p>
                </CardContent>
              </Card>
            </RoleDashboardLayout>
          </motion.div>
        </div>
      </Layout>
    );
  }
  
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Manager Dashboard</span>
                  </div>
                  <h1 className="text-2xl font-bold">
                    {loading ? 'Loading...' : managedSalon?.salon_name || 'Salon Dashboard'}
                  </h1>
                </div>
                <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Store className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Salon Manager</span>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <SalonQuickStats />
                  <SalonBookingFeed />
                  <SalonAvailabilityManager />
                  <SalonTeamManager />
                  <BookingAnalyticsCard />
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-8">
                  <SalonBookingFeed />
                  <SalonBookingManager />
                  <SalonClientManagement />
                </TabsContent>
                
                <TabsContent value="team" className="space-y-8">
                  <SalonTeamManager />
                  <SalonAvailabilityManager />
                </TabsContent>
                
                <TabsContent value="services" className="space-y-8">
                  <SalonServiceManager />
                  <SalonPostedJobsSection />
                </TabsContent>
                
                <TabsContent value="messages" className="space-y-8">
                  <SalonMessagingCenter />
                </TabsContent>
              </Tabs>
              
              {/* Manager-specific note */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="pt-6">
                  <div className="flex gap-2 items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        You're viewing this salon as a manager. Some features like subscription management, billing, and salon deletion are only available to salon owners.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </RoleDashboardLayout>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
