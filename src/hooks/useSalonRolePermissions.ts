
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SalonStaffRole } from '@/components/dashboard/salon/team/types';
import { useSalon } from '@/context/salon';

export const useSalonRolePermissions = () => {
  const { currentSalon } = useSalon();
  const [userRole, setUserRole] = useState<SalonStaffRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentSalon) {
        setLoading(false);
        return;
      }

      try {
        // We need to use a direct query instead of RPC since get_user_salon_role isn't in the allowed list
        const { data: user } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('salon_staff')
          .select('role')
          .eq('salon_id', currentSalon.id)
          .eq('email', user.user?.email)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setUserRole(null);
        } else if (data) {
          // Cast the role to SalonStaffRole to ensure type safety
          setUserRole(data.role as SalonStaffRole);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [currentSalon]);

  const canEditTeam = userRole === 'owner';
  const canViewTeam = ['owner', 'manager'].includes(userRole || '');
  const canInviteTeamMembers = ['owner', 'manager'].includes(userRole || '');

  return {
    userRole,
    loading,
    canEditTeam,
    canViewTeam,
    canInviteTeamMembers
  };
};
