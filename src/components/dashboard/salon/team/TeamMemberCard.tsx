
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SalonTeamMember } from "./types";
import { format } from "date-fns";

interface TeamMemberCardProps {
  member: SalonTeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  // Get the appropriate status badge color
  const getStatusColor = () => {
    switch (member.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 flex flex-row items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
          {member.full_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{member.full_name}</h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs ${getStatusColor()}`}>
          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 text-sm">
          {member.email && (
            <div>
              <span className="text-gray-500">Email:</span> {member.email}
            </div>
          )}
          {member.specialty && (
            <div>
              <span className="text-gray-500">Specialty:</span> {member.specialty}
            </div>
          )}
          {member.commission_rate && (
            <div>
              <span className="text-gray-500">Commission:</span> {member.commission_rate}%
            </div>
          )}
          <div>
            <span className="text-gray-500">Joined:</span> {format(new Date(member.joined_at), 'MMM d, yyyy')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
