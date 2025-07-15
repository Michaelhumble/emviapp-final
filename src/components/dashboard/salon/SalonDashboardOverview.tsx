
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Star, 
  Bell,
  Sparkles,
  Brain,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  Award,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import SalonStatsGrid from "./components/SalonStatsGrid";
import SalonAnalyticsCharts from "./components/SalonAnalyticsCharts";
import SalonSecondaryFeatures from "./components/SalonSecondaryFeatures";

const SalonDashboardOverview = () => {
  const { userProfile } = useAuth();
  
  // Dynamic welcome message with priority order
  const getSalonName = () => {
    return userProfile?.salon_name || 
           userProfile?.company_name || 
           userProfile?.full_name || 
           "Salon Owner";
  };

  const handleNotifyMe = (feature: string) => {
    toast.success(`You'll be notified when ${feature} is available!`, {
      description: "We'll send you an email as soon as this feature launches."
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic Welcome Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {getSalonName()} ✨
            </h1>
            <p className="text-purple-100 text-lg">
              Your salon empire awaits. Let's make today extraordinary.
            </p>
          </div>
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl"></div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <SalonStatsGrid />
      </motion.div>

      {/* Today's Bookings */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Bookings
              </CardTitle>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm text-gray-600">Hair Color • Maria</p>
              </div>
              <div className="text-right">
                <p className="font-medium">10:00 AM</p>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  confirmed
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium">Jessica Park</p>
                <p className="text-sm text-gray-600">Manicure • Anna</p>
              </div>
              <div className="text-right">
                <p className="font-medium">11:30 AM</p>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  pending
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium">Emily Rodriguez</p>
                <p className="text-sm text-gray-600">Facial • Sophia</p>
              </div>
              <div className="text-right">
                <p className="font-medium">2:00 PM</p>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  confirmed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Messages</h3>
                  <p className="text-sm text-blue-700">3 new messages</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Open Messages
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900">Team</h3>
                  <p className="text-sm text-purple-700">4 team members</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Manage Team
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500 rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Reviews</h3>
                  <p className="text-sm text-green-700">4.9 average rating</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                View Reviews
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900">AI Labs</h3>
                  <p className="text-sm text-amber-700">New features</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                Explore AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Analytics Charts */}
      <motion.div variants={itemVariants}>
        <SalonAnalyticsCharts />
      </motion.div>

      {/* Secondary Features */}
      <motion.div variants={itemVariants}>
        <SalonSecondaryFeatures isPremium={false} />
      </motion.div>
    </motion.div>
  );
};

export default SalonDashboardOverview;
