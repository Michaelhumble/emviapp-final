import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalonTeamManagement = () => {
  const navigate = useNavigate();

  const handleVoteClick = () => {
    navigate('/community#feature-voting');
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-semibold">Team Management</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              Manage your salon team members
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        {/* Coming Soon Vote CTA - Mobile Optimized */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-primary">Team Invites Coming Soon!</span>
          </div>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
            Want this feature? Vote to help us prioritize development and get notified when it's ready.
          </p>
          
          <Button 
            onClick={handleVoteClick}
            className="w-full sm:w-auto min-w-[200px] h-12 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Heart className="h-5 w-5 mr-2" />
            Vote for Team Invites
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
          
          <div className="mt-4 text-xs text-muted-foreground">
            Your vote helps us prioritize which features to build next
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonTeamManagement;