import React from 'react';
import { Helmet } from 'react-helmet-async';
import PaidJobTestForm from '@/components/jobs/PaidJobTestForm';

const PostJobPaidTest: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Paid Job Test - EmviApp</title>
        <meta name="description" content="Test paid job posting - saves directly to database" />
      </Helmet>

      <PaidJobTestForm />
    </>
  );
};

export default PostJobPaidTest;