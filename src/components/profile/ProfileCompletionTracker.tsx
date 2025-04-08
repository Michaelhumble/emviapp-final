
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Target } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCompletionCard from "./ProfileCompletionCard";

const ProfileCompletionTracker = () => {
  const { userProfile } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);

  useEffect(() => {
    if (!userProfile) {
      setCompletionPercentage(0);
      return;
    }

    // Define required fields based on user role
    const requiredFields: Record<string, string[]> = {
      'artist': ['full_name', 'email', 'phone', 'specialty', 'bio', 'avatar_url', 'instagram', 'location'],
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
    
    const incomplete = fieldsToCheck.filter(field => {
      const value = userProfile[field as keyof typeof userProfile];
      return value === undefined || value === null || value === '';
    });
    
    setIncompleteFields(incomplete.map(formatFieldName));
    
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

  return (
    <ProfileCompletionCard />
  );
};

export default ProfileCompletionTracker;
