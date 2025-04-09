
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ChevronRight, UserCircle, StarIcon } from "lucide-react";
import { useProfileCompletion } from "@/context/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth";

const ProfileCompletionCard = () => {
  const { userProfile } = useAuth();
  const { completedTasks, completionPercentage, pendingTasks } = useProfileCompletion();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Wait for profile data to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Progress animation variants
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: `${completionPercentage}%`,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.4 + (i * 0.1),
        duration: 0.3
      }
    })
  };
  
  // Determine the progress color based on percentage
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (completionPercentage >= 50) return "bg-gradient-to-r from-amber-400 to-yellow-500";
    return "bg-gradient-to-r from-violet-400 to-purple-500";
  };
  
  if (isLoading) {
    return (
      <Card className="border border-purple-100 shadow-sm overflow-hidden backdrop-blur-sm bg-white/90">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-4">
          <CardTitle className="flex items-center text-lg font-medium">
            <UserCircle className="h-5 w-5 text-purple-500 mr-2" />
            Your Profile Progress
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
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
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {/* Bio Task */}
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
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
            </motion.div>
            
            {/* Specialty Task */}
            <motion.div 
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
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
            </motion.div>
            
            {/* Location Task */}
            <motion.div 
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
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
            </motion.div>
            
            {/* Profile Picture Task */}
            <motion.div 
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
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
            </motion.div>
            
            {/* Portfolio Task */}
            <motion.div 
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
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
            </motion.div>
          </div>
          
          <div className="mb-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-center text-gray-600"
            >
              {completionPercentage === 100 ? 
                'Your profile is complete! Keep it updated.' :
                'Complete your profile to unlock more bookings!'
              }
            </motion.p>
          </div>
          
          <Button asChild className="w-full" variant={completionPercentage === 100 ? "outline" : "default"}>
            <Link to="/profile/edit" className="flex items-center justify-center">
              {completionPercentage === 100 ? 
                'View Profile' :
                'Update Profile'
              }
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCompletionCard;
