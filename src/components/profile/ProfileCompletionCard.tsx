
import { useAuth } from "@/context/auth/useAuth";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const ProfileCompletionCard = () => {
  const { userProfile, userRole } = useAuth();
  
  // Determine profile completion percentage based on role and filled fields
  const calculateCompletionPercentage = (): number => {
    if (!userProfile) return 0;

    let requiredFields: string[] = ['full_name'];
    let completedFields = 0;

    if (userRole === 'artist' || userRole === 'freelancer') {
      requiredFields = ['full_name', 'bio', 'specialty', 'location'];
    } else if (userRole === 'salon' || userRole === 'owner') {
      requiredFields = ['full_name', 'specialty', 'location'];
    } else if (userRole === 'vendor' || userRole === 'supplier' || userRole === 'beauty supplier') {
      requiredFields = ['full_name', 'specialty', 'website'];
    }

    // Count completed fields
    requiredFields.forEach(field => {
      if (userProfile[field as keyof typeof userProfile] && String(userProfile[field as keyof typeof userProfile]).trim() !== '') {
        completedFields++;
      }
    });

    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();
  const profileComplete = completionPercentage === 100;

  // Determine profile setup path based on user role
  const getProfileSetupPath = (): string => {
    if (userRole === 'artist' || userRole === 'nail technician/artist') {
      return '/profile/artist/setup';
    } else if (userRole === 'salon' || userRole === 'owner') {
      return '/profile/salon/setup';
    } else if (userRole === 'vendor' || userRole === 'supplier' || userRole === 'beauty supplier') {
      return '/profile/supplier/setup';
    } else if (userRole === 'freelancer') {
      return '/profile/freelancer/setup';
    } else {
      return '/profile/edit';
    }
  };

  // Return nothing if profile is complete
  if (profileComplete) {
    return null;
  }

  return (
    <Card className="border border-amber-200 bg-amber-50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserCircle className="h-5 w-5 text-amber-500 mr-2" />
            <div>
              <h3 className="font-medium text-amber-800">Complete Your Profile</h3>
              <CardDescription className="text-amber-700">
                {completionPercentage < 50 
                  ? "Start building your profile to get the most out of EmviApp" 
                  : "You're almost there! Finish setting up your profile"}
              </CardDescription>
            </div>
          </div>
          <Link to={getProfileSetupPath()}>
            <Button variant="default" size="sm" className="bg-amber-500 hover:bg-amber-600">
              {completionPercentage === 0 ? "Get Started" : "Continue Setup"}
            </Button>
          </Link>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-amber-700">Profile completion</span>
            <span className="font-medium text-amber-800">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-amber-200" 
            indicatorClassName="bg-amber-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
