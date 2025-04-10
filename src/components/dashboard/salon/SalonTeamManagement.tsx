
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, UserMinus, Mail, AlertCircle, RefreshCw } from "lucide-react";
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
}

const SalonTeamManagement = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          specialty: "Hair Coloring"
        },
        {
          id: "2",
          full_name: "Mark Barber",
          email: "mark@example.com",
          avatar_url: null,
          role: "artist",
          specialty: "Men's Cuts"
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
    
    setIsSending(true);
    
    try {
      // In a real implementation, this would send an invitation email
      // and create a pending invite record in the database
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
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
  
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <UserPlus className="h-5 w-5 text-blue-500 mr-2" />
          Team Management
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          {/* Invite Form */}
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Email address" 
              type="email" 
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
              disabled={isSending}
            />
            <Button 
              onClick={sendInvite} 
              disabled={isSending || !inviteEmail} 
              className="whitespace-nowrap"
            >
              {isSending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
              Invite Artist
            </Button>
          </div>
          
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
                      <p className="font-medium">{member.full_name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-3 w-3 mr-1" />
                        <span>{member.email}</span>
                      </div>
                      {member.specialty && (
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {member.specialty}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeTeamMember(member.id, member.full_name)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonTeamManagement;
