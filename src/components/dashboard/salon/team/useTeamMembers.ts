
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { TeamMember } from "./types";

export const useTeamMembers = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would query team members by salon_id
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, avatar_url, role, specialty');
        
      if (error) throw error;
      
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

  const sendInvite = async (email: string, name: string, role: string) => {
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter the team member's name");
      return;
    }
    
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
        full_name: name,
        email: email,
        avatar_url: null,
        role: role,
        status: "active"
      };
      
      setTeamMembers(prev => [...prev, newMember]);
      
      toast.success(`Invitation sent to ${email}`);
    } catch (err) {
      console.error("Error sending invite:", err);
      toast.error("Failed to send invitation. Please try again.");
      throw err;
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

  useEffect(() => {
    if (user?.id) {
      fetchTeamMembers();
    }
  }, [user]);

  return {
    teamMembers,
    loading,
    error,
    sendInvite,
    removeTeamMember,
    toggleMemberStatus,
    refreshTeamMembers: fetchTeamMembers,
  };
};
