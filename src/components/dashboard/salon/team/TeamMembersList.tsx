
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SalonTeamMember } from "../types";
import TeamMemberItem from "./TeamMemberItem";

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
      <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>No team members yet. Invite artists to join your salon!</p>
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
