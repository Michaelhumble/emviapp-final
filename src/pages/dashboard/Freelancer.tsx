
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  Award, 
  Image, 
  MessageSquare, 
  UserPlus,
  MapPin
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useUserRole } from "@/hooks/useUserRole";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import InviteBanner from "@/components/dashboard/InviteBanner";
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
        <div className="container px-4 mx-auto py-12">
          <RoleDashboardLayout>
            <div className="space-y-8">
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
              
              {/* Invite Banner */}
              <InviteBanner className="mb-6" />
              
              {/* Action Cards */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Freelancer Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DashboardCard 
                    title="Find Job Opportunities" 
                    description="Explore open positions" 
                    icon={Briefcase} 
                    onClick={() => handleCardClick("jobs")}
                    variant="primary"
                  />
                  <DashboardCard 
                    title="Update Portfolio" 
                    description="Showcase your best work" 
                    icon={Image}
                    onClick={() => handleCardClick("portfolio")} 
                  />
                  <DashboardCard 
                    title="Manage Schedule" 
                    description="Set your availability" 
                    icon={Calendar}
                    onClick={() => handleCardClick("calendar")} 
                  />
                  <DashboardCard 
                    title="Messages" 
                    description="Connect with potential clients" 
                    icon={MessageSquare}
                    onClick={() => handleCardClick("messages")} 
                  />
                  <DashboardCard 
                    title="Discover Freelancers" 
                    description="Expand your network" 
                    icon={UserPlus}
                    onClick={() => handleCardClick("discover")} 
                    variant="secondary"
                  />
                  <DashboardCard 
                    title="Premium Features" 
                    description="Stand out from the crowd" 
                    icon={Award}
                    onClick={() => handleCardClick("premium")} 
                    variant="outline"
                  />
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
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default FreelancerDashboard;
