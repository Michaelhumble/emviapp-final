
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth";
import { useReferralStatsDb } from "@/hooks/useReferralStatsDb";
import { Star, Crown, Sparkles } from "lucide-react";

const CustomerProfileSummary = () => {
  const { userProfile } = useAuth();
  const { creditsEarned, loading } = useReferralStatsDb();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const profileProgress = userProfile?.full_name && userProfile?.location ? 80 : 40;

  return (
    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="flex items-center space-x-3 mb-3">
        <Avatar className="h-12 w-12 ring-2 ring-pink-200">
          <AvatarImage src={userProfile?.avatar_url || ''} />
          <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-400 text-white font-semibold">
            {userProfile?.full_name ? getInitials(userProfile.full_name) : 'CU'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {userProfile?.full_name || 'Complete Your Profile'}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center text-amber-600">
              <Sparkles className="h-3 w-3 mr-1" />
              <span className="text-sm font-medium">
                {loading ? '...' : creditsEarned} Credits
              </span>
            </div>
            {creditsEarned >= 50 && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs">
                <Crown className="h-3 w-3 mr-1" />
                VIP
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Profile Completion</span>
          <span className="text-xs font-medium text-purple-600">{profileProgress}%</span>
        </div>
        <Progress 
          value={profileProgress} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-pink-500 to-purple-500"
        />
        {profileProgress < 100 && (
          <p className="text-xs text-gray-500">
            Complete your profile to unlock more features!
          </p>
        )}
      </div>

      {/* Quick Badges */}
      <div className="flex gap-1 mt-3">
        {creditsEarned >= 10 && (
          <Badge variant="secondary" className="text-xs">
            <Star className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )}
        {creditsEarned >= 100 && (
          <Badge className="bg-purple-100 text-purple-700 text-xs">
            Influencer
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CustomerProfileSummary;
