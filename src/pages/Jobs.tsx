
import React, { useEffect } from 'react';
import OptimizedJobsPageContent from './jobs/OptimizedJobsPageContent';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import CreateJobPosting from './jobs/CreateJobPosting';
import EditJobPage from './jobs/EditJobPage';
import { useTranslation } from '@/hooks/useTranslation';

const Jobs = () => {
  const { isVietnamese } = useTranslation();
  
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering OptimizedJobsPageContent component");
    document.title = isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp";
  }, [isVietnamese]);

  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<OptimizedJobsPageContent />} />
          <Route path="/create" element={<CreateJobPosting />} />
          <Route path="/edit/:jobId" element={<EditJobPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Jobs;
