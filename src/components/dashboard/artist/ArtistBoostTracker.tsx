
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Eye, Clock } from "lucide-react";
import { useAuth } from "@/context/auth";

interface ArtistBoostTrackerProps {
  profileViews: number;
}

const ArtistBoostTracker = ({ profileViews }: ArtistBoostTrackerProps) => {
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
      <Card className="overflow-hidden border-indigo-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Eye className="h-5 w-5 text-indigo-500 mr-2" />
              Profile Boost Tracker
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last active: {lastActiveTime}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-indigo-600 font-medium">Profile Views</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">{profileViews}</span>
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {growthPercentage}%
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">This week</span>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-purple-600 font-medium">Engagement Rate</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">8.2%</span>
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  3%
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">Above average</span>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-amber-600 font-medium">New Followers</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">9</span>
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {userProfile?.referral_count || 0} joined
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">From your link</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Weekly goal progress</span>
              <span>{profileViews}/{goalViews} views</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {progress >= 100 
                ? "Congratulations! You've reached your weekly goal." 
                : `${100 - progress}% more to reach your weekly goal`}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistBoostTracker;
