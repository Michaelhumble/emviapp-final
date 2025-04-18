import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProfileCompletionCard from "../profile/ProfileCompletionCard";

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
    <ProfileCompletionCard 
      completionPercentage={completionPercentage}
      incompleteFields={incompleteFields}
      isComplete={isComplete}
    />
  );
};
