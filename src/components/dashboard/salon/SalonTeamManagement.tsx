import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TeamMembersList from "./team/TeamMembersList";
import { useTeamMembers } from "./manager/hooks/useTeamMembers";
import { Button } from "@/components/ui/button";
import { Heart, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalonTeamManagement = () => {
  const navigate = useNavigate();
  const { 
    teamMembers, 
    loading, 
    error, 
    removeTeamMember,
    toggleMemberStatus,
  } = useTeamMembers();

  const handleVoteClick = () => {
    navigate('/community#feature-voting');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage your salon team members</CardDescription>
        </div>
        
        {/* Coming Soon Vote CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Team Invites Coming Soon!</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Want this feature? Vote to help us prioritize.
          </p>
          <Button 
            onClick={handleVoteClick}
            size="sm"
            className="w-full"
          >
            <Heart className="h-4 w-4 mr-2" />
            Vote for Team Invites
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <TeamMembersList 
          teamMembers={teamMembers}
          loading={loading}
          error={error}
          onRemoveTeamMember={removeTeamMember}
          onToggleMemberStatus={toggleMemberStatus}
        />
      </CardContent>
    </Card>
  );
};

export default SalonTeamManagement;