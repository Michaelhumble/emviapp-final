
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useProfile } from "@/context/profile";
import { Link } from "react-router-dom";
import { calculateProfileCompletion } from "@/utils/supabase-helpers";

const ProfileCompletionCard = () => {
  const { userProfile, userRole } = useAuth();
  const { incompleteFields } = useProfile();
  
  const completionPercentage = calculateProfileCompletion(userProfile, userRole);
  
  // Generate color based on completion percentage
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };
  
  // Generate message based on completion percentage
  const getMessage = () => {
    if (completionPercentage === 100) {
      return "Your profile is complete! Clients can find you easily now.";
    } else if (completionPercentage >= 80) {
      return "Almost there! Complete your profile to get more visibility.";
    } else if (completionPercentage >= 50) {
      return "You're making progress. Keep going to improve your profile!";
    } else {
      return "Complete your profile to increase your visibility to potential clients.";
    }
  };
  
  // Get next incomplete field to highlight
  const getNextAction = () => {
    if (incompleteFields.includes('avatar_url')) {
      return "Add a profile photo";
    } else if (incompleteFields.includes('bio')) {
      return "Add your bio";
    } else if (incompleteFields.includes('specialty')) {
      return "Add your specialty";
    } else if (incompleteFields.includes('location')) {
      return "Add your location";
    } else if (incompleteFields.includes('portfolio')) {
      return "Add portfolio items";
    } else if (incompleteFields.includes('instagram')) {
      return "Add your Instagram";
    } else {
      return "Update your profile";
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Profile Completion</span>
          <span className="text-base">{completionPercentage}%</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <Progress 
          value={completionPercentage} 
          className="h-2 mb-3" 
          indicatorClassName={getProgressColor()}
        />
        
        <p className="text-sm text-muted-foreground mb-4">
          {getMessage()}
        </p>
        
        <div className="flex justify-between items-center">
          {completionPercentage < 100 ? (
            <>
              <div className="flex items-center text-sm font-medium">
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                <span>Next: {getNextAction()}</span>
              </div>
              
              <Button asChild size="sm" className="gap-1">
                <Link to="/profile/edit">
                  Complete <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center text-sm font-medium text-green-600 w-full justify-center">
              <Check className="h-4 w-4 mr-1" />
              <span>Profile complete!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
