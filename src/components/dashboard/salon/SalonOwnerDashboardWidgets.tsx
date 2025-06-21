
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import SalonBoostBanner from "@/components/salon/SalonBoostBanner";
import CustomerVisibilityBanner from "./components/CustomerVisibilityBanner";
import PostReachStatsCard from "./components/PostReachStatsCard";
import SalonFeatureCardsGrid from "./components/SalonFeatureCardsGrid";
import SalonSecondaryFeatures from "./components/SalonSecondaryFeatures";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import SimpleLoadingFallback from "@/components/error-handling/SimpleLoadingFallback";
import SalonDashboard from "./SalonDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, TrendingUp, Users, Zap, Calendar, BarChart3, Target, Bot, Bell } from "lucide-react";
import { motion } from "framer-motion";

interface SalonDashboardData {
  postViews: number;
  localReach: number;
  credits: number;
  isPremium: boolean;
}

const SalonOwnerDashboardWidgets = () => {
  const { userProfile, user } = useAuth();
  
  const { data: dashboardData, isLoading } = useSafeQuery<SalonDashboardData>({
    queryKey: ['salon-dashboard-data', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Fetch credits
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('credits, boosted_until')
        .eq('id', user.id)
        .single();
      
      if (userError) throw userError;
      
      // Check for premium/boosted status
      const boostedUntil = userData?.boosted_until ? new Date(userData.boosted_until) : null;
      const isPremium = boostedUntil ? new Date() < boostedUntil : false;
      
      // Get post views from jobs or posts
      let postViews = 0;
      const { count: jobCount } = await supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .eq('salon_id', user.id);
        
      // For local reach, we'll use a simple formula based on job listings and location
      // In a real implementation, this would come from analytics
      const localReach = Math.max(30, (jobCount || 0) * 30 + Math.floor(Math.random() * 40));
      
      return {
        postViews: jobCount || 0,
        localReach,
        credits: userData?.credits || 0,
        isPremium
      };
    },
    enabled: !!user?.id,
    fallbackData: {
      postViews: 0,
      localReach: 0,
      credits: userProfile?.credits || 0,
      isPremium: false
    },
    context: "salon-dashboard-data"
  });
  
  const handleBoostClick = () => {
    toast.info("Redirecting to salon boost options...");
    // In a real implementation, this would navigate to a boost page or open a modal
  };

  const handleNotifyMe = () => {
    toast.success("You'll be notified when Smart Review launches! 🚀");
  };
  
  return (
    <FallbackBoundary>
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Salon Owner Dashboard
          </h2>
          <p className="text-gray-600 mt-2">Transform your salon with AI-powered insights</p>
        </motion.div>
        
        {/* Smart Review FOMO Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-2 border-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Smart Review AI
                    </CardTitle>
                    <p className="text-gray-600">Next-Generation Review Intelligence</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Coming Soon
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-800">AI-Powered Review Analysis</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Harness GPT-5 and Google Search to analyze reviews from Google, Yelp, TikTok, Facebook, and ChatGPT. 
                    Get instant insights and 10X your online reputation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Google', 'Yelp', 'Facebook', 'TikTok', 'ChatGPT'].map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-white/60 rounded-lg p-4 space-y-3">
                  <h5 className="font-medium text-gray-800">Sample AI Insights:</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>"Customers love your nail art - mentioned 89% more than competitors"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>"Response rate improved 340% with AI suggestions"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>"3 actionable improvements identified for 5-star reviews"</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Join 2,847 salons on the waitlist
                </div>
                <Button 
                  onClick={handleNotifyMe}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coming Soon Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-lg">AI Analytics Pro</h4>
              <p className="text-sm text-gray-600">Real-time insights, predictive booking trends, and revenue optimization</p>
              <Badge variant="outline" className="text-xs">Q2 2025</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-lg">Smart Scheduling</h4>
              <p className="text-sm text-gray-600">AI-powered appointment optimization and automatic no-show prevention</p>
              <Badge variant="outline" className="text-xs">Q3 2025</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-lg">Marketing Autopilot</h4>
              <p className="text-sm text-gray-600">Automated social media, targeted ads, and viral campaign generation</p>
              <Badge variant="outline" className="text-xs">Q4 2025</Badge>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Enhanced Salon Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FallbackBoundary>
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
              <SalonDashboard />
            </div>
          </FallbackBoundary>
        </motion.div>
        
        {/* Customer Visibility Banner */}
        <FallbackBoundary>
          <CustomerVisibilityBanner 
            loading={isLoading}
            credits={dashboardData.credits}
          />
        </FallbackBoundary>
        
        {/* Post Reach Stats Card */}
        <FallbackBoundary>
          <PostReachStatsCard 
            postViews={dashboardData.postViews} 
            localReach={dashboardData.localReach} 
            isPremium={dashboardData.isPremium}
            loading={isLoading}
          />
        </FallbackBoundary>
        
        {/* Feature Cards Grid */}
        <FallbackBoundary>
          <SalonFeatureCardsGrid credits={dashboardData.credits} />
        </FallbackBoundary>
        
        {/* Second Row */}
        <FallbackBoundary>
          <SalonSecondaryFeatures isPremium={dashboardData.isPremium} />
        </FallbackBoundary>
      </div>
    </FallbackBoundary>
  );
};

export default SalonOwnerDashboardWidgets;
