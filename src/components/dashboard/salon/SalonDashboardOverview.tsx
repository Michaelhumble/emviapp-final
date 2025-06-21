
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
  Award
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

      {/* Smart Review AI Card */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
          <CardHeader className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Smart Review AI</CardTitle>
                  <p className="text-amber-100 mt-1">AI-powered review management across all platforms</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                🔥 BETA
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Platform Logos */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-sm text-gray-600 font-medium">Connected Platforms:</div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">G</div>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">Y</div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">AI</div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">F</div>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">T</div>
              </div>
            </div>

            {/* AI Highlights Preview */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-orange-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" />
                Recent AI Highlights
              </h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 bg-green-50 p-2 rounded border-l-4 border-green-400">
                  "Amazing service! The staff was so professional..." - Google (5⭐)
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                  "Best nail salon in the area! Highly recommend..." - Yelp (5⭐)
                </div>
                <div className="text-sm text-gray-600 bg-purple-50 p-2 rounded border-l-4 border-purple-400">
                  AI detected 15 positive sentiment mentions this week ↗️
                </div>
              </div>
            </div>

            <Button 
              onClick={() => handleNotifyMe("Smart Review AI")}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notify Me When Available
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coming Soon Premium Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Analytics Pro */}
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <CardTitle className="text-lg font-bold">AI Analytics Pro</CardTitle>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-xs">SOON</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                Advanced AI-powered analytics with predictive insights, customer behavior analysis, and revenue optimization.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Predictive Revenue Forecasting
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Customer Lifetime Value Analysis
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Peak Hours Optimization
                </div>
              </div>
              <Button 
                onClick={() => handleNotifyMe("AI Analytics Pro")}
                variant="outline" 
                className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 group-hover:bg-blue-100 transition-all duration-300"
              >
                <Bell className="h-3 w-3 mr-2" />
                Notify Me
              </Button>
            </CardContent>
          </Card>

          {/* Smart Scheduling */}
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <CardTitle className="text-lg font-bold">Smart Scheduling</CardTitle>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-xs">SOON</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                AI-powered scheduling that automatically optimizes appointments, reduces no-shows, and maximizes efficiency.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Auto-Fill Cancellations
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Smart Reminder System
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Peak Time Optimization
                </div>
              </div>
              <Button 
                onClick={() => handleNotifyMe("Smart Scheduling")}
                variant="outline" 
                className="w-full border-green-300 text-green-600 hover:bg-green-50 group-hover:bg-green-100 transition-all duration-300"
              >
                <Bell className="h-3 w-3 mr-2" />
                Notify Me
              </Button>
            </CardContent>
          </Card>

          {/* Marketing Autopilot */}
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <CardTitle className="text-lg font-bold">Marketing Autopilot</CardTitle>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-xs">SOON</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                Automated marketing campaigns, social media management, and customer retention strategies powered by AI.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Auto Social Media Posts
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                  Smart Email Campaigns
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Customer Win-Back System
                </div>
              </div>
              <Button 
                onClick={() => handleNotifyMe("Marketing Autopilot")}
                variant="outline" 
                className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 group-hover:bg-purple-100 transition-all duration-300"
              >
                <Bell className="h-3 w-3 mr-2" />
                Notify Me
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
