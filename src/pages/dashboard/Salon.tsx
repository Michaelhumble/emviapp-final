
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import SalonOwnerDashboardWidgets from "@/components/dashboard/salon/SalonOwnerDashboardWidgets";
import { useAuth } from "@/context/auth";
import ArtistReferralCenter from "@/components/dashboard/artist/ArtistReferralCenter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Calendar, BarChart } from "lucide-react";

const SalonDashboard = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
  }, []);
  
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
              {/* Salon Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                <h1 className="text-2xl font-bold text-blue-800">
                  Welcome to your Salon Dashboard, {userProfile?.full_name || "Owner"}!
                </h1>
                <p className="text-blue-600 mt-2">
                  Manage your salon, team, and grow your business all in one place.
                </p>
                
                {/* Vietnamese welcome text for salon owners */}
                <p className="text-gray-500 text-sm italic mt-3">
                  <span className="block">Chúng tôi ở đây để giúp bạn phát triển tiệm salon của bạn.</span>
                  <span className="block">We're here to help you grow your salon business.</span>
                </p>
              </div>
              
              {/* Salon Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <Building2 className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-sm text-gray-500">Location</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <Users className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 3}</div>
                    <div className="text-sm text-gray-500">Team Members</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 10}</div>
                    <div className="text-sm text-gray-500">Appointments</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <BarChart className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">+{Math.floor(Math.random() * 15) + 5}%</div>
                    <div className="text-sm text-gray-500">Growth</div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Salon Owner Dashboard Widgets */}
              <SalonOwnerDashboardWidgets />
              
              {/* Referral Center adapted for salons */}
              <Card className="border-blue-100">
                <CardHeader>
                  {/* Vietnamese referral text for salons */}
                  <p className="text-gray-500 text-sm italic mb-2">
                    <span className="block">Giới thiệu bạn bè và nhận thưởng từ Emvi.</span>
                    <span className="block">Invite friends and earn rewards from Emvi.</span>
                  </p>
                  
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Salon Referral Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Invite other salon owners and beauty professionals to EmviApp and earn rewards!
                  </p>
                  <ArtistReferralCenter />
                </CardContent>
              </Card>
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SalonDashboard;
