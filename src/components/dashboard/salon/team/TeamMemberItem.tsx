
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SalonTeamMember } from "../types";
import { 
  MoreHorizontal, 
  Mail, 
  UserCheck, 
  UserMinus, 
  Edit, 
  Trash2 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TeamMemberItemProps {
  member: SalonTeamMember;
  onRemove: (id: string, name?: string) => void;
  onToggleStatus: (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => void;
  onEdit?: (member: SalonTeamMember) => void;
}

const TeamMemberItem = ({ member, onRemove, onToggleStatus, onEdit }: TeamMemberItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Helper function to get status badge color
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
            <AvatarFallback className="bg-primary/10">
              {member.full_name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="font-medium">{member.full_name}</div>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span>{member.email}</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
          <div>{member.role}</div>
          {member.commission_rate && (
            <div>{member.commission_rate}% commission</div>
          )}
          {member.specialty && (
            <div>{member.specialty}</div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusBadge(member.status)}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(member)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => window.open(`mailto:${member.email}`)}>
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(member.id, member.status)}>
                {member.status === 'active' ? (
                  <>
                    <UserMinus className="h-4 w-4 mr-2" />
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
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {member.full_name} from your salon team.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => onRemove(member.id, member.full_name)}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TeamMemberItem;
