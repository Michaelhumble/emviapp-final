
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';

export const useJobPermissions = () => {
  const { user, userRole } = useAuth();

  const canEditJob = (job: Job): boolean => {
    if (!user?.id) return false;
    
    // Admin can edit any job
    if (userRole === 'admin') return true;
    
    // Owner can edit their own job
    return job.user_id === user.id;
  };

  const canDeleteJob = (job: Job): boolean => {
    if (!user?.id) return false;
    
    // Admin can delete any job
    if (userRole === 'admin') return true;
    
    // Owner can delete their own job
    return job.user_id === user.id;
  };

  return {
    canEditJob,
    canDeleteJob
  };
};
