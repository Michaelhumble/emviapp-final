
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import TeamMembersList from "./TeamMembersList";
import { useTeamMembers } from "./hooks/useTeamMembers";
import { InviteTeamMemberDialog } from "./InviteTeamMemberDialog";
import { useSalonRolePermissions } from "@/hooks/useSalonRolePermissions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TeamMemberFormData } from "./types";

const SalonTeamManagement = () => {
  const { 
    teamMembers, 
    loading, 
    error, 
    sendInvite, 
    removeTeamMember,
    toggleMemberStatus,
  } = useTeamMembers();
  
  const { 
    canInviteTeamMembers, 
    canEditTeam, 
    userRole 
  } = useSalonRolePermissions();

  const handleSendInvite = async (memberData: TeamMemberFormData) => {
    await sendInvite(memberData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage your salon team members</CardDescription>
        </div>
        {canInviteTeamMembers ? (
          <InviteTeamMemberDialog 
            onInvite={handleSendInvite} 
            disabled={!canInviteTeamMembers}
          />
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Only owners and managers can invite team members</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        <TeamMembersList 
          teamMembers={teamMembers}
          loading={loading}
          error={error}
          onRemoveTeamMember={canEditTeam ? removeTeamMember : undefined}
          onToggleMemberStatus={canEditTeam ? toggleMemberStatus : undefined}
          userRole={userRole}
        />
      </CardContent>
    </Card>
  );
};

export default SalonTeamManagement;
