
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateJobPosting from '@/pages/jobs/CreateJobPosting';
import { useFeatureFlag } from '@/utils/featureFlags/useFeatureFlag';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';

/**
 * Route component for job posting that handles routing logic
 */
const JobPostingRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLegacyFlow = useFeatureFlag('useJobPostingLegacyFlow');
  
  // Log page view for analytics
  useEffect(() => {
    logJobPostingEvent('PAGE_VIEW', 'Job Posting Route', {
      path: location.pathname,
      isLegacyFlow
    });
  }, [location.pathname, isLegacyFlow]);

  return <CreateJobPosting />;
};

export default JobPostingRoute;
