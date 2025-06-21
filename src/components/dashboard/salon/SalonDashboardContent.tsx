
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, TrendingUp, Users, Calendar, Bell, Sparkles, Brain, BarChart3, Zap, Shield, Award } from "lucide-react";
import { useAuth } from "@/context/auth";
import { SalonOverviewCard } from "./components/SalonOverviewCard";
import { BookingsSummaryCard } from "./components/BookingsSummaryCard";
import { StaffOverviewCard } from "./components/StaffOverviewCard";
import { EarningsCard } from "./components/EarningsCard";
import { RecentReviewsCard } from "./components/RecentReviewsCard";
import { motion } from "framer-motion";

export const SalonDashboardContent = () => {
  const { userProfile } = useAuth();
  
  // Get salon name from user profile, fallback to business name or generic greeting
  const getSalonName = () => {
    if (userProfile?.salon_name) {
      return userProfile.salon_name;
    }
    if (userProfile?.company_name) {
      return userProfile.company_name;
    }
    if (userProfile?.full_name) {
      return userProfile.full_name;
    }
    return "Salon Owner";
  };

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
        >
          Welcome back, Salon Owner!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2 text-lg"
        >
          Here's your business snapshot for today.
        </motion.p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <SalonOverviewCard />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          <BookingsSummaryCard />
          <StaffOverviewCard />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <EarningsCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentReviewsCard />
        </motion.div>
      </div>

      {/* Smart Review FOMO Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-orange-400/10" />
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              <Sparkles className="h-3 w-3" />
              Coming Soon
            </span>
          </div>
          <CardContent className="relative p-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Smart Review AI Engine
                </h3>
                <p className="text-gray-600 mb-4 text-lg">
                  Next-generation AI-powered reputation management that analyzes reviews from Google, Yelp, TikTok, Facebook, and ChatGPT to 10X your salon's online presence.
                </p>
                
                {/* Sample AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold text-gray-800">Sentiment Analysis</span>
                    </div>
                    <p className="text-sm text-gray-600">"AI detected 94% positive sentiment across 247 reviews this month"</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-pink-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-pink-600" />
                      <span className="font-semibold text-gray-800">Auto-Response</span>
                    </div>
                    <p className="text-sm text-gray-600">"Generated 127 personalized responses, saving 8.5 hours weekly"</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span className="font-semibold text-gray-800">Growth Insights</span>
                    </div>
                    <p className="text-sm text-gray-600">"Predicted 23% increase in bookings based on review trends"</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold text-gray-800">Crisis Prevention</span>
                    </div>
                    <p className="text-sm text-gray-600">"Early warning system prevented 3 potential reputation issues"</p>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me When Available
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coming Soon Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Revolutionary Features Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Analytics */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-3 right-3">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Q2 2025
              </span>
            </div>
            <CardContent className="p-6">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Analytics Suite</h3>
              <p className="text-gray-600 text-sm">
                Predictive insights, customer behavior analysis, and revenue optimization powered by machine learning.
              </p>
            </CardContent>
          </Card>

          {/* Smart Marketing */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-3 right-3">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Q3 2025
              </span>
            </div>
            <CardContent className="p-6">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Marketing Hub</h3>
              <p className="text-gray-600 text-sm">
                Automated social media campaigns, targeted ads, and viral content generation that drives bookings.
              </p>
            </CardContent>
          </Card>

          {/* Team Leaderboard */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-3 right-3">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Q4 2025
              </span>
            </div>
            <CardContent className="p-6">
              <div className="p-3 bg-yellow-100 rounded-lg w-fit mb-4">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Leaderboard</h3>
              <p className="text-gray-600 text-sm">
                Gamified performance tracking, rewards system, and team competitions to boost productivity.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="sticky bottom-4 md:relative md:bottom-0 z-10"
      >
        <Button 
          className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Service
        </Button>
      </motion.div>
    </div>
  );
};
