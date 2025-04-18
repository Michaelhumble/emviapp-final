
import React from "react";
import { useSalonTeamStats } from "../hooks/useSalonTeamStats";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamMemberStatsProps {
  timeRange: "30days" | "60days" | "90days";
}

export const TeamMemberStats: React.FC<TeamMemberStatsProps> = ({ timeRange }) => {
  const { data, isLoading, error } = useSalonTeamStats(timeRange);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-16 rounded-md" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 h-[200px] flex items-center justify-center">Error loading team data</div>;
  }

  if (!data || data.teamMembers.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
        No team member data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.teamMembers.map((member, index) => (
        <div 
          key={member.id} 
          className="flex items-center justify-between p-3 rounded-lg border"
          style={{ 
            borderLeftWidth: '4px',
            borderLeftColor: index === 0 ? '#9b87f5' : index === 1 ? '#7E69AB' : '#6E59A5'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              {index < 3 && (
                <div 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white"
                >
                  {index + 1}
                </div>
              )}
              <Avatar>
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.role}</div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="font-semibold">{member.bookingsCount} bookings</div>
            <div className="text-sm text-muted-foreground">${member.revenue.toFixed(0)} revenue</div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center mt-4">
        <Badge variant="outline" className="text-xs py-1 px-3">
          Data for {timeRange === "30days" ? "last 30 days" : timeRange === "60days" ? "last 60 days" : "last 90 days"}
        </Badge>
      </div>
    </div>
  );
};
