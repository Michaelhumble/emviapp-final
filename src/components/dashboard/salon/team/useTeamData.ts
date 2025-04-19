
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { startOfWeek, endOfWeek } from 'date-fns';
import { SalonTeamMember } from './types';

export const useTeamData = () => {
  const { currentSalon } = useSalon();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [teamMembers, setTeamMembers] = useState<SalonTeamMember[]>([]);
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!currentSalon?.id) return;
      
      try {
        setLoading(true);
        setError(null);

        // Get salon staff
        const { data: staffData, error: staffError } = await supabase
          .from('salon_staff')
          .select('*')
          .eq('salon_id', currentSalon.id);

        if (staffError) throw staffError;

        // Get this week's booking counts
        const startDate = startOfWeek(new Date());
        const endDate = endOfWeek(new Date());
        
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('appointments')
          .select('artist_id, id')
          .eq('salon_id', currentSalon.id)
          .gte('start_time', startDate.toISOString())
          .lte('start_time', endDate.toISOString());

        if (bookingsError) throw bookingsError;

        // Calculate booking counts
        const counts: Record<string, number> = {};
        bookingsData?.forEach(booking => {
          if (booking.artist_id) {
            counts[booking.artist_id] = (counts[booking.artist_id] || 0) + 1;
          }
        });

        // Transform staff data to match SalonTeamMember interface
        const transformedStaffData: SalonTeamMember[] = staffData?.map(staff => ({
          id: staff.id,
          full_name: staff.full_name,
          email: staff.email,
          role: staff.role,
          specialty: staff.specialty || '',
          status: staff.status as 'active' | 'inactive' | 'pending',
          joined_at: staff.created_at, // Use created_at as joined_at
          avatar_url: staff.avatar_url,
          commission_rate: staff.commission_rate,
          salon_id: staff.salon_id
        })) || [];

        setTeamMembers(transformedStaffData);
        setBookingCounts(counts);

      } catch (err: any) {
        console.error('Error fetching team data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [currentSalon?.id]);

  return {
    teamMembers,
    bookingCounts,
    loading,
    error
  };
};
