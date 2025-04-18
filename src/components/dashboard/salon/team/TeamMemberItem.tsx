
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Check, X, UserMinus } from "lucide-react";
import { TeamMember } from "./types";

interface TeamMemberItemProps {
  member: TeamMember;
  onRemove: (id: string, name: string) => void;
  onToggleStatus: (id: string, currentStatus: 'active' | 'inactive' | undefined) => void;
}

const TeamMemberItem = ({ member, onRemove, onToggleStatus }: TeamMemberItemProps) => {
  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
          <AvatarFallback>
            {member.full_name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <p className="font-medium">{member.full_name}</p>
            {member.status && (
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                member.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-3 w-3 mr-1" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center mt-1">
            {member.role && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full mr-2">
                {member.role}
              </span>
            )}
            {member.specialty && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {member.specialty}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`h-8 w-8 p-0 ${
            member.status === 'active' 
              ? 'text-green-500 hover:text-green-700 hover:bg-green-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onToggleStatus(member.id, member.status)}
          title={member.status === 'active' ? 'Set as Inactive' : 'Set as Active'}
        >
          {member.status === 'active' ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onRemove(member.id, member.full_name)}
        >
          <UserMinus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberItem;
