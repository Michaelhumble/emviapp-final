
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import TeamMembersList from "./TeamMembersList";
import TeamMemberForm from "./TeamMemberForm";
import { useTeamMembers } from "./useTeamMembers";
import { SalonTeamMember } from "../types";

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
            members={teamMembers}
            loading={loading}
            error={error}
            onEdit={handleEditMember}
            onRemove={removeTeamMember}
            onToggleStatus={toggleMemberStatus}
          />
        </CardContent>
      </Card>

      <TeamMemberForm 
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={sendInvite}
        initialData={editingMember}
      />
    </div>
  );
}
