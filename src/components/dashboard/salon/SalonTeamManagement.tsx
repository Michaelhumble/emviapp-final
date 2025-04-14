
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InviteMemberModal from "./team/InviteMemberModal";
import TeamMembersList from "./team/TeamMembersList";
import { useTeamMembers } from "./team/useTeamMembers";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import EditMemberModal from "./team/EditMemberModal";
import { TeamMember } from "./team/types";

const SalonTeamManagement = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { 
    teamMembers, 
    loading, 
    error, 
    sendInvite, 
    removeTeamMember,
    toggleMemberStatus,
    updateTeamMember
  } = useTeamMembers();

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
  };

  const handleSendInvite = async (email: string, name: string, role: string, commissionRate: string) => {
    await sendInvite(email, name, role, commissionRate);
  };

  const handleSaveMember = async (member: TeamMember) => {
    await updateTeamMember(member);
    setEditingMember(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage your salon team members</CardDescription>
        </div>
        <Button 
          onClick={() => setIsInviteModalOpen(true)}
          size="sm"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </CardHeader>
      <CardContent>
        <TeamMembersList 
          teamMembers={teamMembers}
          loading={loading}
          error={error}
          onRemoveTeamMember={removeTeamMember}
          onToggleMemberStatus={toggleMemberStatus}
          onEditMember={handleEditMember}
          onRefresh={() => console.log("Refresh requested")} // Adding a stub for onRefresh
        />
      </CardContent>

      <InviteMemberModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSendInvite={handleSendInvite}
      />
      
      <EditMemberModal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onSave={handleSaveMember}
        member={editingMember}
      />
    </Card>
  );
};

export default SalonTeamManagement;
