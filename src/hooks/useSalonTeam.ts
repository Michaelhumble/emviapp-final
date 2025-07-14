import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { toast } from 'sonner';

export interface SalonTeamMember {
  id: string;
  salon_id: string;
  user_id?: string;
  name: string;
  email: string;
  role: string;
  specialties: string[];
  status: string;
  joined_date: string;
  created_at: string;
  updated_at: string;
}

export const useSalonTeam = () => {
  const [teamMembers, setTeamMembers] = useState<SalonTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentSalon } = useSalon();

  // Fetch team members
  const fetchTeamMembers = async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('salon_team_members')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .eq('status', 'active')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch team members'));
    } finally {
      setLoading(false);
    }
  };

  // Add team member
  const addTeamMember = async (memberData: {
    name: string;
    email: string;
    role: string;
    specialties?: string[];
  }) => {
    if (!currentSalon?.id) {
      toast.error('No salon selected');
      return false;
    }

    try {
      const { error } = await supabase
        .from('salon_team_members')
        .insert({
          salon_id: currentSalon.id,
          name: memberData.name,
          email: memberData.email,
          role: memberData.role,
          specialties: memberData.specialties || [],
          status: 'active'
        });

      if (error) throw error;
      
      await fetchTeamMembers(); // Refresh the list
      toast.success(`${memberData.name} has been added to the team!`);
      return true;
    } catch (err) {
      console.error('Error adding team member:', err);
      toast.error('Failed to add team member');
      return false;
    }
  };

  // Update team member
  const updateTeamMember = async (memberId: string, updates: {
    name?: string;
    email?: string;
    role?: string;
    specialties?: string[];
  }) => {
    try {
      const { error } = await supabase
        .from('salon_team_members')
        .update(updates)
        .eq('id', memberId);

      if (error) throw error;
      
      await fetchTeamMembers(); // Refresh the list
      toast.success('Team member profile updated successfully!');
      return true;
    } catch (err) {
      console.error('Error updating team member:', err);
      toast.error('Failed to update team member');
      return false;
    }
  };

  // Remove team member
  const removeTeamMember = async (memberId: string, memberName: string) => {
    try {
      const { error } = await supabase
        .from('salon_team_members')
        .update({ status: 'inactive' })
        .eq('id', memberId);

      if (error) throw error;
      
      await fetchTeamMembers(); // Refresh the list
      toast.success(`${memberName} has been removed from the team`);
      return true;
    } catch (err) {
      console.error('Error removing team member:', err);
      toast.error('Failed to remove team member');
      return false;
    }
  };

  // Send invitation (placeholder for future implementation)
  const sendInvitation = async (email: string, role: string, name: string) => {
    // For now, just add them as a team member
    // In the future, this could send an actual email invitation
    return await addTeamMember({ name, email, role });
  };

  // Send message (placeholder for future implementation)
  const sendMessage = async (memberId: string, memberName: string) => {
    toast.info(`Direct messaging with ${memberName} will be available soon!`, {
      description: "We're working on team chat functionality."
    });
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [currentSalon?.id]);

  return {
    teamMembers,
    loading,
    error,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    sendInvitation,
    sendMessage,
    refetch: fetchTeamMembers
  };
};