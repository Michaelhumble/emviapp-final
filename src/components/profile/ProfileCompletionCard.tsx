
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileCompletionCard = () => {
  const { userProfile } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  useEffect(() => {
    if (!userProfile) {
      setCompletionPercentage(0);
      return;
    }

    // Define required fields based on user role
    const requiredFields: Record<string, string[]> = {
      'artist': ['full_name', 'email', 'phone', 'specialty', 'bio', 'avatar_url', 'instagram'],
      'nail technician/artist': ['full_name', 'email', 'phone', 'specialty', 'bio', 'avatar_url', 'instagram'],
      'salon': ['full_name', 'email', 'phone', 'salon_name', 'location', 'bio'],
      'owner': ['full_name', 'email', 'phone', 'salon_name', 'location'],
      'vendor': ['full_name', 'email', 'phone', 'company_name', 'product_type'],
      'supplier': ['full_name', 'email', 'phone', 'company_name', 'product_type'],
      'beauty supplier': ['full_name', 'email', 'phone', 'company_name', 'product_type'],
      'freelancer': ['full_name', 'email', 'phone', 'specialty', 'bio', 'avatar_url'],
      'renter': ['full_name', 'email', 'phone', 'specialty', 'bio'],
      'customer': ['full_name', 'email', 'location'],
      'other': ['full_name', 'email'],
    };

    // Get the required fields for the user's role
    const fieldsToCheck = requiredFields[userProfile.role || 'customer'] || requiredFields['customer'];
    
    // Count how many required fields are filled
    const filledFields = fieldsToCheck.filter(field => {
      const value = userProfile[field as keyof typeof userProfile];
      return value !== undefined && value !== null && value !== '';
    });
    
    const missing = fieldsToCheck.filter(field => {
      const value = userProfile[field as keyof typeof userProfile];
      return value === undefined || value === null || value === '';
    });
    
    setMissingFields(missing.map(formatFieldName));
    
    // Calculate completion percentage
    const percentage = Math.floor((filledFields.length / fieldsToCheck.length) * 100);
    setCompletionPercentage(percentage);
  }, [userProfile]);

  const formatFieldName = (field: string): string => {
    switch (field) {
      case 'full_name': return 'Full Name';
      case 'avatar_url': return 'Profile Photo';
      case 'salon_name': return 'Salon Name';
      case 'company_name': return 'Company Name';
      case 'product_type': return 'Product Type';
      default:
        // Convert camelCase to words with spaces and capitalize first letter
        return field.replace(/([A-Z])/g, ' $1')
          .replace(/_/g, ' ')
          .replace(/^\w/, c => c.toUpperCase());
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <Card className={`shadow-sm ${completionPercentage === 100 ? 'bg-green-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium mb-1">
              {completionPercentage === 100 ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Profile Complete
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                  Complete Your Profile: {completionPercentage}%
                </div>
              )}
            </h3>
            
            {completionPercentage < 100 && (
              <div className="mb-2">
                <Progress value={completionPercentage} className="h-2" />
              </div>
            )}
            
            {missingFields.length > 0 && completionPercentage < 100 && (
              <p className="text-sm text-gray-500 mt-2">
                Missing: {missingFields.slice(0, 2).join(', ')}
                {missingFields.length > 2 ? ` and ${missingFields.length - 2} more` : ''}
              </p>
            )}
          </div>
          
          <Link to="/profile/edit">
            <Button variant={completionPercentage === 100 ? "outline" : "default"} size="sm">
              {completionPercentage === 100 ? "Edit Profile" : "Complete Now"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
