
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface JobManagementActionsProps {
  job: {
    id: string;
    user_id?: string;
    [key: string]: any;
  };
  onEdit?: (job: any) => void;
  onDelete?: (job: any) => void;
}

const JobManagementActions: React.FC<JobManagementActionsProps> = ({
  job,
  onEdit,
  onDelete
}) => {
  const { user } = useAuth();

  // Enhanced ownership check with logging
  const canManage = React.useMemo(() => {
    const isOwner = user && job.user_id && user.id === job.user_id;
    const isAdmin = user && user.role === 'admin';
    const hasAccess = isOwner || isAdmin;
    
    // Temporary logging for debugging
    console.log('🔍 Management Access Check:', {
      jobId: job.id,
      jobUserId: job.user_id,
      currentUserId: user?.id,
      userRole: user?.role,
      isOwner,
      isAdmin,
      hasAccess
    });
    
    return hasAccess;
  }, [user, job]);

  // Don't render if user can't manage this job
  if (!canManage) {
    return null;
  }

  const handleEdit = () => {
    console.log('✏️ Edit button clicked for job:', job.id);
    onEdit?.(job);
  };

  const handleDelete = () => {
    console.log('🗑️ Delete button clicked for job:', job.id);
    onDelete?.(job);
  };

  return (
    <div className="flex gap-2">
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="flex items-center gap-1"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      )}
    </div>
  );
};

export default JobManagementActions;
