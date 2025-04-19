
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonTeamMember } from "./types";
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

      const { data, error } = await supabase
        .from('salon_staff')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('full_name', { ascending: true });

      if (error) throw error;

      setTeamMembers(data.map(staff => ({
        id: staff.id,
        full_name: staff.full_name,
        email: staff.email || '',
        role: staff.role,
        specialty: staff.specialty || '',
        status: staff.status as 'active' | 'inactive' | 'pending',
        avatar_url: staff.avatar_url,
        joined_at: staff.created_at,
        invitation_sent_at: staff.invitation_sent_at,
        commission_rate: staff.commission_rate
      })));
    } catch (err: any) {
      console.error("Error fetching team members:", err);
      setError(new Error("Failed to load team members"));
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  const sendInvite = async (memberData: Partial<SalonTeamMember>) => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return;
    }

    try {
      setLoading(true);
      
      // Insert new team member into salon_staff table
      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: currentSalon.id,
          full_name: memberData.full_name,
          email: memberData.email,
          role: memberData.role,
          specialty: memberData.specialty,
          status: 'pending',
          invitation_sent_at: new Date().toISOString(),
          commission_rate: memberData.commission_rate
        })
        .select();

      if (error) throw error;
      
      toast.success(`Invitation sent to ${memberData.full_name}`);
      
      // Add the new team member to the list
      if (data && data.length > 0) {
        setTeamMembers(prev => [
          ...prev, 
          {
            id: data[0].id,
            full_name: data[0].full_name,
            email: data[0].email || '',
            role: data[0].role,
            specialty: data[0].specialty || '',
            status: data[0].status as 'active' | 'inactive' | 'pending',
            avatar_url: data[0].avatar_url,
            joined_at: data[0].created_at,
            invitation_sent_at: data[0].invitation_sent_at,
            commission_rate: data[0].commission_rate
          }
        ]);
      }
    } catch (err: any) {
      console.error("Error sending invite:", err);
      toast.error("Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<SalonTeamMember>) => {
    try {
      const { data, error } = await supabase
        .from('salon_staff')
        .update({
          full_name: updates.full_name,
          email: updates.email,
          role: updates.role,
          specialty: updates.specialty,
          status: updates.status,
          commission_rate: updates.commission_rate
        })
        .eq('id', id)
        .select();

      if (error) throw error;

      setTeamMembers(prev => 
        prev.map(member => 
          member.id === id ? { ...member, ...updates } : member
        )
      );
      
      toast.success("Team member updated successfully");
    } catch (err: any) {
      console.error("Error updating team member:", err);
      toast.error("Failed to update team member");
    }
  };

  const removeTeamMember = async (id: string, name?: string) => {
    try {
      const { error } = await supabase
        .from('salon_staff')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(member => member.id !== id));
      toast.success(`${name || 'Team member'} removed successfully`);
    } catch (err: any) {
      console.error("Error removing team member:", err);
      toast.error("Failed to remove team member");
    }
  };

  const toggleMemberStatus = async (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setTeamMembers(prev => 
        prev.map(member => 
          member.id === id ? { ...member, status: newStatus } : member
        )
      );
      
      toast.success(`Team member ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (err: any) {
      console.error("Error toggling member status:", err);
      toast.error("Failed to update team member status");
    }
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
    updateTeamMember,
    removeTeamMember,
    toggleMemberStatus
  };
};
