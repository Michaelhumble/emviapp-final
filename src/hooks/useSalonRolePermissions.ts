
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
        const { data, error } = await supabase
          .rpc('get_user_salon_role', {
            p_user_id: (await supabase.auth.getUser()).data.user?.id,
            p_salon_id: currentSalon.id
          });

        if (error) throw error;
        
        setUserRole(data);
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
