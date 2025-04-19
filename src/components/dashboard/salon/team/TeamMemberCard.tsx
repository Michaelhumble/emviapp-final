
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SalonTeamMember } from "./types";
import { Calendar, DollarSign } from "lucide-react";
import { useTeamMemberStats } from "./hooks/useTeamMemberStats";
import { formatCurrency } from "@/lib/utils";

interface TeamMemberCardProps {
  member: SalonTeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const { data: stats } = useTeamMemberStats(member.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
              <AvatarFallback>
                {member.full_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium text-base">{member.full_name}</h3>
              {member.specialty && (
                <p className="text-sm text-muted-foreground mb-2">{member.specialty}</p>
              )}
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="outline" 
                  className={getStatusColor(member.status)}
                >
                  {member.status === 'active' ? 'Available' : member.status === 'pending' ? 'Pending' : 'Off Today'}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                  <Calendar className="h-3 w-3 mr-1" />
                  {stats?.bookingsCount ? `${stats.bookingsCount} bookings this week` : 'No bookings yet'}
                </Badge>
                {stats?.totalEarnings > 0 && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {formatCurrency(stats.totalEarnings)} this week
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
