
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TeamMember } from "./types";
import TeamMemberCard from "./TeamMemberCard";
import { BadgeX, RefreshCw } from "lucide-react";

interface TeamMembersListProps {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
  onRemoveTeamMember: (id: string, name: string) => void;
  onToggleMemberStatus: (id: string, status?: 'active' | 'inactive') => void;
  onEditMember: (member: TeamMember) => void;
  onRefresh?: () => void;
}

const TeamMembersList = ({
  teamMembers,
  loading,
  error,
  onRemoveTeamMember,
  onToggleMemberStatus,
  onEditMember,
  onRefresh
}: TeamMembersListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <BadgeX className="h-10 w-10 text-destructive mb-2" />
        <p className="text-destructive font-medium mb-2">{error}</p>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No team members found</p>
        <p className="text-sm mt-1">Invite your first team member to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop view - Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.full_name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  {member.commission_rate !== undefined ? `${member.commission_rate}%` : 'N/A'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEditMember(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleMemberStatus(member.id, member.status === 'active' ? 'inactive' : 'active')}
                    >
                      {member.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onRemoveTeamMember(member.id, member.full_name)}
                    >
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view - Cards */}
      <div className="md:hidden space-y-4">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onEdit={onEditMember}
            onToggleStatus={onToggleMemberStatus}
            onRemove={onRemoveTeamMember}
          />
        ))}
      </div>
    </>
  );
};

export default TeamMembersList;
