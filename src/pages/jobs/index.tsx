
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import { useJobsData } from '@/hooks/useJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import VietnameseJobSection from '@/components/jobs/VietnameseJobSection';
import JobDetailModal from '@/components/jobs/JobDetailModal';
import { Job } from '@/types/job';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const JobsPage: React.FC = () => {
  const { isSignedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  const { 
    jobs, 
    loading,
    error,
    updateSearchTerm,
    featuredJobs,
    renewalJobId,
    setActiveRenewalJobId
  } = useJobsData();
  
  useEffect(() => {
    document.title = "Vietnamese Jobs Board | EmviApp";
  }, []);
  
  // Handle search term changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateSearchTerm(value);
  };
  
  // Handle job renewals
  const handleRenewJob = (job: Job) => {
    if (!isSignedIn) {
      toast.error("Please sign in to renew job listings.");
      return;
    }
    
    setActiveRenewalJobId(job.id);
    
    // Simulate API call for renewal
    setTimeout(() => {
      toast.success("Job listing renewed successfully!");
      setActiveRenewalJobId(null);
    }, 1500);
  };
  
  // Job Detail View Handling
  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const closeJobDetails = () => {
    setIsJobModalOpen(false);
  };
  
  // Create memoized job expirations lookup
  const expirations: Record<string, boolean> = {};
  jobs.forEach(job => {
    const createdDate = new Date(job.created_at);
    const now = new Date();
    const diffDays = Math.ceil(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    expirations[job.id] = diffDays >= 30;
  });
  
  // Filter Vietnamese jobs from the dataset
  const vietnameseJobs = jobs.filter(job => 
    job.vietnamese_description && job.vietnamese_description.length > 0
  );
  
  // Filter standard job listings 
  const standardJobs = jobs.filter(job => 
    !job.vietnamese_description || job.vietnamese_description.length === 0
  );
  
  // Filter featured jobs
  const featuredJobsFiltered = standardJobs.filter(job => job.is_featured || job.featured);
  
  // Filter regular jobs
  const regularJobs = standardJobs.filter(job => !job.is_featured && !job.featured);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error loading jobs</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Job Board | EmviApp</title>
        <meta 
          name="description" 
          content="Find jobs in the beauty industry, with listings for nail technicians, hair stylists, and more."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home button */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        {/* Job Search Bar */}
        <JobSearchBar 
          value={searchTerm} 
          onSearchChange={handleSearch}
          onSearch={handleSearch}
        />
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Vietnamese Job Listings Section */}
            {vietnameseJobs.length > 0 && (
              <VietnameseJobSection 
                vietnameseJobs={vietnameseJobs} 
                onViewDetails={viewJobDetails} 
                searchTerm={searchTerm}
              />
            )}
            
            {/* Featured Job Listings */}
            {featuredJobsFiltered.length > 0 && (
              <section>
                <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
                  ✨ Featured Opportunities
                </h2>
                
                <JobsGrid 
                  jobs={featuredJobsFiltered}
                  expirations={expirations}
                  onRenew={handleRenewJob}
                  isRenewing={!!renewalJobId}
                  renewalJobId={renewalJobId}
                />
              </section>
            )}
            
            {/* Standard Job Listings */}
            {regularJobs.length > 0 && (
              <section>
                <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
                  📋 Latest Opportunities
                </h2>
                
                <JobsGrid 
                  jobs={regularJobs}
                  expirations={expirations}
                  onRenew={handleRenewJob}
                  isRenewing={!!renewalJobId}
                  renewalJobId={renewalJobId}
                />
              </section>
            )}
          </div>
        )}
        
        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailModal 
            job={selectedJob}
            isOpen={isJobModalOpen}
            onClose={closeJobDetails}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
