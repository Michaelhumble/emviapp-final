
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { calculateProfileCompletion } from "@/utils/supabase-helpers";

const ProfileProgressTracker = () => {
  const { user, userProfile, userRole } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  useEffect(() => {
    if (userProfile) {
      const percentage = calculateProfileCompletion(userProfile, userRole);
      setCompletionPercentage(percentage);
    }
  }, [userProfile, userRole]);
  
  const getChecklistItems = () => {
    return [
      {
        name: "Profile Photo",
        completed: !!userProfile?.avatar_url,
        id: "profile_picture"
      },
      {
        name: "Bio",
        completed: !!userProfile?.bio,
        id: "bio"
      },
      {
        name: "Location",
        completed: !!userProfile?.location,
        id: "location"
      },
      {
        name: "Specialty",
        completed: !!userProfile?.specialty,
        id: "specialty"
      },
      {
        name: "Portfolio",
        completed: Array.isArray(userProfile?.portfolio_urls) && 
                 userProfile?.portfolio_urls.length > 0,
        id: "portfolio"
      }
    ];
  };
  
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Profile Completion</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{completionPercentage}% Complete</span>
        </div>
        
        <Progress 
          value={completionPercentage} 
          className="h-2 mb-4" 
          indicatorClassName={getProgressColor()}
        />
        
        <div className="space-y-2">
          {getChecklistItems().map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              {item.completed ? (
                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                  <X className="h-3 w-3 text-gray-400" />
                </div>
              )}
              <span className={item.completed ? 'text-gray-700' : 'text-gray-500'}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgressTracker;
