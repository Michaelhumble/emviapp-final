
import { AlertCircle, RefreshCw, UserPlus, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SalonTeamMember } from "./types";
import TeamMemberItem from "./TeamMemberItem";
import { Button } from "@/components/ui/button";

interface TeamMembersListProps {
  teamMembers: SalonTeamMember[];
  loading: boolean;
  error: Error | null;
  onRemoveTeamMember: (memberId: string, name?: string) => void;
  onToggleMemberStatus: (memberId: string, currentStatus?: 'active' | 'inactive' | 'pending') => void;
  onEdit?: (member: SalonTeamMember) => void;
}

const TeamMembersList = ({ 
  teamMembers, 
  loading, 
  error, 
  onRemoveTeamMember, 
  onToggleMemberStatus,
  onEdit
}: TeamMembersListProps) => {
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="py-4 text-center text-gray-500">
        <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
        <p>Loading team members...</p>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center rounded-lg bg-purple-50/50 border border-purple-100">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
        <p className="text-gray-500 mb-6 text-center max-w-sm">
          Start building your dream team by inviting your first artist
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Your First Artist
        </Button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {teamMembers.map((member) => (
        <TeamMemberItem 
          key={member.id} 
          member={member} 
          onRemove={onRemoveTeamMember}
          onToggleStatus={onToggleMemberStatus}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TeamMembersList;
