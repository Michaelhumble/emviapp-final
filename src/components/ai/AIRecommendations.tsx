
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { isRoleEquivalent } from "@/utils/roleUtils";

const AIRecommendations = () => {
  const { userRole } = useAuth();
  
  // Role-specific recommendation title
  const getTitle = () => {
    if (isRoleEquivalent(userRole, ['artist'])) {
      return "Jobs For You";
    }
    
    if (isRoleEquivalent(userRole, ['salon', 'owner', 'salon_owner'])) {
      return "Top Artist Matches";
    }
    
    if (isRoleEquivalent(userRole, ['customer'])) {
      return "For Your Next Appointment";
    }
    
    if (isRoleEquivalent(userRole, ['freelancer'])) {
      return "Gig Opportunities";
    }
    
    if (isRoleEquivalent(userRole, ['vendor', 'supplier', 'beauty supplier'])) {
      return "Business Leads";
    }
    
    return "Personalized Recommendations";
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-2">
        <CardTitle className="text-base flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-primary" />
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          <p className="text-sm">
            AI-powered recommendations will appear here based on your activity and profile.
          </p>
          <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Personalized content loading...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
