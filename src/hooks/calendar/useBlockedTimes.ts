
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const useBlockedTimes = (startDate: Date, endDate: Date) => {
  const queryClient = useQueryClient();

  const { data: blockedTimes = [], isLoading: isLoadingBlockedTimes } = useQuery({
    queryKey: ['blocked-times', format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blocked_times')
        .select('*')
        .gte('start_time', startDate.toISOString())
        .lte('end_time', endDate.toISOString())
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { mutateAsync: saveBlockedTime } = useMutation({
    mutationFn: async (data: any) => {
      const { data: savedData, error } = await supabase
        .from('blocked_times')
        .upsert(data)
        .select()
        .single();
      
      if (error) throw error;
      return savedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-times'] });
      toast.success('Time blocked successfully');
    },
    onError: (error: any) => {
      toast.error(`Error blocking time: ${error.message}`);
    }
  });

  const { mutateAsync: deleteBlockedTime } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blocked_times')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-times'] });
      toast.success('Blocked time removed successfully');
    },
    onError: (error: any) => {
      toast.error(`Error removing blocked time: ${error.message}`);
    }
  });

  return {
    blockedTimes,
    isLoadingBlockedTimes,
    saveBlockedTime,
    deleteBlockedTime
  };
};
