
import { SalonTeamMember, SalonStaffRole } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Pencil, Trash2, PowerOff } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";

interface TeamMemberItemProps {
  member: SalonTeamMember;
  onEdit?: (member: SalonTeamMember) => void;
  onRemove?: (id: string, name?: string) => Promise<void>;
  onToggleStatus?: (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => Promise<void>;
  userRole?: SalonStaffRole | null;
}

const TeamMemberItem = ({ 
  member,
  onEdit,
  onRemove,
  onToggleStatus,
  userRole
}: TeamMemberItemProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const memberSince = member.joined_at 
    ? formatDistance(new Date(member.joined_at), new Date(), { addSuffix: true })
    : 'Recently';

  return (
    <div className="py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={member.avatar_url} alt={member.full_name} />
          <AvatarFallback>{getInitials(member.full_name)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900">{member.full_name}</div>
          <div className="text-sm text-gray-500">{member.role}</div>
          <div className="text-xs text-gray-400 mt-1">Joined {memberSince}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member.status)}`}>
          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(member)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            )}
            {onToggleStatus && (
              <DropdownMenuItem onClick={() => onToggleStatus(member.id, member.status)}>
                <PowerOff className="h-4 w-4 mr-2" />
                {member.status === 'active' ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
            )}
            {onRemove && (
              <DropdownMenuItem 
                onClick={() => onRemove(member.id, member.full_name)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TeamMemberItem;
