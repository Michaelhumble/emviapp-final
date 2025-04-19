import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import TeamMembersList from "./TeamMembersList";
import { useTeamMembers } from "./useTeamMembers";
import { InviteTeamMemberDialog } from "./InviteTeamMemberDialog";

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

  const handleSendInvite = async (memberData: any) => {
    await sendInvite(memberData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage your salon team members</CardDescription>
        </div>
        <InviteTeamMemberDialog onInvite={sendInvite} />
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
