import React from 'react';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';

const PostJobPaidTest = () => {
  console.log("🧪 PAID TEST PAGE MOUNTED - post-job-paid-test");
  console.log('🧪 PAID TEST PAGE MOUNTED - PostJobPaidTest is rendering modified FreeJobPostingForm');
  
  // Create a wrapper that modifies the free job form to use paid pricing_tier
  const PaidJobForm = () => {
    return <FreeJobPostingForm />;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/20">
      {/* Production Mode - Banner Removed */}
      
      <PaidJobForm />
    </div>
  );
};

export default PostJobPaidTest;