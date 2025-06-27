
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Job } from '@/types/job';

interface FreeJobActionsProps {
  job: Job;
}

const FreeJobActions = ({ job }: FreeJobActionsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Only show actions if user owns this job or is admin
  const canEdit = user && (user.id === job.user_id || user.role === 'admin');

  if (!canEdit) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/edit-free-job/${job.id}`);
  };

  return (
    <div className="flex gap-2 mt-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleEdit}
        className="flex items-center gap-1"
      >
        <Edit className="h-3 w-3" />
        Edit
      </Button>
    </div>
  );
};

export default FreeJobActions;
