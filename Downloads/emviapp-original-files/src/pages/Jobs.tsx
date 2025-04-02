
import { Briefcase } from 'lucide-react';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import { useJobData } from '../hooks/jobs/useJobData';

const Jobs = () => {
  const { jobs, loading, error, filters, handleFilterChange, filterJobs } = useJobData();

  // Use the filterJobs function to handle filter submissions
  const handleFiltersSubmit = (filters: any) => {
    filterJobs(filters);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="flex items-center mb-8">
        <Briefcase size={30} className="text-purple-400 mr-3" strokeWidth={1.5} />
        <h1 className="text-3xl font-medium bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-tight">
          Nail Tech Jobs
        </h1>
      </div>

      <div className="bg-gradient-to-b from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-8 mb-10 transition-all hover:shadow-purple-900/10">
        <h2 className="text-xl font-medium text-white mb-5 tracking-tight">Find Your Next Opportunity</h2>
        <JobFilters filters={filters} onFilterChange={handleFilterChange} onSubmit={handleFiltersSubmit} />
      </div>

      <JobList jobs={jobs} loading={loading} error={error} />
      
      <div className="h-20"></div> {/* Extra space at the bottom for better UX */}
    </div>
  );
};

export default Jobs;
