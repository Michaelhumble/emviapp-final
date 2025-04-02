
import JobCard from './JobCard';
import { Job } from '../../types/job';

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const JobList: React.FC<JobListProps> = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin w-12 h-12 rounded-full border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-200 mt-8">
        <p className="font-medium">Error loading jobs:</p>
        <p className="mt-1 text-red-300">{error}</p>
      </div>
    );
  }
  
  if (jobs.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700/50">
        <p className="text-xl font-medium text-gray-300 mb-2">No jobs found</p>
        <p className="text-gray-400">Try adjusting your filters to see more results</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 subtle-enter">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
