
import React from 'react';
import { useJobsFromDatabase } from '@/hooks/useJobsFromDatabase';
import BilingualJobCard from './BilingualJobCard';
import { Job } from '@/types/job';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DatabaseJobsSectionProps {
  onViewDetails: (job: Job) => void;
}

const DatabaseJobsSection: React.FC<DatabaseJobsSectionProps> = ({ onViewDetails }) => {
  const { jobsByTier, loading, error, totalCount } = useJobsFromDatabase();

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Live Job Postings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="my-8 bg-red-50 border-red-200">
        <AlertDescription className="text-red-800">
          Unable to load live job postings: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (totalCount === 0) {
    // Return nothing if no database jobs - don't show empty section
    return null;
  }

  return (
    <div className="space-y-8 mt-12">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Live Job Postings</h2>
        <p className="text-gray-600 mb-8">Recent opportunities posted by employers</p>
      </div>

      {/* Diamond Tier Database Jobs */}
      {jobsByTier.diamond.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">💎 Diamond Jobs</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobsByTier.diamond.map((job) => (
              <BilingualJobCard 
                key={job.id}
                job={job}
                onViewDetails={() => onViewDetails(job)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Premium Tier Database Jobs */}
      {jobsByTier.premium.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">⭐ Premium Jobs</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobsByTier.premium.map((job) => (
              <BilingualJobCard 
                key={job.id}
                job={job}
                onViewDetails={() => onViewDetails(job)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gold Tier Database Jobs */}
      {jobsByTier.gold.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">🥇 Gold Jobs</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobsByTier.gold.map((job) => (
              <BilingualJobCard 
                key={job.id}
                job={job}
                onViewDetails={() => onViewDetails(job)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Free Tier Database Jobs */}
      {jobsByTier.free.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">📝 Free Listings</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobsByTier.free.map((job) => (
              <BilingualJobCard 
                key={job.id}
                job={job}
                onViewDetails={() => onViewDetails(job)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseJobsSection;
