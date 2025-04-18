
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export interface UserTag {
  id: string;
  user_id: string;
  tag: string;
  created_at: string;
}

export const useUserTags = () => {
  const { user } = useAuth();

  const tagUser = async (userId: string, tag: string) => {
    const { error } = await supabase.rpc('tag_user', {
      p_user_id: userId,
      p_tag: tag
    });
    return !error;
  };

  const { data: tags, isLoading } = useQuery({
    queryKey: ['user-tags', user?.id],
    queryFn: async () => {
      if (!user?.id) return [] as UserTag[];
      
      const { data, error } = await supabase
        .from('user_tags')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data as UserTag[];
    },
    enabled: !!user?.id
  });

  return {
    tags,
    isLoading,
    tagUser
  };
};
