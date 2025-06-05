
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSalonProfileCompletion } from "@/hooks/useSalonProfileCompletion";

export const SalonProfileCompletionCard = () => {
  const { completionPercentage, incompleteFields, isComplete } = useSalonProfileCompletion();
  const [expanded, setExpanded] = useState(completionPercentage < 100);
  const [loading, setLoading] = useState(false);
  
  // Generate color based on completion percentage
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "[&>div]:bg-green-500";
    if (completionPercentage >= 50) return "[&>div]:bg-amber-500";
    return "[&>div]:bg-rose-500";
  };
  
  // Generate message based on completion percentage
  const getMessage = () => {
    if (completionPercentage === 100) {
      return "Your salon profile is complete! Clients and professionals can find your business easily now.";
    } else if (completionPercentage >= 80) {
      return "Almost there! Complete your salon profile to get more visibility.";
    } else if (completionPercentage >= 50) {
      return "You're making progress. Keep going to improve your salon's visibility!";
    } else {
      return "Complete your salon profile to increase your visibility to potential clients and professionals.";
    }
  };
  
  // Get next incomplete field to highlight
  const getNextAction = () => {
    if (incompleteFields.includes('Salon Logo')) {
      return "Add your salon logo";
    } else if (incompleteFields.includes('Salon Name')) {
      return "Add your salon name";
    } else if (incompleteFields.includes('Location')) {
      return "Add your salon location";
    } else if (incompleteFields.includes('Description')) {
      return "Add your salon description";
    } else if (incompleteFields.includes('Phone Number')) {
      return "Add contact information";
    } else if (incompleteFields.includes('Instagram')) {
      return "Add your Instagram";
    } else if (incompleteFields.includes('Website')) {
      return "Add your website";
    } else {
      return "Update your profile";
    }
  };
  
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-12" />
          </div>
          <Skeleton className="h-2 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-8 w-28" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-l-4" 
          style={{ borderLeftColor: completionPercentage === 100 ? '#10b981' : 
                                   completionPercentage >= 80 ? '#f59e0b' : 
                                   '#ef4444' }}>
      <CardContent className="py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-medium">Salon Profile Completion</h3>
          <span className="text-base font-medium">{completionPercentage}%</span>
        </div>
        
        <Progress 
          value={completionPercentage} 
          className={`h-2 mb-3 ${getProgressColor()}`}
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
              <span>Salon profile complete!</span>
            </div>
          )}
        </div>
        
        {expanded && completionPercentage < 100 && incompleteFields.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2">Complete these items:</h4>
            <ul className="text-sm space-y-2">
              {incompleteFields.slice(0, 4).map((field, index) => (
                <li key={index} className="flex items-center">
                  <AlertCircle className="h-3 w-3 mr-2 text-amber-500" />
                  {field}
                </li>
              ))}
              {incompleteFields.length > 4 && (
                <li className="text-xs text-gray-500">
                  + {incompleteFields.length - 4} more items to complete
                </li>
              )}
            </ul>
          </div>
        )}
        
        {incompleteFields.length > 0 && completionPercentage < 100 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)} 
            className="w-full mt-2 text-xs"
          >
            {expanded ? "Show Less" : "Show More Details"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
