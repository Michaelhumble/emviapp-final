
import React from 'react';
import JobsPage from './index';
import StablePageWrapper from '@/components/common/StablePageWrapper';

/**
 * Stable wrapper for the jobs pages using the reusable StablePageWrapper
 */
const StableJobsPage: React.FC = () => {
  return (
    <StablePageWrapper
      title="Job Listings"
      description="Browse job opportunities in the beauty industry"
      fallbackLinks={[
        { href: "/salons", label: "Salons" },
        { href: "/", label: "Homepage" },
        { href: "/dashboard", label: "Dashboard" }
      ]}
      version="1.0.0"
    >
      <JobsPage />
    </StablePageWrapper>
  );
};

export default StableJobsPage;
