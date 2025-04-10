
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, UserMinus, Mail, AlertCircle, RefreshCw, Check, X } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: string;
  specialty?: string;
  status?: 'active' | 'inactive'; // Added status field
}

const SalonTeamManagement = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("artist");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchTeamMembers();
    }
  }, [user]);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would query team members by salon_id
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, avatar_url, role, specialty');
        
      if (error) throw error;
      
      // For demonstration purposes, we'll simulate team members
      // In a real implementation, we would filter by salon_id in the database query
      // Since salon_id isn't in our current type, we'll use hardcoded data for now
      
      // Mock data - in production this would come from actual filtering
      const mockTeamMembers: TeamMember[] = [
        {
          id: "1",
          full_name: "Tina Stylist",
          email: "tina@example.com",
          avatar_url: null,
          role: "artist",
          specialty: "Hair Coloring",
          status: "active"
        },
        {
          id: "2",
          full_name: "Mark Barber",
          email: "mark@example.com",
          avatar_url: null,
          role: "artist",
          specialty: "Men's Cuts",
          status: "active"
        },
        {
          id: "3",
          full_name: "Laura Nail Tech",
          email: "laura@example.com",
          avatar_url: null,
          role: "nail technician/artist",
          specialty: "Gel Manicures",
          status: "inactive"
        }
      ];
      
      setTeamMembers(mockTeamMembers);
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Failed to load team members. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const sendInvite = async () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!inviteName.trim()) {
      toast.error("Please enter the team member's name");
      return;
    }
    
    setIsSending(true);
    
    try {
      // In a real implementation, this would:
      // 1. Create a pending invitation record in the database
      // 2. Send an email to the person with a signup link
      // 3. When they sign up, associate them with this salon's ID
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to local state for immediate feedback
      const newMember: TeamMember = {
        id: `temp-${Date.now()}`,
        full_name: inviteName,
        email: inviteEmail,
        avatar_url: null,
        role: inviteRole,
        status: "active"
      };
      
      setTeamMembers(prev => [...prev, newMember]);
      
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setInviteName("");
      setInviteRole("artist");
      setIsInviteModalOpen(false);
    } catch (err) {
      console.error("Error sending invite:", err);
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  
  const removeTeamMember = async (memberId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from your team?`)) {
      return;
    }
    
    try {
      // In a real implementation, this would update the user record to remove salon_id
      // or change their status to inactive
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local state
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      
      toast.success(`${name} has been removed from your team`);
    } catch (err) {
      console.error("Error removing team member:", err);
      toast.error("Failed to remove team member. Please try again.");
    }
  };
  
  const toggleMemberStatus = async (memberId: string, currentStatus: 'active' | 'inactive' | undefined) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, status: newStatus as 'active' | 'inactive' } 
            : member
        )
      );
      
      toast.success(`Team member status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating member status:", err);
      toast.error("Failed to update status. Please try again.");
    }
  };
  
  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <UserPlus className="h-5 w-5 text-blue-500 mr-2" />
          Team Management
        </CardTitle>
        <Button size="sm" onClick={() => setIsInviteModalOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Artist
        </Button>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          {/* Team List */}
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="py-4 text-center text-gray-500">
                <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
                <p>Loading team members...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="py-4 text-center text-gray-500">
                <p>No team members yet. Invite artists to join your salon!</p>
              </div>
            ) : (
              teamMembers.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between">
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
                      onClick={() => toggleMemberStatus(member.id, member.status)}
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
                      onClick={() => removeTeamMember(member.id, member.full_name)}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Invite Team Member Modal */}
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Team Member</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="inviteName">Full Name</Label>
                <Input
                  id="inviteName"
                  placeholder="e.g., Jane Smith"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Email Address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="e.g., jane@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inviteRole">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger id="inviteRole">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artist">Hair Artist</SelectItem>
                    <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                    <SelectItem value="renter">Booth Renter</SelectItem>
                    <SelectItem value="stylist">Stylist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={sendInvite} 
                disabled={isSending || !inviteEmail || !inviteName}
              >
                {isSending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SalonTeamManagement;
