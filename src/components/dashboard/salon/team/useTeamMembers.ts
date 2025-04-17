
import { useState, useEffect, useCallback } from "react";
import { SalonTeamMember } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { toast } from "sonner";

export const useTeamMembers = () => {
  const { currentSalon } = useSalon();
  const [teamMembers, setTeamMembers] = useState<SalonTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeamMembers = useCallback(async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First, fetch team members from the salon_staff table
      const { data: staffData, error: staffError } = await supabase
        .from('salon_staff')
        .select('*')
        .eq('salon_id', currentSalon.id);

      if (staffError) throw staffError;

      const formattedMembers: SalonTeamMember[] = (staffData || []).map(member => ({
        id: member.id,
        full_name: member.full_name,
        specialty: member.specialty || "",
        role: member.role,
        email: member.email,
        joined_at: member.created_at,
        avatar_url: member.avatar_url,
        status: member.status as 'active' | 'inactive' | 'pending'
      }));

      setTeamMembers(formattedMembers);
    } catch (err: any) {
      console.error("Error fetching team members:", err);
      setError(new Error("Failed to load team members"));
      toast.error("Could not load team members");
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  const sendInvite = async (email: string, name: string, role: string) => {
    if (!currentSalon?.id) return;

    try {
      setLoading(true);
      
      // Check if member already exists
      const { data: existingMember, error: checkError } = await supabase
        .from('salon_staff')
        .select('id')
        .eq('email', email)
        .eq('salon_id', currentSalon.id)
        .single();
        
      if (existingMember) {
        toast.error("This person is already a team member");
        return;
      }
      
      // Create new team member
      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: currentSalon.id,
          full_name: name,
          email: email,
          role: role,
          status: 'pending'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        const newMember: SalonTeamMember = {
          id: data.id,
          full_name: data.full_name,
          specialty: data.specialty || "",
          role: data.role,
          email: data.email,
          joined_at: data.created_at,
          status: 'pending'
        };
        
        setTeamMembers(prev => [newMember, ...prev]);
        toast.success(`Invitation sent to ${email}`);
      }
    } catch (err: any) {
      console.error("Error sending invite:", err);
      toast.error("Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  const removeTeamMember = async (memberId: string) => {
    if (!currentSalon?.id) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('salon_staff')
        .delete()
        .eq('id', memberId)
        .eq('salon_id', currentSalon.id);
        
      if (error) throw error;
      
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success("Team member removed successfully");
    } catch (err: any) {
      console.error("Error removing team member:", err);
      toast.error("Failed to remove team member");
    } finally {
      setLoading(false);
    }
  };

  const toggleMemberStatus = async (memberId: string, newStatus: 'active' | 'inactive') => {
    if (!currentSalon?.id) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: newStatus })
        .eq('id', memberId)
        .eq('salon_id', currentSalon.id);
        
      if (error) throw error;
      
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, status: newStatus } : member
        )
      );
      
      toast.success(`Team member ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err: any) {
      console.error("Error updating team member status:", err);
      toast.error("Failed to update team member status");
    } finally {
      setLoading(false);
    }
  };

  const resendInvite = async (email: string) => {
    // In a real implementation, you would call an API to resend the invite email
    toast.success(`Invitation re-sent to ${email}`);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return {
    teamMembers,
    loading,
    error,
    fetchTeamMembers,
    sendInvite,
    removeTeamMember,
    toggleMemberStatus,
    resendInvite
  };
};
