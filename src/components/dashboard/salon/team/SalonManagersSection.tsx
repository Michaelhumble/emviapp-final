
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSalon } from "@/context/salon";
import { useAuth } from "@/context/auth";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { User, UserCheck, UserX, MoreVertical, Shield, UserCog, Mail } from "lucide-react";

type SalonManager = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  manager_for_salon_id: string;
  status: 'active' | 'invited' | 'revoked';
};

const SalonManagersSection = () => {
  const { currentSalon } = useSalon();
  const { user } = useAuth();
  const [managers, setManagers] = useState<SalonManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteSending, setInviteSending] = useState(false);
  
  useEffect(() => {
    if (currentSalon?.id) {
      fetchManagers();
    }
  }, [currentSalon?.id]);

  const fetchManagers = async () => {
    if (!currentSalon?.id) return;
    
    setLoading(true);
    try {
      // Fetch users who are managers for this salon
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, avatar_url, manager_for_salon_id')
        .eq('manager_for_salon_id', currentSalon.id);
        
      if (error) throw error;
      
      // Transform data to add status (we'll assume they're all active for now)
      const managersData: SalonManager[] = (data || []).map(manager => ({
        ...manager,
        status: 'active'
      }));
      
      setManagers(managersData);
    } catch (err) {
      console.error('Error fetching managers:', err);
      toast.error('Failed to load salon managers');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteManager = async () => {
    if (!inviteEmail || !inviteName || !currentSalon?.id) {
      toast.error('Please provide both name and email');
      return;
    }
    
    setInviteSending(true);
    try {
      // First check if user already exists
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', inviteEmail.trim().toLowerCase())
        .maybeSingle();
        
      if (userError) throw userError;
      
      if (existingUser) {
        // User exists, update their manager_for_salon_id
        const { error: updateError } = await supabase
          .from('users')
          .update({ manager_for_salon_id: currentSalon.id })
          .eq('id', existingUser.id);
          
        if (updateError) throw updateError;
        
        toast.success(`${inviteName} has been assigned as manager`);
        // Add to local state
        setManagers(prev => [...prev, {
          id: existingUser.id,
          full_name: inviteName,
          email: inviteEmail,
          avatar_url: null,
          manager_for_salon_id: currentSalon.id,
          status: 'active'
        }]);
      } else {
        // User doesn't exist, send invite
        // In a real app, this would send an email and create a pending invite record
        // For now, we'll just show a success message
        toast.success(`Invite sent to ${inviteEmail}`);
        
        // Mock adding an invited user to our local state
        setManagers(prev => [...prev, {
          id: `invited-${Date.now()}`,
          full_name: inviteName,
          email: inviteEmail,
          avatar_url: null,
          manager_for_salon_id: currentSalon.id,
          status: 'invited'
        }]);
      }
      
      // Reset form
      setInviteEmail('');
      setInviteName('');
      setIsInviteModalOpen(false);
    } catch (err) {
      console.error('Error inviting manager:', err);
      toast.error('Failed to invite manager');
    } finally {
      setInviteSending(false);
    }
  };

  const handleRevokeAccess = async (managerId: string, managerName: string) => {
    if (!confirm(`Are you sure you want to revoke ${managerName}'s manager access?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ manager_for_salon_id: null })
        .eq('id', managerId);
        
      if (error) throw error;
      
      // Update local state
      setManagers(prev => prev.filter(manager => manager.id !== managerId));
      toast.success(`Manager access revoked for ${managerName}`);
    } catch (err) {
      console.error('Error revoking access:', err);
      toast.error('Failed to revoke manager access');
    }
  };

  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'invited':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Invited</Badge>;
      case 'revoked':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Revoked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Salon Managers</CardTitle>
          <CardDescription>Manage who can access and manage your salon</CardDescription>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)} size="sm">
          <UserCog className="h-4 w-4 mr-2" />
          Invite Manager
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : managers.length === 0 ? (
          <div className="py-8 text-center border rounded-lg bg-muted/10">
            <User className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No managers assigned yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add managers to help run your salon without sharing your owner account
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsInviteModalOpen(true)}
            >
              Invite Your First Manager
            </Button>
          </div>
        ) : (
          <div>
            {/* Desktop view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Manager</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managers.map((manager) => (
                    <TableRow key={manager.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={manager.avatar_url || ''} alt={manager.full_name} />
                            <AvatarFallback>
                              {manager.full_name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{manager.full_name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{manager.email}</TableCell>
                      <TableCell>{renderStatusBadge(manager.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="h-4 w-4 mr-2" />
                              Contact
                            </DropdownMenuItem>
                            {manager.status === 'invited' && (
                              <DropdownMenuItem className="cursor-pointer">
                                <Mail className="h-4 w-4 mr-2" />
                                Resend Invite
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-600"
                              onClick={() => handleRevokeAccess(manager.id, manager.full_name)}
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Revoke Access
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
              {managers.map((manager) => (
                <Card key={manager.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={manager.avatar_url || ''} alt={manager.full_name} />
                          <AvatarFallback>
                            {manager.full_name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{manager.full_name}</p>
                          <p className="text-sm text-muted-foreground">{manager.email}</p>
                          <div className="mt-2">
                            {renderStatusBadge(manager.status)}
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
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </DropdownMenuItem>
                          {manager.status === 'invited' && (
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="h-4 w-4 mr-2" />
                              Resend Invite
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-600"
                            onClick={() => handleRevokeAccess(manager.id, manager.full_name)}
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Revoke Access
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
      
      {/* Invite Manager Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Salon Manager</DialogTitle>
            <DialogDescription>
              Invite someone to manage this salon. They'll have access to appointments, team management, and other salon operations.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="managerName">Manager Name</Label>
              <Input 
                id="managerName" 
                placeholder="Enter full name" 
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerEmail">Email Address</Label>
              <Input 
                id="managerEmail" 
                type="email" 
                placeholder="example@email.com" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="bg-muted/30 p-3 rounded-md text-sm space-y-2">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium">Manager permissions:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
                    <li>View and manage bookings</li>
                    <li>Manage team members</li>
                    <li>Post jobs</li>
                    <li>View salon analytics</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">
                Managers <strong>cannot</strong> access billing, subscription settings, or delete the salon.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleInviteManager}
              disabled={inviteSending || !inviteEmail || !inviteName}
            >
              {inviteSending ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </>
              ) : (
                <>Send Invitation</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalonManagersSection;
