
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
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
  TableRow,
} from "@/components/ui/table";
import { 
  UserPlus, 
  MoreVertical, 
  Check, 
  X, 
  Filter, 
  Edit, 
  Trash2, 
  RefreshCw 
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";

type StaffMember = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  status: 'active' | 'inactive';
  specialty?: string;
  commission_rate?: number;
};

type FilterStatus = 'all' | 'active' | 'inactive';

const SalonTeamManager = () => {
  const { currentSalon } = useSalon();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  // Add team member modal state
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    full_name: '',
    email: '',
    role: 'stylist',
    commission_rate: '',
  });
  
  // Edit team member modal state
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  
  const fetchStaffMembers = async () => {
    if (!currentSalon?.id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('salon_staff')
        .select('*')
        .eq('salon_id', currentSalon.id);
      
      if (error) throw error;
      
      setStaffMembers(data || []);
    } catch (err) {
      console.error('Error fetching staff members:', err);
      setError('Failed to load staff members. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (currentSalon?.id) {
      fetchStaffMembers();
    }
  }, [currentSalon?.id]);
  
  const handleAddTeamMember = async () => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return;
    }
    
    if (!newMember.email || !newMember.full_name) {
      toast.error("Please provide both name and email");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: currentSalon.id,
          full_name: newMember.full_name,
          email: newMember.email,
          role: newMember.role,
          status: 'active',
          commission_rate: newMember.commission_rate ? 
            parseFloat(newMember.commission_rate) : null,
        })
        .select();
      
      if (error) throw error;
      
      setStaffMembers(prev => [...prev, data[0]]);
      setIsAddMemberOpen(false);
      setNewMember({
        full_name: '',
        email: '',
        role: 'stylist',
        commission_rate: '',
      });
      
      toast.success(`${newMember.full_name} has been added to your team`);
    } catch (err) {
      console.error('Error adding team member:', err);
      toast.error('Failed to add team member. Please try again.');
    }
  };
  
  const handleEditTeamMember = async () => {
    if (!editingMember || !currentSalon?.id) return;
    
    try {
      const { error } = await supabase
        .from('salon_staff')
        .update({
          full_name: editingMember.full_name,
          email: editingMember.email,
          role: editingMember.role,
          commission_rate: editingMember.commission_rate || null,
        })
        .eq('id', editingMember.id)
        .eq('salon_id', currentSalon.id);
      
      if (error) throw error;
      
      setStaffMembers(prev => 
        prev.map(member => 
          member.id === editingMember.id ? editingMember : member
        )
      );
      setIsEditMemberOpen(false);
      setEditingMember(null);
      
      toast.success(`Team member information updated`);
    } catch (err) {
      console.error('Error updating team member:', err);
      toast.error('Failed to update team member. Please try again.');
    }
  };
  
  const handleToggleMemberStatus = async (member: StaffMember) => {
    try {
      const newStatus = member.status === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: newStatus })
        .eq('id', member.id);
      
      if (error) throw error;
      
      setStaffMembers(prev => 
        prev.map(m => 
          m.id === member.id ? { ...m, status: newStatus as 'active' | 'inactive' } : m
        )
      );
      
      toast.success(`${member.full_name} is now ${newStatus}`);
    } catch (err) {
      console.error('Error toggling status:', err);
      toast.error('Failed to update status. Please try again.');
    }
  };
  
  const handleRemoveMember = async (member: StaffMember) => {
    if (!window.confirm(`Are you sure you want to remove ${member.full_name} from your team?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('salon_staff')
        .delete()
        .eq('id', member.id);
      
      if (error) throw error;
      
      setStaffMembers(prev => prev.filter(m => m.id !== member.id));
      toast.success(`${member.full_name} has been removed from your team`);
    } catch (err) {
      console.error('Error removing team member:', err);
      toast.error('Failed to remove team member. Please try again.');
    }
  };
  
  const filteredStaffMembers = staffMembers.filter(member => {
    if (filterStatus === 'all') return true;
    return member.status === filterStatus;
  });
  
  const startEditMember = (member: StaffMember) => {
    setEditingMember({...member, commission_rate: member.commission_rate || 0});
    setIsEditMemberOpen(true);
  };
  
  const renderRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      stylist: 'bg-purple-100 text-purple-800',
      artist: 'bg-blue-100 text-blue-800',
      'nail technician/artist': 'bg-pink-100 text-pink-800',
      renter: 'bg-amber-100 text-amber-800',
      admin: 'bg-red-100 text-red-800',
      owner: 'bg-emerald-100 text-emerald-800',
    };
    
    return (
      <Badge variant="outline" className={`${roleColors[role.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </Badge>
    );
  };
  
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Team</CardTitle>
          <CardDescription>Manage your salon team members</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus === 'all' ? 'All' : filterStatus === 'active' ? 'Active' : 'Inactive'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                Inactive Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setIsAddMemberOpen(true)} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-gray-500">
            <RefreshCw className="h-6 w-6 animate-spin mb-2" />
            <p>Loading team members...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={fetchStaffMembers}
            >
              Try Again
            </Button>
          </div>
        ) : filteredStaffMembers.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>No team members found. Start by adding your first team member!</p>
          </div>
        ) : (
          <div>
            {/* Desktop view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaffMembers.map(member => (
                    <TableRow key={member.id}>
                      <TableCell>
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
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{renderRoleBadge(member.role)}</TableCell>
                      <TableCell>
                        {member.commission_rate !== undefined && member.commission_rate !== null
                          ? `${member.commission_rate}%`
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => startEditMember(member)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleMemberStatus(member)}>
                              {member.status === 'active' ? 
                                <X className="h-4 w-4 mr-2" /> : 
                                <Check className="h-4 w-4 mr-2" />}
                              {member.status === 'active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleRemoveMember(member)}
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
            
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {filteredStaffMembers.map(member => (
                <Card key={member.id}>
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
                            {renderRoleBadge(member.role)}
                            <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                              {member.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          {member.commission_rate !== undefined && member.commission_rate !== null && (
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
                          <DropdownMenuItem onClick={() => startEditMember(member)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleMemberStatus(member)}>
                            {member.status === 'active' ? 
                              <X className="h-4 w-4 mr-2" /> : 
                              <Check className="h-4 w-4 mr-2" />}
                            {member.status === 'active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleRemoveMember(member)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Add Team Member Dialog */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new team member to your salon. They'll receive an invitation to join your team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter full name"
                value={newMember.full_name}
                onChange={(e) => setNewMember({...newMember, full_name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newMember.role} 
                onValueChange={(val) => setNewMember({...newMember, role: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stylist">Hair Stylist</SelectItem>
                  <SelectItem value="artist">Hair Artist</SelectItem>
                  <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                  <SelectItem value="renter">Booth Renter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                placeholder="Optional"
                value={newMember.commission_rate}
                onChange={(e) => setNewMember({...newMember, commission_rate: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTeamMember}>
              Add Team Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Team Member Dialog */}
      <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update team member information.
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editFullName">Full Name</Label>
                <Input
                  id="editFullName"
                  placeholder="Enter full name"
                  value={editingMember.full_name}
                  onChange={(e) => setEditingMember({...editingMember, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email Address</Label>
                <Input
                  id="editEmail"
                  type="email"
                  placeholder="Enter email address"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editRole">Role</Label>
                <Select 
                  value={editingMember.role} 
                  onValueChange={(val) => setEditingMember({...editingMember, role: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stylist">Hair Stylist</SelectItem>
                    <SelectItem value="artist">Hair Artist</SelectItem>
                    <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                    <SelectItem value="renter">Booth Renter</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCommission">Commission Rate (%)</Label>
                <Input
                  id="editCommission"
                  type="number"
                  placeholder="Optional"
                  value={editingMember.commission_rate || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? undefined : Number(e.target.value);
                    setEditingMember({...editingMember, commission_rate: value});
                  }}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMemberOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTeamMember}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalonTeamManager;
