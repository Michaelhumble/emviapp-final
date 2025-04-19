
import { SalonTeamMember } from "./types";
import { TeamMemberCard } from "./TeamMemberCard";

interface TeamListProps {
  members: SalonTeamMember[];
  bookingCounts: Record<string, number>;
}

export const TeamList = ({ members, bookingCounts }: TeamListProps) => {
  if (members.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No team members yet. Invite artists to join your salon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <TeamMemberCard 
          key={member.id} 
          member={member} 
          bookingsCount={bookingCounts[member.id] || 0}
        />
      ))}
    </div>
  );
};
