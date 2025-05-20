
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import JobSummary from './card-sections/JobSummary';
import { Job } from '@/types/job';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, isOpen, onClose }) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <JobSummary 
          title={job.title || ""}
          description={job.description || ""}
          location={job.location || ""}
          contactEmail={job.contactEmail || job.contact_info?.email || ""}
          contactPhone={job.contactPhone || job.contact_info?.phone || ""}
          salonName={job.salonName || job.company || ""}
        />
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
