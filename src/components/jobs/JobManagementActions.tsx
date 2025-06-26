
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';

interface JobManagementActionsProps {
  job: Job;
  onEdit?: () => void;
  onDelete?: () => void;
}

const JobManagementActions: React.FC<JobManagementActionsProps> = ({
  job,
  onEdit,
  onDelete
}) => {
  const { user } = useAuth();
  
  // Check if current user can manage this job - ONLY owner or admin
  const canManage = user && (
    user.id === job.user_id || 
    user.role === 'admin' ||
    user.role === 'moderator'
  );

  // Don't render anything if user can't manage
  if (!canManage) {
    return null;
  }

  console.log('🔧 Job Management - User can manage job:', job.id, 'Owner:', job.user_id, 'Current user:', user.id);

  return (
    <div className="flex gap-2 mt-2">
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex items-center gap-1"
        >
          <Edit className="h-3 w-3" />
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      )}
    </div>
  );
};

export default JobManagementActions;
