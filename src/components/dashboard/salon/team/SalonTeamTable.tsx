
import { useState } from "react";
import { SalonTeamMember } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Trash2, UserCheck, UserMinus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import TeamMemberForm from "./TeamMemberForm";
import { Skeleton } from "@/components/ui/skeleton";

interface SalonTeamTableProps {
  teamMembers: SalonTeamMember[];
  loading: boolean;
  onRemoveTeamMember: (id: string, name?: string) => void;
  onToggleStatus: (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => void;
  onUpdateTeamMember?: (id: string, data: Partial<SalonTeamMember>) => Promise<void>;
}

const SalonTeamTable = ({ 
  teamMembers, 
  loading, 
  onRemoveTeamMember, 
  onToggleStatus,
  onUpdateTeamMember 
}: SalonTeamTableProps) => {
  const [memberToEdit, setMemberToEdit] = useState<SalonTeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<SalonTeamMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (member: SalonTeamMember) => {
    setMemberToEdit(member);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (member: SalonTeamMember) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      onRemoveTeamMember(memberToDelete.id, memberToDelete.full_name);
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleUpdateMember = async (data: Partial<SalonTeamMember>) => {
    if (memberToEdit && onUpdateTeamMember) {
      await onUpdateTeamMember(memberToEdit.id, data);
      setIsEditModalOpen(false);
      setMemberToEdit(null);
    }
  };

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

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Team Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-5 w-14" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-md ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-gray-500">No team members found. Add your first team member to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Team Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
                      <AvatarFallback className="bg-purple-100 text-purple-800">
                        {member.full_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.full_name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.commission_rate || '-'}%</TableCell>
                <TableCell>{member.specialty || '-'}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(member)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
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
                        onClick={() => handleDeleteConfirm(member)}
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

      <TeamMemberForm
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setMemberToEdit(null);
        }}
        onSubmit={handleUpdateMember}
        initialData={memberToEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
              onClick={confirmDelete}
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
