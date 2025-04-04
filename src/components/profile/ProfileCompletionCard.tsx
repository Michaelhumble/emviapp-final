
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";

const ProfileCompletionCard = () => {
  const { userProfile, userRole } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  useEffect(() => {
    if (!userProfile) return;
    
    // Calculate completion percentage based on role and filled fields
    calculateCompletion();
  }, [userProfile]);
  
  const calculateCompletion = () => {
    if (!userProfile) return;
    
    const missing: string[] = [];
    let totalFields = 0;
    let completedFields = 0;
    
    // Common fields for all roles
    const commonFields: Array<{key: keyof typeof userProfile, label: string}> = [
      { key: 'full_name', label: 'Full Name' },
      { key: 'avatar_url', label: 'Profile Photo' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'location', label: 'Location' }
    ];
    
    // Role-specific fields
    let roleSpecificFields: Array<{key: keyof typeof userProfile, label: string}> = [];
    
    switch(userRole) {
      case 'artist':
      case 'nail technician/artist':
        roleSpecificFields = [
          { key: 'specialty', label: 'Specialty' },
          { key: 'bio', label: 'Bio' },
          { key: 'instagram', label: 'Instagram' }
        ];
        break;
      
      case 'salon':
      case 'owner':
        roleSpecificFields = [
          { key: 'salon_name', label: 'Salon Name' },
          { key: 'business_address', label: 'Business Address' },
          { key: 'website', label: 'Website' }
        ];
        break;
        
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        roleSpecificFields = [
          { key: 'company_name', label: 'Company Name' },
          { key: 'product_type', label: 'Product Type' },
          { key: 'website', label: 'Website' }
        ];
        break;
        
      case 'freelancer':
        roleSpecificFields = [
          { key: 'specialty', label: 'Specialty' },
          { key: 'bio', label: 'Bio' },
          { key: 'instagram', label: 'Instagram' }
        ];
        break;
        
      case 'customer':
      default:
        roleSpecificFields = [
          { key: 'bio', label: 'Personal Preferences' }
        ];
    }
    
    // Combine fields and check completion
    const allFields = [...commonFields, ...roleSpecificFields];
    totalFields = allFields.length;
    
    allFields.forEach(({ key, label }) => {
      if (userProfile[key]) {
        completedFields++;
      } else {
        missing.push(label);
      }
    });
    
    // Calculate percentage
    const percentage = Math.round((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
    setMissingFields(missing);
  };
  
  const getProfileSetupPath = () => {
    switch(userRole) {
      case 'artist':
      case 'nail technician/artist':
        return '/profile/artist/setup';
      case 'salon':
        return '/profile/salon/setup';
      case 'owner':
        return '/profile/salon/setup';
      case 'freelancer':
        return '/profile/freelancer/setup';
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        return '/profile/supplier/setup';
      case 'customer':
        return '/profile/customer/setup';
      default:
        return '/profile/edit';
    }
  };

  if (!userProfile) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <UserCog className="mr-2 h-5 w-5 text-primary" />
          Profile Completion
        </CardTitle>
        <CardDescription>Complete your profile to get more visibility</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{completionPercentage}% Complete</span>
              <span>{completionPercentage === 100 ? (
                <span className="text-primary flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Complete
                </span>
              ) : (
                <span className="text-muted-foreground">{missingFields.length} items left</span>
              )}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          {completionPercentage < 100 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Missing information:</p>
              <ul className="text-sm space-y-1 mb-3">
                {missingFields.slice(0, 3).map((field, index) => (
                  <li key={index} className="flex items-center">
                    <CircleDashed className="h-3 w-3 mr-2 text-muted-foreground" />
                    {field}
                  </li>
                ))}
                {missingFields.length > 3 && (
                  <li className="text-xs text-muted-foreground">
                    +{missingFields.length - 3} more items
                  </li>
                )}
              </ul>
              <Link to={getProfileSetupPath()}>
                <Button size="sm" variant="outline" className="w-full">
                  Complete Profile
                </Button>
              </Link>
            </div>
          )}
          
          {completionPercentage === 100 && (
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground">Your profile looks great!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
