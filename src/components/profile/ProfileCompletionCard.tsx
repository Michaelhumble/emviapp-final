
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProfileCompletionCard = () => {
  const { userProfile, userRole } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  
  useEffect(() => {
    if (!userProfile) return;
    
    const requiredFields: Record<string, string[]> = {
      base: ['full_name', 'email', 'avatar_url', 'phone'],
      artist: ['specialty', 'location', 'bio', 'instagram'],
      salon: ['salon_name', 'location', 'bio', 'phone', 'instagram', 'website'],
      customer: ['location'],
      vendor: ['company_name', 'product_type', 'website', 'phone'],
      freelancer: ['specialty', 'location', 'bio', 'instagram', 'website'],
      other: ['bio', 'phone']
    };
    
    // Determine which field set to use
    let fieldSet = ['full_name', 'email'];
    if (userRole === 'artist' || userRole === 'nail technician/artist') {
      fieldSet = [...requiredFields.base, ...requiredFields.artist];
    } else if (userRole === 'salon' || userRole === 'owner') {
      fieldSet = [...requiredFields.base, ...requiredFields.salon];
    } else if (userRole === 'vendor' || userRole === 'supplier' || userRole === 'beauty supplier') {
      fieldSet = [...requiredFields.base, ...requiredFields.vendor];
    } else if (userRole === 'freelancer') {
      fieldSet = [...requiredFields.base, ...requiredFields.freelancer];
    } else if (userRole === 'customer') {
      fieldSet = [...requiredFields.base, ...requiredFields.customer];
    } else {
      fieldSet = [...requiredFields.base, ...requiredFields.other];
    }
    
    // Count completed fields
    let completedCount = 0;
    const missing: string[] = [];
    
    fieldSet.forEach(field => {
      if (userProfile[field as keyof typeof userProfile]) {
        completedCount++;
      } else {
        // Convert field_name to Field Name format
        const displayName = field
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        missing.push(displayName);
      }
    });
    
    const percentage = Math.round((completedCount / fieldSet.length) * 100);
    setCompletionPercentage(percentage);
    setMissingFields(missing.slice(0, 3)); // Only show first 3 missing fields
  }, [userProfile, userRole]);
  
  if (!userProfile || completionPercentage >= 100) return null;
  
  return (
    <Card className="overflow-hidden border-primary/20">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Complete your profile</h3>
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            
            {missingFields.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Missing: {missingFields.join(', ')}
                {missingFields.length < 3 ? '' : '...'}
              </p>
            )}
          </div>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/profile/edit">Complete Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
