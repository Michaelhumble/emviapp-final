
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonTeamMember, SalonStaffRole } from "../../team/types";
import { toast } from "sonner";

export const useTeamMembers = () => {
  const { currentSalon } = useSalon();
  const [teamMembers, setTeamMembers] = useState<SalonTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeamMembers = useCallback(async () => {
    if (!currentSalon?.id) {
      console.log('No current salon ID, skipping team member fetch');
      setLoading(false);
      setError(new Error("No salon selected"));
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching team members for salon:', currentSalon.id);

      const { data, error } = await supabase
        .from('salon_staff')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }

      console.log('Fetched team members:', data);

      const mappedMembers = (data || []).map(staff => ({
        id: staff.id,
        full_name: staff.full_name || 'Unknown',
        email: staff.email || '',
        role: (staff.role as SalonStaffRole) || 'technician',
        specialty: staff.specialty || '',
        status: (staff.status as 'active' | 'inactive' | 'pending') || 'pending',
        avatar_url: staff.avatar_url,
        joined_at: staff.created_at,
        invitation_sent_at: staff.invitation_sent_at,
        commission_rate: staff.commission_rate,
        salon_id: staff.salon_id
      }));

      setTeamMembers(mappedMembers);
      console.log('Mapped team members:', mappedMembers);
    } catch (err: any) {
      console.error("Error fetching team members:", err);
      const errorMessage = err.message || "Failed to load team members";
      setError(new Error(errorMessage));
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  const sendInvite = async (memberData: any) => {
    if (!currentSalon?.id) {
      toast.error('No salon selected');
      return false;
    }

    try {
      console.log('Sending invite with data:', memberData);
      
      const { data, error } = await supabase
        .from('salon_staff')
        .insert({
          salon_id: currentSalon.id,
          full_name: memberData.full_name,
          email: memberData.email,
          role: memberData.role,
          status: 'pending',
          invitation_sent_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending invite:', error);
        throw error;
      }

      console.log('Invite sent successfully:', data);
      toast.success(`Invitation sent to ${memberData.full_name}!`);
      
      // Refresh team members to show the new invite
      await fetchTeamMembers();
      return true;
    } catch (err: any) {
      console.error('Error in sendInvite:', err);
      const errorMessage = err.message || 'Failed to send invitation';
      toast.error(errorMessage);
      return false;
    }
  };

  const removeTeamMember = async (id: string, name?: string) => {
    if (!currentSalon?.id) {
      toast.error('No salon selected');
      return;
    }

    try {
      const { error } = await supabase
        .from('salon_staff')
        .delete()
        .eq('id', id)
        .eq('salon_id', currentSalon.id);

      if (error) {
        console.error('Error removing team member:', error);
        throw error;
      }

      toast.success(`${name || 'Team member'} has been removed`);
      await fetchTeamMembers();
    } catch (err: any) {
      console.error('Error in removeTeamMember:', err);
      toast.error('Failed to remove team member');
    }
  };

  const toggleMemberStatus = async (id: string, currentStatus?: 'active' | 'inactive' | 'pending') => {
    if (!currentSalon?.id) {
      toast.error('No salon selected');
      return;
    }

    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('salon_staff')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('salon_id', currentSalon.id);

      if (error) {
        console.error('Error toggling member status:', error);
        throw error;
      }

      toast.success(`Member status updated to ${newStatus}`);
      await fetchTeamMembers();
    } catch (err: any) {
      console.error('Error in toggleMemberStatus:', err);
      toast.error('Failed to update member status');
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
