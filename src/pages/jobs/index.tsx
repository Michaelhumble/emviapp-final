
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from "@/hooks/useJobsData";
import JobsGrid from '@/components/jobs/JobsGrid';
import JobFilters from '@/components/jobs/JobFilters';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';

const Jobs = () => {
  const { jobs, loading, error, filters, updateFilters } = useJobsData();
  
  useEffect(() => {
    console.log("Jobs index page loaded successfully");
    document.title = "Job Listings | EmviApp";
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Job Listings</h1>
            <p className="text-gray-600 mb-6">
              Find your next nail technician position or post job openings for your salon
            </p>
            
            <JobFilters filters={filters} updateFilters={updateFilters} />
          </div>
          
          {loading ? (
            <JobLoadingState />
          ) : jobs.length > 0 ? (
            <JobsGrid jobs={jobs} />
          ) : (
            <JobEmptyState />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
