
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, FileText, MapPin, Instagram, Star } from "lucide-react";

const ProfileCompletionBar = () => {
  const { userProfile } = useAuth();
  
  const calculateCompletion = () => {
    if (!userProfile) return 0;
    
    const requiredFields = [
      { name: 'Avatar', value: userProfile.avatar_url, icon: FileImage },
      { name: 'Bio', value: userProfile.bio, icon: FileText },
      { name: 'Location', value: userProfile.location, icon: MapPin },
      { name: 'Instagram', value: userProfile.instagram, icon: Instagram },
      { name: 'Specialty', value: userProfile.specialty, icon: Star },
    ];
    
    const completedFields = requiredFields.filter(field => 
      field.value && field.value.trim() !== ''
    ).length;
    
    return Math.round((completedFields / requiredFields.length) * 100);
  };
  
  const completionPercentage = calculateCompletion();
  
  // Generate color based on completion percentage
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <Card className="border-muted shadow-sm">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm font-medium">{completionPercentage}%</span>
        </div>
        
        <Progress 
          value={completionPercentage} 
          className={`h-2 mb-3 ${getProgressColor()}`}
        />
        
        <p className="text-sm text-muted-foreground text-center">
          Complete your profile to get discovered faster!
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionBar;
