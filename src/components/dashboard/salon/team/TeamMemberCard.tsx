
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, UserCheck, UserX, Trash2 } from "lucide-react";
import { TeamMember } from "./types";

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onToggleStatus: (id: string, status?: 'active' | 'inactive') => void;
  onRemove: (id: string, name: string) => void;
}

const TeamMemberCard = ({ 
  member, 
  onEdit, 
  onToggleStatus, 
  onRemove 
}: TeamMemberCardProps) => {
  const isActive = member.status === 'active';
  
  const roleColors: Record<string, string> = {
    stylist: 'bg-purple-100 text-purple-800',
    artist: 'bg-blue-100 text-blue-800',
    'nail technician/artist': 'bg-pink-100 text-pink-800',
    renter: 'bg-amber-100 text-amber-800',
    admin: 'bg-red-100 text-red-800',
    owner: 'bg-emerald-100 text-emerald-800',
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
              <AvatarFallback>
                {member.full_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.full_name}</p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge 
                  variant="outline"
                  className={roleColors[member.role.toLowerCase()] || 'bg-gray-100 text-gray-800'}
                >
                  {member.role}
                </Badge>
                <Badge variant={isActive ? 'default' : 'secondary'}>
                  {isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              {member.commission_rate !== undefined && (
                <p className="text-sm mt-1">Commission: {member.commission_rate}%</p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(member)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(member.id, isActive ? 'inactive' : 'active')}>
                {isActive ? (
                  <>
                    <UserX className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onRemove(member.id, member.full_name)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
