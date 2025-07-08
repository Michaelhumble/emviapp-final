import React from 'react';
import { Helmet } from 'react-helmet-async';
import PaidJobTestFormExact from '@/components/jobs/PaidJobTestFormExact';

const PostJobPaidTest: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Paid Job Test - EmviApp</title>
        <meta name="description" content="Test paid job posting - saves directly to database" />
      </Helmet>

      <PaidJobTestFormExact />
    </>
  );
};

export default PostJobPaidTest;