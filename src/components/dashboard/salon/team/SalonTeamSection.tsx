
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useTeamData } from "./useTeamData";
import { TeamList } from "./TeamList";
import { InviteArtistDialog } from "./InviteArtistDialog";

export const SalonTeamSection = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { teamMembers, bookingCounts, loading, error } = useTeamData();

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Failed to load team members. Please try again.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-2xl">Team Members</CardTitle>
          <CardDescription>Manage your salon's artists and staff</CardDescription>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Artist
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <TeamList members={teamMembers} bookingCounts={bookingCounts} />
        )}
      </CardContent>

      <InviteArtistDialog 
        open={inviteDialogOpen} 
        onOpenChange={setInviteDialogOpen} 
      />
    </Card>
  );
};
