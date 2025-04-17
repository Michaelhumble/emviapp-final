
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth';

export interface BlockedTime {
  id: string;
  artist_id: string;
  start_time: string;
  end_time: string;
  reason?: string | null;
  created_at: string;
}

export const useBlockedTimes = (startDate: Date, endDate: Date) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: blockedTimes = [], isLoading: isLoadingBlockedTimes, error: blockedTimesError } = useQuery({
    queryKey: ['blocked-times', format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('blocked_times')
        .select('*')
        .eq('artist_id', user.id)
        .gte('start_time', startDate.toISOString())
        .lte('end_time', endDate.toISOString())
        .order('start_time', { ascending: true });
      
      if (error) {
        console.error('Error fetching blocked times:', error);
        throw error;
      }
      return data || [];
    },
    enabled: !!user?.id
  });

  const { mutateAsync: saveBlockedTime, isPending: isSavingBlockedTime } = useMutation({
    mutationFn: async (blockedTimeData: Partial<BlockedTime>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Ensure artist_id is set to current user
      const dataToSave = {
        ...blockedTimeData,
        artist_id: user.id
      };
      
      // Ensure start_time and end_time are present
      if (!dataToSave.start_time || !dataToSave.end_time) {
        throw new Error("Start time and end time are required");
      }
      
      const { data, error } = await supabase
        .from('blocked_times')
        .upsert(dataToSave)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-times'] });
      toast.success('Time block saved successfully');
    },
    onError: (error: any) => {
      console.error('Error saving blocked time:', error);
      toast.error(`Error saving time block: ${error.message}`);
    }
  });

  const { mutateAsync: deleteBlockedTime, isPending: isDeletingBlockedTime } = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('blocked_times')
        .delete()
        .eq('id', id)
        .eq('artist_id', user.id); // Ensure only owner can delete
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-times'] });
      toast.success('Time block deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting blocked time:', error);
      toast.error(`Error deleting time block: ${error.message}`);
    }
  });

  // Create void-returning wrapper functions to match expected types
  const saveBlockedTimeVoid = async (blockedTimeData: Partial<BlockedTime>): Promise<void> => {
    await saveBlockedTime(blockedTimeData);
  };

  const deleteBlockedTimeVoid = async (id: string): Promise<void> => {
    await deleteBlockedTime(id);
  };

  return {
    blockedTimes,
    isLoadingBlockedTimes,
    blockedTimesError,
    isSavingBlockedTime,
    isDeletingBlockedTime,
    saveBlockedTime: saveBlockedTimeVoid,
    deleteBlockedTime: deleteBlockedTimeVoid
  };
};
