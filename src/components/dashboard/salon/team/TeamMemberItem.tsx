
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { SalonTeamMember } from "./types";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, UserCheck, UserX, PencilIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TeamMemberItemProps {
  member: SalonTeamMember;
  onRemove: (id: string, name?: string) => void;
  onToggleStatus: (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => void;
  onEdit?: (member: SalonTeamMember) => void;
}

const TeamMemberItem = ({ member, onRemove, onToggleStatus, onEdit }: TeamMemberItemProps) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatJoinedDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleToggleStatus = () => {
    onToggleStatus(member.id, member.status);
  };

  const handleRemove = () => {
    onRemove(member.id, member.full_name);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(member);
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={member.avatar_url} alt={member.full_name} />
          <AvatarFallback>{getInitials(member.full_name)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-medium">{member.full_name}</h4>
          <p className="text-xs text-gray-500">{member.role}</p>
          <div className="flex items-center mt-1">
            {getStatusBadge(member.status)}
            <span className="text-xs text-gray-400 ml-2">
              {member.status === 'pending' 
                ? 'Invited ' + (member.invitation_sent_at ? formatJoinedDate(member.invitation_sent_at) : 'recently')
                : 'Joined ' + formatJoinedDate(member.joined_at)
              }
            </span>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onEdit && (
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleToggleStatus} className="cursor-pointer">
            {member.status === 'active' ? (
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
          <DropdownMenuItem onClick={handleRemove} className="text-red-600 cursor-pointer">
            <UserX className="h-4 w-4 mr-2" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TeamMemberItem;
