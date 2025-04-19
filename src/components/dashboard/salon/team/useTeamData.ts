
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { startOfWeek, endOfWeek } from 'date-fns';
import { SalonTeamMember } from './types';

// Define types for raw database responses to avoid deep inference
type RawStaffData = {
  id: string;
  salon_id: string;
  full_name: string;
  email: string;
  role: string;
  specialty?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  avatar_url?: string;
  commission_rate?: number;
  invitation_sent_at?: string;
  invitation_email?: string;
}

type RawBookingData = {
  artist_id?: string;
  id: string;
}

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

        // Get salon staff with explicit typing
        const { data: staffData, error: staffError } = await supabase
          .from('salon_staff')
          .select('*')
          .eq('salon_id', currentSalon.id) as { data: RawStaffData[] | null, error: any };

        if (staffError) throw staffError;

        // Get this week's booking counts
        const startDate = startOfWeek(new Date());
        const endDate = endOfWeek(new Date());
        
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('appointments')
          .select('artist_id, id')
          .eq('salon_id', currentSalon.id)
          .gte('start_time', startDate.toISOString())
          .lte('start_time', endDate.toISOString()) as { data: RawBookingData[] | null, error: any };

        if (bookingsError) throw bookingsError;

        // Calculate booking counts
        const counts: Record<string, number> = {};
        if (bookingsData) {
          bookingsData.forEach(booking => {
            if (booking.artist_id) {
              counts[booking.artist_id] = (counts[booking.artist_id] || 0) + 1;
            }
          });
        }

        // Transform staff data using explicit mapping to avoid deep type inference issues
        const transformedStaffData: SalonTeamMember[] = staffData ? staffData.map(staff => ({
          id: staff.id,
          salon_id: staff.salon_id,
          full_name: staff.full_name,
          email: staff.email,
          role: staff.role,
          specialty: staff.specialty || '',
          status: staff.status as 'active' | 'inactive' | 'pending',
          joined_at: staff.created_at,
          avatar_url: staff.avatar_url,
          commission_rate: staff.commission_rate,
          invitation_sent_at: staff.invitation_sent_at,
          invitation_email: staff.invitation_email
        })) : [];

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
