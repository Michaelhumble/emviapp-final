
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonTeamMember } from "../types";
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
        email: staff.email,
        role: staff.role,
        specialty: staff.specialty || '',
        status: staff.status as 'active' | 'inactive' | 'pending',
        joined_at: staff.created_at,
        avatar_url: staff.avatar_url
      })));
    } catch (err: any) {
      console.error("Error fetching team members:", err);
      setError(new Error("Failed to load team members"));
      toast.error("Could not load team members");
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  const sendInvite = async (memberData: Partial<SalonTeamMember>) => {
    if (!currentSalon?.id) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: currentSalon.id,
          full_name: memberData.full_name,
          email: memberData.email,
          role: memberData.role || 'artist',
          specialty: memberData.specialty,
          status: memberData.status || 'active'
        })
        .select()
        .single();

      if (error) throw error;

      const newMember: SalonTeamMember = {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        role: data.role,
        specialty: data.specialty || '',
        status: data.status as 'active' | 'inactive' | 'pending',
        joined_at: data.created_at,
        avatar_url: data.avatar_url
      };
      
      setTeamMembers(prev => [...prev, newMember]);
      toast.success(`${data.full_name} added to your team`);
      
      return data;
    } catch (err: any) {
      console.error("Error sending invite:", err);
      toast.error("Failed to add team member");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTeamMember = async (id: string, name?: string) => {
    if (!currentSalon?.id) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('salon_staff')
        .delete()
        .eq('id', id)
        .eq('salon_id', currentSalon.id);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(member => member.id !== id));
      toast.success(`${name || 'Team member'} has been removed`);
    } catch (err: any) {
      console.error("Error removing team member:", err);
      toast.error("Failed to remove team member");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleMemberStatus = async (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => {
    if (!currentSalon?.id) return;

    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: newStatus })
        .eq('id', id)
        .eq('salon_id', currentSalon.id);

      if (error) throw error;

      setTeamMembers(prev => 
        prev.map(member => 
          member.id === id ? { ...member, status: newStatus as any } : member
        )
      );
      
      toast.success(`Team member status updated to ${newStatus}`);
    } catch (err: any) {
      console.error("Error updating team member status:", err);
      toast.error("Failed to update team member status");
      throw err;
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
    removeTeamMember,
    toggleMemberStatus
  };
};
