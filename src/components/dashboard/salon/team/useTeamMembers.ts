
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { TeamMember } from "./types";
import { useSalon } from "@/context/salon/SalonContext";

export const useTeamMembers = () => {
  const { user } = useAuth();
  const { currentSalon } = useSalon();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    if (!currentSalon?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Query salon_staff table using the salon_id instead of user.id
      const { data, error } = await supabase
        .from('salon_staff')
        .select('id, full_name, email, avatar_url, role, specialty, status')
        .eq('salon_id', currentSalon.id);
        
      if (error) throw error;
      
      // Transform the data and ensure status is properly typed
      if (data) {
        const typedMembers: TeamMember[] = data.map(item => ({
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          avatar_url: item.avatar_url,
          role: item.role,
          specialty: item.specialty,
          // Ensure status is only 'active' or 'inactive'
          status: (item.status === 'active' || item.status === 'inactive') 
            ? item.status 
            : 'inactive' // Default value if status is invalid
        }));
        
        setTeamMembers(typedMembers);
      } else {
        setTeamMembers([]);
      }
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Failed to load team members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendInvite = async (email: string, name: string, role: string) => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return;
    }

    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter the team member's name");
      return;
    }
    
    try {
      // Use salon_id instead of user?.id
      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: currentSalon.id,
          full_name: name,
          email: email,
          role: role,
          status: 'active'
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
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: newStatus })
        .eq('id', memberId);
      
      if (error) throw error;
      
      // Update local state
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, status: newStatus } 
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
    if (currentSalon?.id) {
      fetchTeamMembers();
    }
  }, [currentSalon?.id]);

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
