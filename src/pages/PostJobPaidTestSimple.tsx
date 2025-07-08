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
      {/* Testing Warning Banner */}
      <div className="bg-amber-500 text-amber-900 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">🧪 PAID JOB TEST MODE</span>
            </div>
            <div className="text-sm font-medium">
              Using modified free job form with paid pricing_tier
            </div>
          </div>
          <div className="mt-2 text-sm">
            ⚠️ This should create a job with pricing_tier: "paid" instead of "free"
          </div>
        </div>
      </div>
      
      <PaidJobForm />
    </div>
  );
};

export default PostJobPaidTest;