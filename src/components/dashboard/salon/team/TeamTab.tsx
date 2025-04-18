
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import TeamMembersList from "./TeamMembersList";
import { useTeamMembers } from "./useTeamMembers";
import { SalonTeamMember } from "../types";
import TeamMemberForm from "./TeamMemberForm";

export default function TeamTab() {
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  // Fix: convert return type to void, discarding the result
  const handleSubmitMember = async (data: Partial<SalonTeamMember>): Promise<void> => {
    await sendInvite(data);
    // Promise resolved, no return value needed
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-serif">Team Members</CardTitle>
          </div>
          <Button onClick={() => setIsFormOpen(true)} size="sm">
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
    </div>
  );
}
