
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ChevronRight, UserCircle } from "lucide-react";
import { useProfileCompletion } from "@/components/profile/hooks/useProfileCompletion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCompletionCard = () => {
  const { completedTasks, completionPercentage, pendingTasks } = useProfileCompletion();
  
  useEffect(() => {
    console.log("ProfileCompletionCard rendering with:", { 
      completedTasks, 
      completionPercentage,
      pendingTasks
    });
  }, [completedTasks, completionPercentage, pendingTasks]);
  
  // Determine the progress color based on percentage
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (completionPercentage >= 50) return "bg-gradient-to-r from-amber-400 to-yellow-500";
    return "bg-gradient-to-r from-violet-400 to-purple-500";
  };
  
  return (
    <Card className="border border-purple-100 shadow-sm overflow-hidden backdrop-blur-sm bg-white/90">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-4">
        <CardTitle className="flex items-center text-lg font-medium">
          <UserCircle className="h-5 w-5 text-purple-500 mr-2" />
          Your Profile Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-lg">
              {completionPercentage}% Complete
            </div>
            <div className="text-sm text-gray-500">
              {completedTasks.length} of {completedTasks.length + pendingTasks.length} tasks done
            </div>
          </div>
          
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          {/* Bio Task */}
          <div className="flex items-center">
            {completedTasks.includes('bio') ? (
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Circle className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <span className={`text-sm ${completedTasks.includes('bio') ? 'text-gray-800' : 'text-gray-500'}`}>
              Add your bio
            </span>
          </div>
          
          {/* Specialty Task */}
          <div className="flex items-center">
            {completedTasks.includes('specialty') ? (
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Circle className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <span className={`text-sm ${completedTasks.includes('specialty') ? 'text-gray-800' : 'text-gray-500'}`}>
              Add specialty
            </span>
          </div>
          
          {/* Location Task */}
          <div className="flex items-center">
            {completedTasks.includes('location') ? (
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Circle className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <span className={`text-sm ${completedTasks.includes('location') ? 'text-gray-800' : 'text-gray-500'}`}>
              Add location
            </span>
          </div>
          
          {/* Profile Picture Task */}
          <div className="flex items-center">
            {completedTasks.includes('profile_picture') ? (
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Circle className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <span className={`text-sm ${completedTasks.includes('profile_picture') ? 'text-gray-800' : 'text-gray-500'}`}>
              Upload profile photo
            </span>
          </div>
          
          {/* Portfolio Task */}
          <div className="flex items-center">
            {completedTasks.includes('portfolio') ? (
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Circle className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <span className={`text-sm ${completedTasks.includes('portfolio') ? 'text-gray-800' : 'text-gray-500'}`}>
              Upload portfolio
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-center text-gray-600">
            {completionPercentage === 100 ? 
              'Your profile is complete! Keep it updated.' :
              'Complete your profile to unlock more bookings!'
            }
          </p>
        </div>
        
        <Button asChild className="w-full" variant={completionPercentage === 100 ? "outline" : "default"}>
          <Link to="/profile/edit" className="flex items-center justify-center">
            {completionPercentage === 100 ? 
              'View Profile' :
              'Update Profile Now'
            }
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
