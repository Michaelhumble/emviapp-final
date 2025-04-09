
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Paintbrush, MessageSquare, Calendar, Image, UserPlus, Zap, Trophy } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useUserRole } from "@/hooks/useUserRole";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import InviteBanner from "@/components/dashboard/InviteBanner";
import { toast } from "sonner";

const ArtistDashboard = () => {
  const { userProfile } = useAuth();
  const { userRole } = useUserRole(userProfile?.id);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
  }, []);
  
  const handleCardClick = (action: string) => {
    switch (action) {
      case "portfolio":
        navigate("/profile/edit?tab=portfolio");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "calendar":
        navigate("/calendar");
        break;
      case "boost":
        toast.info("Boost feature coming soon!");
        break;
      default:
        toast.info("Feature coming soon!");
    }
  };
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
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
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-xs text-green-500">↑ 24% this week</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">New Inquiries</div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-xs text-green-500">↑ 2 since yesterday</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-sm text-gray-500">Upcoming Appointments</div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-purple-500">Next: Tomorrow, 2pm</div>
                </div>
              </div>
              
              {/* Invite Banner */}
              <InviteBanner className="mb-6" />
              
              {/* Action Cards */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DashboardCard 
                    title="Update Portfolio" 
                    description="Showcase your latest work" 
                    icon={Image} 
                    onClick={() => handleCardClick("portfolio")}
                    variant="primary"
                  />
                  <DashboardCard 
                    title="Check Messages" 
                    description="Respond to client inquiries" 
                    icon={MessageSquare}
                    onClick={() => handleCardClick("messages")} 
                  />
                  <DashboardCard 
                    title="Manage Calendar" 
                    description="Set your availability" 
                    icon={Calendar}
                    onClick={() => handleCardClick("calendar")} 
                  />
                  <DashboardCard 
                    title="Invite Artists" 
                    description="Grow your network" 
                    icon={UserPlus}
                    onClick={() => handleCardClick("invite")} 
                    variant="secondary"
                  />
                  <DashboardCard 
                    title="Boost Profile" 
                    description="Get more visibility" 
                    icon={Zap}
                    onClick={() => handleCardClick("boost")} 
                  />
                  <DashboardCard 
                    title="Pro Features" 
                    description="Unlock advanced tools" 
                    icon={Trophy}
                    onClick={() => handleCardClick("pro")} 
                    variant="outline"
                  />
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Paintbrush className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New portfolio item added</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="bg-green-100 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New message from Tina</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <UserPlus className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile viewed by 12 new people</p>
                      <p className="text-xs text-gray-500">This week</p>
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

export default ArtistDashboard;
