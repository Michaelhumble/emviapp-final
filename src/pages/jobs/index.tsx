
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from "@/hooks/useJobsData";

const Jobs = () => {
  const { jobs, loading } = useJobsData();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        
        {loading ? (
          <p className="text-gray-600">Loading job listings...</p>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company} • {job.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No job listings found. Check back soon!
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
