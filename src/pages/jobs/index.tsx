
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from "@/hooks/useJobsData";
import JobsGrid from '@/components/jobs/JobsGrid';
import JobFilters from '@/components/jobs/JobFilters';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import JobPostCTA from './JobPostCTA';
import { Job } from "@/types/job";
import { differenceInDays } from 'date-fns';
import { toast } from "sonner";

const Jobs = () => {
  // Use the hook to fetch jobs data
  const { jobs, loading, error, filters, updateFilters, fetchJobs } = useJobsData();
  
  // Track filter and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [jobExpirations, setJobExpirations] = useState<Record<string, boolean>>({});
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("Jobs index page loaded successfully");
    document.title = "Job Listings | EmviApp";
    
    // Check which jobs are expired
    const expirations: Record<string, boolean> = {};
    jobs.forEach(job => {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      expirations[job.id] = differenceInDays(now, createdDate) >= 30;
    });
    setJobExpirations(expirations);
  }, [jobs]);

  // Function to handle job listing renewal
  const handleRenewJob = (job: Job) => {
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate renewing a job posting
    setTimeout(() => {
      // In a real app, this would be an API call
      setIsRenewing(false);
      setRenewalJobId(null);
      toast.success("Job listing renewed successfully for another 30 days");
      fetchJobs(); // Refresh jobs
    }, 1500);
  };
  
  // Reset filters function
  const resetFilters = () => {
    updateFilters({
      weeklyPay: false,
      ownerWillTrain: false,
      employmentType: 'all',
      showExpired: false,
      hasHousing: false,
      noSupplyDeduction: false
    });
    setSearchTerm("");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Job Listings</h1>
            <p className="text-gray-600 mb-6">
              Find your next nail technician position or post job openings for your salon
            </p>
            
            <JobPostCTA />
            
            <JobFilters
              filters={{
                weeklyPay: filters.weeklyPay || false,
                ownerWillTrain: filters.ownerWillTrain || false,
                employmentType: filters.employmentType || 'all',
                showExpired: filters.showExpired || false,
                hasHousing: filters.hasHousing || false,
                noSupplyDeduction: filters.noSupplyDeduction || false
              }}
              searchTerm={searchTerm}
              onFiltersChange={updateFilters}
              onSearchChange={setSearchTerm}
              onResetFilters={resetFilters}
              showVietnameseFilters={true}
            />
          </div>
          
          {loading ? (
            <JobLoadingState />
          ) : jobs.length > 0 ? (
            <JobsGrid 
              jobs={jobs} 
              expirations={jobExpirations}
              onRenew={handleRenewJob}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
            />
          ) : (
            <JobEmptyState onResetFilters={resetFilters} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
