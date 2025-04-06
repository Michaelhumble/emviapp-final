
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Eye, Clock, Heart } from "lucide-react";
import { useAuth } from "@/context/auth";

interface CustomerBoostTrackerProps {
  profileViews: number;
}

const CustomerBoostTracker = ({ profileViews }: CustomerBoostTrackerProps) => {
  const { userProfile } = useAuth();
  const [progress, setProgress] = useState(0);
  const goalViews = 50; // Weekly view goal
  
  // Calculate progress percentage
  useEffect(() => {
    const percentage = Math.min(100, Math.round((profileViews / goalViews) * 100));
    
    // Animate progress
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [profileViews]);
  
  // Calculate growth percentage (demo purposes)
  const growthPercentage = 24; // Mock data
  
  // Format last active time
  const lastActiveTime = "2 hours ago"; // Mock data
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="overflow-hidden border-pink-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Eye className="h-5 w-5 text-pink-500 mr-2" />
              Beauty Profile Tracker
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last active: {lastActiveTime}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-pink-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-pink-600 font-medium">Profile Views</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">{profileViews}</span>
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {growthPercentage}%
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">This week</span>
            </div>
            
            <div className="bg-rose-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-rose-600 font-medium">Favorite Salons</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">5</span>
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  New
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">You have 5 favorites</span>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-amber-600 font-medium">Friends Joined</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">{userProfile?.referral_count || 0}</span>
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  Via your link
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">From your referrals</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Weekly beauty discovery goal</span>
              <span>{profileViews}/{goalViews} interactions</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {progress >= 100 
                ? "Congratulations! You've reached your weekly beauty discovery goal." 
                : `${100 - progress}% more to reach your weekly goal`}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerBoostTracker;
