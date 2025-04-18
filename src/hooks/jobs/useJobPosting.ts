
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  const handleJobPost = async (jobData: any) => {
    if (!user?.id) return;
    
    // First create the job post
    const { error } = await supabase
      .from('jobs')
      .insert(jobData);

    if (!error) {
      // Tag the user as a job poster
      await tagUser(user.id, 'job-poster');
    }

    return !error;
  };

  return {
    handleJobPost
  };
};
