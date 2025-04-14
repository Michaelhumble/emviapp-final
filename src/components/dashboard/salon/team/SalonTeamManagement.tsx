
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamMember } from "./types";
import { useTeamMembers } from "./useTeamMembers";
import TeamMembersList from "./TeamMembersList";
import TeamInviteModal from "./TeamInviteModal";
import EditMemberModal from "./EditMemberModal";
import { Filter, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterStatus = 'all' | 'active' | 'inactive';

const SalonTeamManagement = () => {
  const { 
    teamMembers, 
    loading, 
    error, 
    sendInvite, 
    removeTeamMember,
    toggleMemberStatus,
    updateTeamMember,
    refreshTeamMembers
  } = useTeamMembers();
  
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  const handleSendInvite = async (email: string, name: string, role: string, commissionRate: string) => {
    await sendInvite(email, name, role, commissionRate);
  };
  
  const handleEditMember = (member: TeamMember) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };
  
  const handleSaveMember = async (member: TeamMember) => {
    await updateTeamMember(member);
  };
  
  const filteredTeamMembers = teamMembers.filter(member => {
    if (filterStatus === 'all') return true;
    return member.status === filterStatus;
  });
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage your salon team members and artists</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus === 'all' ? 'All' : filterStatus === 'active' ? 'Active' : 'Inactive'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Team Members
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                Inactive Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setIsInviteModalOpen(true)} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TeamMembersList 
          teamMembers={filteredTeamMembers}
          loading={loading}
          error={error}
          onRemoveTeamMember={removeTeamMember}
          onToggleMemberStatus={toggleMemberStatus}
          onEditMember={handleEditMember}
          onRefresh={refreshTeamMembers}
        />
      </CardContent>
      
      <TeamInviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSendInvite={handleSendInvite}
      />
      
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveMember}
        member={currentMember}
      />
    </Card>
  );
};

export default SalonTeamManagement;
