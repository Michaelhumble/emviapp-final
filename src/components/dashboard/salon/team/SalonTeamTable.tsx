
import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, UserX, UserCheck, Mail, Edit, UserCog, Search
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SalonTeamMember } from "../types";
import { format, parseISO } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SalonTeamTableProps {
  teamMembers: SalonTeamMember[];
  loading: boolean;
  onRemoveTeamMember: (id: string) => void;
  onToggleStatus: (id: string, status: 'active' | 'inactive') => void;
  onResendInvite: (email: string) => void;
}

const SalonTeamTable: React.FC<SalonTeamTableProps> = ({
  teamMembers,
  loading,
  onRemoveTeamMember,
  onToggleStatus,
  onResendInvite
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMembers = teamMembers.filter(member => 
    member.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) || ''
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Specialty</TableHead>
              <TableHead className="font-medium">Role</TableHead>
              <TableHead className="font-medium">Joined</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  {searchQuery ? "No team members match your search" : "No team members found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
                        <AvatarFallback className="bg-purple-100 text-purple-800">
                          {getInitials(member.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.full_name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.specialty || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(member.joined_at)}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        
                        {member.status === 'pending' ? (
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => onResendInvite(member.email)}
                          >
                            <Mail className="h-4 w-4" /> Resend Invite
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => onToggleStatus(
                              member.id, 
                              member.status === 'active' ? 'inactive' : 'active'
                            )}
                          >
                            {member.status === 'active' ? (
                              <><UserX className="h-4 w-4" /> Deactivate</>
                            ) : (
                              <><UserCheck className="h-4 w-4" /> Activate</>
                            )}
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-red-600"
                          onClick={() => onRemoveTeamMember(member.id)}
                        >
                          <UserX className="h-4 w-4" /> Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalonTeamTable;
