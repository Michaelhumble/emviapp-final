
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Target } from "lucide-react";

export interface ProfileCompletionCardProps {
  completionPercentage: number;
  incompleteFields: string[];
  isComplete: boolean;
}

export const ProfileCompletionCard = ({ 
  completionPercentage, 
  incompleteFields, 
  isComplete 
}: ProfileCompletionCardProps) => {
  if (isComplete) {
    return (
      <Card className="border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            Profile Complete!
          </CardTitle>
          <CardDescription>
            Your profile is looking great and is fully visible to others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Profile completion</span>
              <span className="font-medium text-green-700">100%</span>
            </div>
            <Progress value={100} className="h-2 bg-green-100 [&>div]:bg-green-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-amber-600" />
          Complete Your Profile
        </CardTitle>
        <CardDescription>
          {completionPercentage < 50 
            ? "Your profile needs more information to be fully visible" 
            : "You're making great progress! Just a few more steps"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Profile completion</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          {incompleteFields.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Missing information:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {incompleteFields.slice(0, 3).map((field, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{field}</span>
                  </motion.li>
                ))}
                {incompleteFields.length > 3 && (
                  <li className="text-xs text-muted-foreground">
                    +{incompleteFields.length - 3} more...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline" className="w-full" asChild>
          <Link to="/profile/edit">
            Complete Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
