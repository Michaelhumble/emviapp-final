
import { supabaseBypass } from "@/types/supabase-bypass";

export const useUserNameResolver = () => {
  const getUserName = async (userId: string) => {
    try {
      const { data } = await supabaseBypass
        .from('profiles')
        .select('full_name')
        .eq('id', userId as any)
        .single();
      
      return (data as any)?.full_name || 'Unknown User';
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown User';
    }
  };

  const getServiceDetails = async (serviceId: string) => {
    try {
      const { data } = await supabaseBypass
        .from('services')
        .select('title')
        .eq('id', serviceId as any)
        .single();
      
      return (data as any)?.title || 'a service';
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
