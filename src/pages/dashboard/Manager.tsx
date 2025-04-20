import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { useAuth } from "@/context/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Store } from "lucide-react";

const ManagerDashboard = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [managedSalon, setManagedSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Salon Manager Dashboard | EmviApp";
    
    const fetchManagedSalon = async () => {
      if (!userProfile?.id) return;
      
      try {
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
        
        const { data: salonData, error: salonError } = await supabase
          .from('salons')
          .select('*')
          .eq('id', userData.manager_for_salon_id)
          .single();
          
        if (salonError) throw salonError;
        
        const processedData: Salon = {
          ...salonData,
          services: Array.isArray(salonData.services) 
            ? salonData.services 
            : salonData.services 
              ? (typeof salonData.services === 'string' 
                 ? JSON.parse(salonData.services) 
                 : Object.values(salonData.services))
              : []
        };
        
        setManagedSalon(processedData);
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
      <div className="container px-4 mx-auto py-6 lg:py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RoleDashboardLayout>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Manager Dashboard</span>
                  </div>
                  <h1 className="text-2xl font-bold">
                    Welcome back, {userProfile?.full_name || 'Manager'}
                  </h1>
                </div>
                <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Store className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Salon Manager</span>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <ScrollArea className="w-full max-w-full pb-2">
                  <TabsList className="w-full justify-start md:justify-center p-1 h-12 bg-muted/20">
                    <TabsTrigger value="overview" className="flex-1 md:flex-none">Overview</TabsTrigger>
                    <TabsTrigger value="bookings" className="flex-1 md:flex-none">Bookings</TabsTrigger>
                    <TabsTrigger value="team" className="flex-1 md:flex-none">Team</TabsTrigger>
                  </TabsList>
                </ScrollArea>

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
