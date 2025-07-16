
import { AlertCircle, RefreshCw, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SalonTeamMember, SalonStaffRole } from "./types";
import TeamMemberItem from "./TeamMemberItem";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface TeamMembersListProps {
  teamMembers: SalonTeamMember[];
  loading: boolean;
  error: Error | null;
  onEdit?: (member: SalonTeamMember) => void;
  onRemoveTeamMember?: (id: string, name?: string) => Promise<void>;
  onToggleMemberStatus?: (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => Promise<void>;
  userRole?: SalonStaffRole | null;
}

const TeamMembersList = ({ 
  teamMembers, 
  loading, 
  error,
  onEdit,
  onRemoveTeamMember,
  onToggleMemberStatus,
  userRole
}: TeamMembersListProps) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div>
            <strong>Error loading team members:</strong>
            <br />
            {error.message}
            <br />
            <small className="text-xs opacity-75 mt-2 block">
              This might be due to missing salon context or database permissions. 
              Check that your salon is properly selected and you have owner permissions.
            </small>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-500">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading team members...</p>
        <p className="text-xs text-gray-400 mt-1">Please wait while we fetch your team data</p>
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
        <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">
          Start building your dream team by inviting your first artist or staff member
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Your First Team Member
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Found {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
      </div>
      <div className="divide-y divide-gray-100">
        {teamMembers.map((member) => (
          <TeamMemberItem 
            key={member.id} 
            member={member}
            onEdit={onEdit}
            onRemove={onRemoveTeamMember}
            onToggleStatus={onToggleMemberStatus}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersList;
