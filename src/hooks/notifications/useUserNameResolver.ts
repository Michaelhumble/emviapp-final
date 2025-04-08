
import { supabase } from "@/integrations/supabase/client";

export const useUserNameResolver = () => {
  const getUserName = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', userId)
        .single();
      
      return data?.full_name || 'Unknown User';
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown User';
    }
  };

  const getServiceDetails = async (serviceId: string) => {
    try {
      const { data } = await supabase
        .from('services')
        .select('title')
        .eq('id', serviceId)
        .single();
      
      return data?.title || 'a service';
    } catch (error) {
      console.error('Error fetching service details:', error);
      return 'a service';
    }
  };

  return {
    getUserName,
    getServiceDetails
  };
};
