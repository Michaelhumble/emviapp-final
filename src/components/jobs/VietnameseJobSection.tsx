import React from 'react';
import { motion } from 'framer-motion';
import JobListingCard from './JobListingCard';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { generateVietnameseNailJobs } from '@/utils/jobs/vietnameseNailJobSamples';
import { useNavigate } from 'react-router-dom';

interface VietnameseJobSectionProps {
  jobs?: Job[];
}

const VietnameseJobSection: React.FC<VietnameseJobSectionProps> = ({ jobs }) => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate('/jobs');
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
                <JobListingCard job={job} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No Vietnamese nail tech jobs available at the moment. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VietnameseJobSection;
