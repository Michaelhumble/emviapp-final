
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Users, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

interface AnalyticsData {
  weeklyViews: number;
  totalViews: number;
  offersReceived: number;
  profileRank: string;
}

const AnalyticsBanner = () => {
  const { userProfile } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    weeklyViews: 0,
    totalViews: 0,
    offersReceived: 0,
    profileRank: "Rising"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!userProfile?.id) return;
      
      try {
        // Get profile views from last 7 days
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        
        // This would normally fetch from profile_views table
        // For now, using mock data based on user activity
        const mockAnalytics: AnalyticsData = {
          weeklyViews: Math.floor(Math.random() * 25) + 5,
          totalViews: userProfile.profile_views || 0,
          offersReceived: Math.floor(Math.random() * 8),
          profileRank: userProfile.open_to_offers ? "Featured" : "Rising"
        };
        
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [userProfile]);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-purple-200 rounded w-3/4"></div>
            <div className="h-3 bg-purple-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getInsightMessage = () => {
    if (analytics.weeklyViews > 20) {
      return `🔥 Your profile is on fire! ${analytics.weeklyViews} salons viewed your profile this week!`;
    } else if (analytics.weeklyViews > 10) {
      return `📈 Great momentum! ${analytics.weeklyViews} salons checked out your profile this week.`;
    } else if (analytics.weeklyViews > 0) {
      return `👀 ${analytics.weeklyViews} salons viewed your profile this week - keep it up!`;
    } else {
      return "💡 Tip: Update your portfolio to attract more salon views!";
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-900">Weekly Insights</span>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
            {analytics.profileRank}
          </Badge>
        </div>
        
        <p className="text-sm font-medium text-purple-800 mb-3">
          {getInsightMessage()}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-purple-700">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{analytics.totalViews} total views</span>
          </div>
          {analytics.offersReceived > 0 && (
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>{analytics.offersReceived} offers this month</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Top 15% this week</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsBanner;
