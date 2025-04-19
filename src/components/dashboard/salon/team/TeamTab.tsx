
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import TeamMembersList from "./TeamMembersList";
import { useTeamMembers } from "./hooks/useTeamMembers";
import { SalonTeamMember, TeamMemberFormData } from "./types";
import TeamMemberForm from "./TeamMemberForm";
import { InviteTeamDialog } from "./InviteTeamDialog";

export default function TeamTab() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<SalonTeamMember | null>(null);
  const { teamMembers, loading, error, sendInvite, removeTeamMember, toggleMemberStatus } = useTeamMembers();

  const handleEditMember = (member: SalonTeamMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleSubmitMember = async (data: Partial<SalonTeamMember>): Promise<void> => {
    // Make sure required fields from TeamMemberFormData are present
    if (data.full_name && data.email && data.role) {
      const formData: TeamMemberFormData = {
        full_name: data.full_name,
        email: data.email,
        role: data.role,
        specialty: data.specialty,
        commission_rate: data.commission_rate
      };
      await sendInvite(formData);
    } else {
      console.error("Missing required fields for team member");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-serif">Team Members</CardTitle>
          </div>
          <Button onClick={() => setIsInviteOpen(true)} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </CardHeader>
        <CardContent>
          <TeamMembersList 
            teamMembers={teamMembers}
            loading={loading}
            error={error}
            onRemoveTeamMember={removeTeamMember}
            onToggleMemberStatus={toggleMemberStatus}
            onEdit={handleEditMember}
          />
        </CardContent>
      </Card>

      <TeamMemberForm 
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitMember}
        initialData={editingMember}
      />

      <InviteTeamDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
      />
    </div>
  );
}
