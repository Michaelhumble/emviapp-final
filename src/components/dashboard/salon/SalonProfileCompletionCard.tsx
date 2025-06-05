
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileField {
  name: string;
  completed: boolean;
  required: boolean;
}

interface SalonProfileCompletionCardProps {
  completionPercentage: number;
  profileFields: ProfileField[];
  incompleteFields?: string[];
}

const SalonProfileCompletionCard = ({ 
  completionPercentage, 
  profileFields,
  incompleteFields = []
}: SalonProfileCompletionCardProps) => {
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "[&>div]:bg-green-500";
    if (completionPercentage >= 50) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-red-500";
  };

  const incompleteRequiredFields = profileFields.filter(field => !field.completed && field.required);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Profile Completion</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completionPercentage}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress 
            value={completionPercentage} 
            className={`h-2 ${getProgressColor()}`}
          />
          <p className="text-sm text-muted-foreground">
            Complete your salon profile to attract more customers
          </p>
        </div>

        {incompleteRequiredFields.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Missing Information:</h4>
            <div className="space-y-1">
              {incompleteRequiredFields.slice(0, 3).map((field, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Circle className="h-3 w-3 text-gray-400" />
                  <span className="text-muted-foreground">{field.name}</span>
                </div>
              ))}
              {incompleteRequiredFields.length > 3 && (
                <p className="text-xs text-muted-foreground pl-5">
                  +{incompleteRequiredFields.length - 3} more items...
                </p>
              )}
            </div>
          </div>
        )}

        <Button asChild className="w-full" size="sm">
          <Link to="/salon/profile/edit">
            <Edit className="h-4 w-4 mr-2" />
            Complete Profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalonProfileCompletionCard;
