import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { useUserRole } from "@/hooks/useUserRole";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FreelancerDashboardWidgets from "@/components/dashboard/freelancer/FreelancerDashboardWidgets";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";
import { Briefcase } from "lucide-react";
import { 
  Calendar, 
  Clock, 
  Award, 
  Image, 
  MessageSquare, 
  UserPlus,
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const { userProfile } = useAuth();
  const { userRole } = useUserRole(userProfile?.id);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Freelancer Dashboard | EmviApp";
  }, []);

  const handleCardClick = (action: string) => {
    switch (action) {
      case "jobs":
        navigate("/jobs");
        break;
      case "portfolio":
        navigate("/profile/edit?tab=portfolio");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "calendar":
        toast.info("Calendar feature coming soon!");
        break;
      default:
        toast.info("Feature coming soon!");
    }
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
          <RoleDashboardLayout>
            <div className="space-y-6">
              {/* Role-based Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                    <span className="text-sm font-medium text-amber-600">Freelancer Dashboard</span>
                  </div>
                  <h1 className="text-2xl font-bold">
                    Welcome back, {userProfile?.full_name || 'Freelancer'}
                  </h1>
                </div>
              </div>

              {/* Mobile-optimized Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <ScrollArea className="w-full max-w-full pb-2">
                  <TabsList className="w-full justify-start md:justify-center p-1 h-12 bg-muted/20">
                    <TabsTrigger value="overview" className="flex-1 md:flex-none">Overview</TabsTrigger>
                    <TabsTrigger value="bookings" className="flex-1 md:flex-none">Bookings</TabsTrigger>
                    <TabsTrigger value="services" className="flex-1 md:flex-none">Services</TabsTrigger>
                  </TabsList>
                </ScrollArea>

                <TabsContent value="overview">
                  <FreelancerDashboardWidgets />
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-8">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Profile Views</div>
                      <div className="text-2xl font-bold">176</div>
                      <div className="text-xs text-green-500">↑ 12% from last week</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Job Matches</div>
                      <div className="text-2xl font-bold">14</div>
                      <div className="text-xs text-amber-500">3 new matches today</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Availability</div>
                      <div className="text-2xl font-bold">Open</div>
                      <div className="text-xs text-green-500">Next: May 15</div>
                    </div>
                  </div>
                  
                  {/* Action Cards */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Freelancer Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                    </div>
                  </div>
                  
                  {/* Jobs Near You */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Jobs Near You</h2>
                    <div className="space-y-3">
                      <div className="p-3 border border-amber-100 bg-amber-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Freelance Nail Artist</h3>
                            <p className="text-sm text-gray-600">Glamour Salon</p>
                          </div>
                          <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">New</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>2.4 miles away</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Posted 2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Weekend Nail Technician</h3>
                            <p className="text-sm text-gray-600">Beauty Box</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>3.8 miles away</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Posted 1 day ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">On-demand Nail Artist</h3>
                            <p className="text-sm text-gray-600">Luxury Spa & Salon</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>5.2 miles away</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Posted 3 days ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <a href="/jobs" className="text-blue-600 font-medium text-sm block text-center pt-2">
                        View All Jobs →
                      </a>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="space-y-8">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Profile Views</div>
                      <div className="text-2xl font-bold">176</div>
                      <div className="text-xs text-green-500">↑ 12% from last week</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Job Matches</div>
                      <div className="text-2xl font-bold">14</div>
                      <div className="text-xs text-amber-500">3 new matches today</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Availability</div>
                      <div className="text-2xl font-bold">Open</div>
                      <div className="text-xs text-green-500">Next: May 15</div>
                    </div>
                  </div>
                  
                  {/* Action Cards */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Freelancer Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                    </div>
                  </div>
                  
                  {/* Jobs Near You */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Jobs Near You</h2>
                    <div className="space-y-3">
                      <div className="p-3 border border-amber-100 bg-amber-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Freelance Nail Artist</h3>
                            <p className="text-sm text-gray-600">Glamour Salon</p>
                          </div>
                          <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">New</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>2.4 miles away</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Posted 2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Weekend Nail Technician</h3>
                            <p className="text-sm text-gray-600">Beauty Box</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>3.8 miles away</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Posted 1 day ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">On-demand Nail Artist</h3>
                            <p className="text-sm text-gray-600">Luxury Spa & Salon</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>5.2 miles away</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Posted 3 days ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <a href="/jobs" className="text-blue-600 font-medium text-sm block text-center pt-2">
                        View All Jobs →
                      </a>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default FreelancerDashboard;
