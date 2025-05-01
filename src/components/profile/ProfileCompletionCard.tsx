
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateProfileCompletion } from "@/utils/supabase-helpers";

const ProfileCompletionCard = () => {
  const { userProfile, userRole } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile) {
      setCompletionPercentage(0);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Calculate completion percentage using the helper function
    const percentage = calculateProfileCompletion(userProfile, userRole);
    setCompletionPercentage(percentage);

    // Determine incomplete fields based on role
    const getIncompleteFields = () => {
      const fields: Record<string, string[]> = {
        'artist': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location', 'instagram', 'portfolio_urls'],
        'nail technician/artist': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location', 'instagram', 'portfolio_urls'],
        'salon': ['full_name', 'email', 'salon_name', 'location', 'bio'],
        'owner': ['full_name', 'email', 'salon_name', 'location', 'phone'],
        'customer': ['full_name', 'email', 'location', 'avatar_url'],
        'other': ['full_name', 'email']
      };

      const fieldsToCheck = fields[userRole] || fields['customer'];
      
      const incomplete = fieldsToCheck.filter(field => {
        if (field === 'portfolio_urls') {
          return !userProfile.portfolio_urls || userProfile.portfolio_urls.length === 0;
        }
        const value = userProfile[field as keyof typeof userProfile];
        return value === undefined || value === null || value === '';
      });
      
      return incomplete.map(formatFieldName);
    };

    setIncompleteFields(getIncompleteFields());
    setLoading(false);
  }, [userProfile, userRole]);

  const formatFieldName = (field: string): string => {
    switch (field) {
      case 'full_name': return 'Full Name';
      case 'avatar_url': return 'Profile Photo';
      case 'salon_name': return 'Salon Name';
      case 'portfolio_urls': return 'Portfolio Images';
      default:
        // Convert camelCase to words with spaces and capitalize first letter
        return field.replace(/([A-Z])/g, ' $1')
          .replace(/_/g, ' ')
          .replace(/^\w/, c => c.toUpperCase());
    }
  };

  if (loading) {
    return (
      <Card className="border-gray-200">
        <CardHeader className="pb-2">
          <div className="animate-pulse space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 h-5 w-5 rounded-full"></div>
              <div className="bg-gray-200 h-6 w-40 rounded"></div>
            </div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="bg-gray-200 h-2 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (completionPercentage >= 100) {
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
            <Progress value={100} className="h-2 bg-green-100" />
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

export default ProfileCompletionCard;
