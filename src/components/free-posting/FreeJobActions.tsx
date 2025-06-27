
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { Job } from '@/types/job';
import { toast } from 'sonner';

interface FreeJobActionsProps {
  job: Job;
  onJobDeleted?: () => void;
}

const FreeJobActions = ({ job, onJobDeleted }: FreeJobActionsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  // Only show actions if user owns this job or is admin
  const canEdit = user && (user.id === job.user_id || user.role === 'admin');

  if (!canEdit) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/edit-free-job/${job.id}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', job.id)
        .eq('user_id', user!.id);

      if (error) throw error;

      toast.success('Job deleted successfully');
      if (onJobDeleted) {
        onJobDeleted();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      <Button
        size="sm"
        variant="outline"
        onClick={handleEdit}
        className="flex items-center gap-1"
      >
        <Edit className="h-3 w-3" />
        Edit
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
      >
        {deleting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Trash2 className="h-3 w-3" />
        )}
        Delete
      </Button>
    </div>
  );
};

export default FreeJobActions;
