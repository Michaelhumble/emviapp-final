
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";

export const CustomerProfileCompletionTracker = () => {
  const { userProfile } = useAuth();
  const [completion, setCompletion] = useState(0);
  
  useEffect(() => {
    if (!userProfile) {
      setCompletion(0);
      return;
    }
    
    const requiredFields = [
      'full_name',
      'location'
    ];
    
    const completedFields = requiredFields.filter(field => {
      const value = userProfile[field as keyof typeof userProfile];
      return typeof value === 'string' && value.trim().length > 0;
    });
    
    setCompletion(Math.floor((completedFields.length / requiredFields.length) * 100));
  }, [userProfile]);
  
  if (completion === 100) return null;
  
  return (
    <Card className="mb-6 bg-amber-50/50 border-amber-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-900">Complete Your Profile</h3>
            <p className="text-sm text-amber-700">
              Help us personalize your experience with a complete profile.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-amber-800">Profile Completion</span>
            <span className="font-medium text-amber-900">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
          
          <div className="grid gap-2">
            {[
              { field: 'full_name', label: 'Add your name' },
              { field: 'location', label: 'Add your location' }
            ].map(({ field, label }) => {
              const isComplete = !!userProfile?.[field as keyof typeof userProfile];
              return (
                <div key={field} className="flex items-center gap-2 text-sm">
                  {isComplete ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-amber-400" />
                  )}
                  <span className={isComplete ? 'text-green-700' : 'text-amber-800'}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
