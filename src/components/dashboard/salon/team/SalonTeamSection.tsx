
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { InviteTeamDialog } from "./InviteTeamDialog";
import { TeamMemberCard } from "./TeamMemberCard";
import { useTeamMembers } from "./hooks/useTeamMembers";

export function SalonTeamSection() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { teamMembers, loading, error } = useTeamMembers();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-serif">Team Members</CardTitle>
          <Button onClick={() => setIsInviteOpen(true)} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading team members...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Failed to load team members</div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No team members yet. Invite someone to get started!
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <InviteTeamDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
      />
    </div>
  </form>
