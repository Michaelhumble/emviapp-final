
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserProfile } from "@/context/auth/types";

interface FreelancerProfileTrackerProps {
  userProfile: UserProfile | null;
}

export const FreelancerProfileTracker = ({ userProfile }: FreelancerProfileTrackerProps) => {
  if (!userProfile) return null;
  
  const requiredFields = [
    { key: 'full_name', label: 'Full Name' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'location', label: 'Location' },
    { key: 'bio', label: 'Bio' }
  ];
  
  const completedFields = requiredFields.filter(field => {
    const value = userProfile[field.key as keyof UserProfile];
    return typeof value === 'string' && value.trim().length > 0 &&
           (field.key !== 'bio' || (value.length >= 10));
  });
  
  const completion = Math.floor((completedFields.length / requiredFields.length) * 100);
  
  if (completion === 100) return null;
  
  return (
    <Card className="p-4 mb-6 bg-amber-50/50 border-amber-200">
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-amber-900">
          <span>Profile Completion</span>
          <span className="font-medium">{completion}%</span>
        </div>
        
        <Progress value={completion} className="h-2" />
        
        <div className="space-y-2">
          <p className="text-sm text-amber-800">Required information:</p>
          <ul className="text-sm space-y-1">
            {requiredFields.map(field => {
              const isComplete = completedFields.some(f => f.key === field.key);
              return (
                <li key={field.key} className="flex items-center gap-2">
                  {isComplete ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-amber-500">○</span>
                  )}
                  <span className={isComplete ? "text-green-700" : "text-amber-800"}>
                    {field.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
};
