
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { SalonTeamMember } from "../types";
import { 
  MoreHorizontal, 
  Mail, 
  UserCheck, 
  UserMinus, 
  Edit, 
  Trash2,
  RefreshCw
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
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

interface SalonTeamTableProps {
  teamMembers: SalonTeamMember[];
  loading: boolean;
  onRemoveTeamMember: (id: string, name?: string) => void;
  onToggleStatus: (id: string, currentStatus?: string) => void;
  onResendInvite?: (id: string, email: string) => void;
}

const SalonTeamTable = ({ 
  teamMembers, 
  loading, 
  onRemoveTeamMember, 
  onToggleStatus,
  onResendInvite 
}: SalonTeamTableProps) => {
  const [memberToDelete, setMemberToDelete] = useState<SalonTeamMember | null>(null);

  // Get status badge component based on status
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Unknown</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50">
        <p className="text-gray-500 mb-2">No team members have been added yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
                      <AvatarFallback className="bg-primary/10">
                        {member.full_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{member.full_name}</div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {member.role}
                    {member.specialty && (
                      <div className="text-xs text-gray-500">{member.specialty}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(member.joined_at)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                      
                      {onResendInvite && member.status === 'pending' && (
                        <DropdownMenuItem onClick={() => onResendInvite(member.id, member.email)}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Resend Invite
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => setMemberToDelete(member)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog 
        open={memberToDelete !== null} 
        onOpenChange={(open) => !open && setMemberToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {memberToDelete?.full_name} from your salon team.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (memberToDelete) {
                  onRemoveTeamMember(memberToDelete.id, memberToDelete.full_name);
                  setMemberToDelete(null);
                }
              }}
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

export default SalonTeamTable;
