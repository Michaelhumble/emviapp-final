
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  Users, 
  Store, 
  MessageSquare, 
  Calendar, 
  UserPlus, 
  Award, 
  Briefcase,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useUserRole } from "@/hooks/useUserRole";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import InviteBanner from "@/components/dashboard/InviteBanner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// This component must not import or render any profile components
const SalonDashboard = () => {
  const { userProfile } = useAuth();
  const { userRole } = useUserRole(userProfile?.id);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set document title for this specific dashboard
    document.title = "Salon Dashboard | EmviApp";
    
    // Add a debug log to confirm the right component is rendering
    console.log("SalonDashboard component rendering");
  }, []);
  
  const handleCardClick = (action: string) => {
    switch (action) {
      case "post-job":
        navigate("/post/job");
        break;
      case "manage-profile":
        navigate("/profile/edit");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "invite":
        // Open invitation modal or navigate to invite page
        toast.info("Invite feature coming soon!");
        break;
      default:
        toast.info("Feature coming soon!");
    }
  };
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-blue-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-12">
          <RoleDashboardLayout>
            <div className="space-y-8">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Profile Views</div>
                  <div className="text-2xl font-bold">246</div>
                  <div className="text-xs text-green-500">↑ 18% this week</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Active Job Posts</div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-xs text-amber-500">1 expires soon</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Applications</div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-green-500">↑ 4 new today</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Engagement Score</div>
                  <div className="text-2xl font-bold">8.4</div>
                  <div className="text-xs text-gray-500">out of 10</div>
                </div>
              </div>
              
              {/* Invite Banner */}
              <InviteBanner className="mb-6" />
              
              {/* Action Cards */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Salon Management</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DashboardCard 
                    title="Post a Job" 
                    description="Find talented nail artists" 
                    icon={Briefcase} 
                    onClick={() => handleCardClick("post-job")}
                    variant="primary"
                  />
                  <DashboardCard 
                    title="Manage Salon Profile" 
                    description="Update your salon details" 
                    icon={Store}
                    onClick={() => handleCardClick("manage-profile")} 
                  />
                  <DashboardCard 
                    title="Messages" 
                    description="Check inquiries & applications" 
                    icon={MessageSquare}
                    onClick={() => handleCardClick("messages")} 
                  />
                  <DashboardCard 
                    title="Invite Team Members" 
                    description="Grow your salon team" 
                    icon={UserPlus}
                    onClick={() => handleCardClick("invite")} 
                    variant="secondary"
                  />
                  <DashboardCard 
                    title="Salon Analytics" 
                    description="Track your performance" 
                    icon={TrendingUp}
                    onClick={() => handleCardClick("analytics")} 
                  />
                  <DashboardCard 
                    title="Premium Features" 
                    description="Boost your salon visibility" 
                    icon={Award}
                    onClick={() => handleCardClick("premium")} 
                    variant="outline"
                  />
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Active Job Posts</h2>
                  {/* Placeholder for job posts list */}
                  <div className="space-y-2">
                    <div className="border-l-4 border-blue-400 pl-3 py-2">
                      <p className="font-medium">Nail Technician (Full-time)</p>
                      <p className="text-sm text-gray-500">Posted 2 days ago · 8 applicants</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-3 py-2">
                      <p className="font-medium">Receptionist (Part-time)</p>
                      <p className="text-sm text-gray-500">Posted 5 days ago · 4 applicants</p>
                    </div>
                    <button className="text-sm text-blue-600 mt-2 font-medium">
                      View All Posts →
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Interviews</h2>
                  {/* Placeholder for upcoming interviews */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium">Thu, May 10 · 10:00 AM</p>
                        <p className="text-sm text-gray-600">Jane Smith - Nail Technician</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium">Fri, May 11 · 2:30 PM</p>
                        <p className="text-sm text-gray-600">David Lee - Nail Artist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SalonDashboard;
