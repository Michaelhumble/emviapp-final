
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h3 className="text-lg font-serif font-medium mb-1 flex items-center">
            <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
            Profile Completion
          </h3>
          <p className="text-sm text-gray-500">The more you complete, the more EmviApp works for you.</p>
        </div>
        <div className="mt-2 md:mt-0">
          {completionPercentage === 100 ? (
            <div className="flex items-center text-green-600 font-medium">
              <Check className="h-5 w-5 mr-1" /> Complete!
            </div>
          ) : (
            <Link to="/profile/edit">
              <Button size="sm">
                Complete Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <Progress value={completionPercentage} className="h-2 mb-2" />
      
      <div className="flex justify-between text-sm mt-2">
        <span className="font-medium">{completionPercentage}% Complete</span>
        {incompleteFields.length > 0 && completionPercentage < 100 && (
          <span className="text-gray-500">
            Missing: {incompleteFields.slice(0, 2).join(', ')}
            {incompleteFields.length > 2 ? ` and ${incompleteFields.length - 2} more` : ''}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCompletionTracker;
