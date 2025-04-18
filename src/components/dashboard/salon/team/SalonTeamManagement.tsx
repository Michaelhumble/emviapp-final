
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InviteMemberModal from "./InviteMemberModal";
import SalonTeamTable from "./SalonTeamTable";
import { useTeamMembers } from "./useTeamMembers";
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCcw } from "lucide-react";

const SalonTeamManagement = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { 
    teamMembers, 
    loading, 
    error, 
    fetchTeamMembers,
    sendInvite, 
    removeTeamMember,
    toggleMemberStatus,
  } = useTeamMembers();

  const handleSendInvite = async (memberData: Partial<any>) => {
    await sendInvite(memberData);
  };

  return (
    <Card className="border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-serif text-purple-900">Team Management</CardTitle>
          <CardDescription>Manage your salon team members and permissions</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-purple-600"
            onClick={fetchTeamMembers}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={() => setIsInviteModalOpen(true)}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-2">{error.message}</p>
            <Button 
              variant="outline" 
              onClick={fetchTeamMembers}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <SalonTeamTable 
            teamMembers={teamMembers}
            loading={loading}
            onRemoveTeamMember={removeTeamMember}
            onToggleStatus={toggleMemberStatus}
          />
        )}
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
