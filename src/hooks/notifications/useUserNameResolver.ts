
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * Hook to get user information from ID
 */
export const useUserNameResolver = () => {
  const { t } = useTranslation();

  /**
   * Fetch a user's name from their ID
   */
  const getUserName = async (userId: string): Promise<string> => {
    try {
      const { data } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', userId)
        .single();
      
      return data?.full_name || t({
        english: 'Unknown user',
        vietnamese: 'Người dùng không xác định'
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return t({
        english: 'Unknown user',
        vietnamese: 'Người dùng không xác định'
      });
    }
  };

  /**
   * Fetch service details by ID
   */
  const getServiceDetails = async (serviceId: string) => {
    try {
      const { data } = await supabase
        .from('services')
        .select('title')
        .eq('id', serviceId)
        .single();
      
      return data?.title || t({
        english: 'a service',
        vietnamese: 'một dịch vụ'
      });
    } catch (error) {
      console.error('Error fetching service:', error);
      return t({
        english: 'a service',
        vietnamese: 'một dịch vụ'
      });
    }
  };

  return {
    getUserName,
    getServiceDetails
  };
};
