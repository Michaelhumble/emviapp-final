
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
        .from('salon_staff')
        .select('id, full_name, email, avatar_url, role, specialty, status')
        .eq('salon_id', user?.id);
        
      if (error) throw error;
      
      setTeamMembers(data || []);
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
      // Add the new team member to the salon_staff table
      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: user?.id,
          full_name: name,
          email: email,
          role: role
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Add to local state for immediate feedback
      if (data) {
        setTeamMembers(prev => [...prev, data as TeamMember]);
      }
      
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
      // Delete the team member from the salon_staff table
      const { error } = await supabase
        .from('salon_staff')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
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
      // Update the team member's status in the salon_staff table
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: newStatus })
        .eq('id', memberId);
      
      if (error) throw error;
      
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
