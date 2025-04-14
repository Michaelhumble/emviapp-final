
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InviteMemberModal from "./team/InviteMemberModal";
import TeamMembersList from "./team/TeamMembersList";
import { useTeamMembers } from "./team/useTeamMembers";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const SalonTeamManagement = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { 
    teamMembers, 
    loading, 
    error, 
    sendInvite, 
    removeTeamMember,
    toggleMemberStatus,
  } = useTeamMembers();

  // Add a stub function for onEditMember to fix the missing prop error
  const handleEditMember = (member: any) => {
    console.log("Edit member:", member);
    // This is a placeholder. In the real implementation, 
    // you would open an edit modal or navigate to an edit page
  };

  const handleSendInvite = async (email: string, name: string, role: string, commissionRate: string = '60') => {
    // Added commissionRate parameter with default value to match expected 4 arguments
    await sendInvite(email, name, role, commissionRate);
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
    </Card>
  );
};

export default SalonTeamManagement;
