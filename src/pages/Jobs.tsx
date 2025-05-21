
import React, { useEffect } from 'react';
import JobsPage from './jobs';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import CreateJobPosting from './jobs/CreateJobPosting';
import { useTranslation } from '@/hooks/useTranslation';
import MobileJobsNavBar from '@/components/jobs/MobileJobsNavBar';

const Jobs = () => {
  const { isVietnamese } = useTranslation();
  
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering JobsPage component");
    document.title = isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp";
  }, [isVietnamese]);

  return (
    <Layout>
      <Helmet>
        <title>
          {isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}
        </title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Duyệt cơ hội việc làm trong ngành làm đẹp. Tìm vị trí dành cho kỹ thuật viên nail, thợ làm tóc, chuyên viên thẩm mỹ, và nhiều hơn nữa."
            : "Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
          }
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/create" element={<CreateJobPosting />} />
      </Routes>
      <MobileJobsNavBar />
    </Layout>
  );
};

export default Jobs;
