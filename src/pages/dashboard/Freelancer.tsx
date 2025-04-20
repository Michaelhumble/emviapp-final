
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Calendar, Clock, DollarSign, User } from "lucide-react";
import { toast } from "sonner";
import OverviewTab from "@/components/dashboard/freelancer/tabs/OverviewTab";
import BookingsTab from "@/components/dashboard/freelancer/tabs/BookingsTab";
import ServicesTab from "@/components/dashboard/freelancer/tabs/ServicesTab";
import AvailabilityTab from "@/components/dashboard/freelancer/tabs/AvailabilityTab";
import EarningsTab from "@/components/dashboard/freelancer/tabs/EarningsTab";

const FreelancerDashboard = () => {
  const { userProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    document.title = "Freelancer Dashboard | EmviApp";
    
    // Load saved tab from localStorage if available
    const savedTab = localStorage.getItem("freelancer_dashboard_tab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save active tab to localStorage
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("freelancer_dashboard_tab", value);
  };

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-white to-amber-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-6 lg:py-8">
          <Card className="border-amber-100 shadow-sm overflow-hidden bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-orange-50/50 border-b border-amber-100/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                    <span className="text-sm font-medium text-amber-600">Freelancer Dashboard</span>
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Freelancer'}
                  </CardTitle>
                  <CardDescription>
                    Manage your appointments, services, and availability
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Mobile-optimized Tabs */}
              <Tabs 
                value={activeTab} 
                onValueChange={handleTabChange} 
                className="w-full"
              >
                <ScrollArea className="w-full max-w-full pb-2">
                  <TabsList className="w-full justify-start md:justify-center p-1 h-12 bg-muted/20 border-b">
                    <TabsTrigger value="overview" className="flex-1 md:flex-none">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="bookings" className="flex-1 md:flex-none">
                      Bookings
                    </TabsTrigger>
                    <TabsTrigger value="services" className="flex-1 md:flex-none">
                      Services
                    </TabsTrigger>
                    <TabsTrigger value="availability" className="flex-1 md:flex-none">
                      Availability
                    </TabsTrigger>
                    <TabsTrigger value="earnings" className="flex-1 md:flex-none">
                      Earnings
                    </TabsTrigger>
                  </TabsList>
                </ScrollArea>

                <TabsContent value="overview" className="mt-0 p-4 md:p-6">
                  <OverviewTab />
                </TabsContent>
                
                <TabsContent value="bookings" className="mt-0 p-4 md:p-6">
                  <BookingsTab />
                </TabsContent>
                
                <TabsContent value="services" className="mt-0 p-4 md:p-6">
                  <ServicesTab />
                </TabsContent>
                
                <TabsContent value="availability" className="mt-0 p-4 md:p-6">
                  <AvailabilityTab />
                </TabsContent>
                
                <TabsContent value="earnings" className="mt-0 p-4 md:p-6">
                  <EarningsTab />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default FreelancerDashboard;
