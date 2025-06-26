
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Job } from '@/types/job';

interface JobManagementActionsProps {
  job: Job;
  currentUserId?: string;
  onJobDeleted?: () => void;
  onJobEdit?: (job: Job) => void;
}

const JobManagementActions: React.FC<JobManagementActionsProps> = ({
  job,
  currentUserId,
  onJobDeleted,
  onJobEdit
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if current user owns this job or is admin
  const canManage = currentUserId && (job.user_id === currentUserId);

  if (!canManage) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', job.id)
        .eq('user_id', currentUserId); // Additional security check

      if (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job posting');
        return;
      }

      toast.success('Job posting deleted successfully');
      setShowDeleteDialog(false);
      
      if (onJobDeleted) {
        onJobDeleted();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job posting');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (onJobEdit) {
      onJobEdit(job);
    } else {
      // For now, just show a toast - actual edit functionality can be added later
      toast.info('Edit functionality will be available soon');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{job.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobManagementActions;
