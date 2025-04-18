
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProgressTrackerProps {
  completionPercentage: number;
  incompleteFields: string[];
  title?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const ProgressTracker = ({
  completionPercentage,
  incompleteFields,
  title = "Profile Completion",
  ctaText = "Complete Profile",
  ctaLink = "/profile/edit"
}: ProgressTrackerProps) => {
  const isComplete = completionPercentage >= 100;
  
  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Profile Completion</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        {!isComplete && incompleteFields.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Missing information:</p>
            <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
              {incompleteFields.map((field, i) => (
                <li key={i}>{field}</li>
              ))}
            </ul>
            <Button asChild variant="link" className="px-0 h-auto" size="sm">
              <Link to={ctaLink} className="flex items-center text-purple-600">
                {ctaText} <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        )}
        
        {isComplete && (
          <div className="text-center py-2">
            <p className="text-green-600 font-medium">Your profile is complete!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
