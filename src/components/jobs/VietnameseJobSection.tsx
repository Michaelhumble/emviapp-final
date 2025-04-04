
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import JobListingCard from './JobListingCard';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { generateVietnameseNailJobs } from '@/utils/jobs/vietnameseJobSamples';
import { useNavigate } from 'react-router-dom';
import JobDetailModal from './JobDetailModal';

interface VietnameseJobSectionProps {
  jobs?: Job[];
  checkExpiration?: (job: Job) => boolean;
}

const VietnameseJobSection: React.FC<VietnameseJobSectionProps> = ({ jobs, checkExpiration }) => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [renewingJobId, setRenewingJobId] = useState<string | null>(null);
  
  const handleViewAll = () => {
    navigate('/jobs');
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  // Default expiration check if none is provided
  const defaultCheckExpiration = (job: Job): boolean => {
    const createdDate = new Date(job.created_at);
    const now = new Date();
    const differenceInDays = Math.floor(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays >= 30;
  };

  const isExpired = (job: Job): boolean => {
    return checkExpiration ? checkExpiration(job) : defaultCheckExpiration(job);
  };

  // Mock renew function
  const handleRenew = (job: Job) => {
    setRenewingJobId(job.id);
    // In a real implementation, this would handle the renewal process
    setTimeout(() => setRenewingJobId(null), 2000);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Vietnamese Nail Tech Jobs <Sparkles className="inline-block h-5 w-5 ml-1 text-yellow-500" />
          </h2>
          <Button variant="outline" size="sm" onClick={handleViewAll}>
            View All
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <JobListingCard 
                  job={job}
                  isExpired={isExpired(job)}
                  onViewDetails={() => viewJobDetails(job)}
                  onRenew={() => handleRenew(job)}
                  isRenewing={renewingJobId === job.id}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No Vietnamese nail tech jobs available at the moment. Check back later!</p>
            </div>
          )}
        </div>
        
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            isOpen={!!selectedJob}
            onClose={closeJobDetails}
          />
        )}
      </div>
    </section>
  );
};

export default VietnameseJobSection;
