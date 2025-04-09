
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/auth';
import { isAfter } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, TrendingUp, Eye, Zap } from "lucide-react";

interface SalonMetricsCardsProps {
  salonId: string;
}

const SalonMetricsCards: React.FC<SalonMetricsCardsProps> = ({ salonId }) => {
  const { userProfile } = useAuth();
  
  // Fetch profile views data
  const { data: viewsData } = useQuery({
    queryKey: ['salon-profile-views', salonId],
    queryFn: async () => {
      // This is a placeholder - in a real app, you'd have an actual API endpoint
      // For now, we'll use a random number + any existing count from profile
      const randomViews = Math.floor(Math.random() * 50) + 10;
      return { count: userProfile?.profile_views || randomViews };
    },
    enabled: !!salonId,
  });
  
  // Fetch post performance data
  const { data: postData } = useQuery({
    queryKey: ['salon-posts', salonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id')
        .eq('user_id', salonId)
        .eq('status', 'active');
        
      if (error) throw error;
      
      return { postCount: data?.length || 0 };
    },
    enabled: !!salonId,
  });
  
  // Check if profile is boosted
  const isBoosted = userProfile?.boosted_until ? 
    isAfter(new Date(userProfile.boosted_until), new Date()) : 
    false;
  
  // Format the boosted until date if it exists
  const boostEndDate = userProfile?.boosted_until ? 
    new Date(userProfile.boosted_until).toLocaleDateString() : 
    null;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Profile Views</p>
              <h4 className="text-2xl font-bold">{viewsData?.count || 0}</h4>
            </div>
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <Eye className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            Last 30 days
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Active Posts</p>
              <h4 className="text-2xl font-bold">{postData?.postCount || 0}</h4>
            </div>
            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-xs text-purple-600">
            Job listings & booth rentals
          </div>
        </CardContent>
      </Card>
      
      <Card className={`bg-gradient-to-br ${isBoosted ? 'from-yellow-50 to-amber-50 border-amber-100' : 'from-white to-gray-50 border-gray-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isBoosted ? 'text-amber-600' : 'text-gray-600'}`}>
                Visibility Status
              </p>
              <h4 className="text-2xl font-bold">
                {isBoosted ? 'Boosted' : 'Standard'}
              </h4>
            </div>
            <div className={`p-2 rounded-full ${isBoosted ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-xs">
            {isBoosted ? (
              <span className="text-amber-600">Until {boostEndDate}</span>
            ) : (
              <span className="text-gray-500">Normal visibility</span>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Credit Balance</p>
              <h4 className="text-2xl font-bold">{userProfile?.credits || 0}</h4>
            </div>
            <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-xs text-emerald-600">
            Use for boosts & promotions
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonMetricsCards;
