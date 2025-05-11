import React, { useState } from 'react';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import { PricingOptions } from '@/utils/posting/types';
import { JobDetailsSubmission } from '@/types/job';
import ReviewAndPaymentSection from '@/components/posting/ReviewAndPaymentSection';

// Example JobPost component
const JobPost = () => {
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission>({
    title: '',
    description: '',
    location: '',
    company: '', // Added this field to match the type
  });
  
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false
  });
  
  const handleJobDetailsChange = (details: Partial<JobDetailsSubmission>) => {
    setJobDetails(prevDetails => ({ ...prevDetails, ...details }));
  };
  
  const handlePricingChange = (options: Partial<PricingOptions>) => {
    setPricingOptions(prev => ({ ...prev, ...options }));
  };
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Post a Job</h1>
      
      {/* Job Details Section */}
      <JobDetailsSection 
        details={jobDetails}
        onChange={handleJobDetailsChange}
      />
      
      {/* Pricing Section - Temporarily using a simplified version */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Select a Plan</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Simple plan selection buttons */}
          {['free', 'standard', 'premium', 'gold'].map(tier => (
            <button
              key={tier}
              className={`p-4 border rounded-lg ${
                pricingOptions.selectedPricingTier === tier 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200"
              }`}
              onClick={() => handlePricingChange({ selectedPricingTier: tier })}
            >
              <div className="font-bold capitalize">{tier}</div>
            </button>
          ))}
        </div>
        
        {/* Duration selection */}
        <div className="space-y-2">
          <h3 className="font-medium">Duration</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[1, 3, 6, 12].map(months => (
              <button
                key={months}
                className={`p-3 border rounded ${
                  pricingOptions.durationMonths === months 
                    ? "border-purple-500 bg-purple-50" 
                    : "border-gray-200"
                }`}
                onClick={() => handlePricingChange({ durationMonths: months })}
              >
                {months} month{months > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Review and Payment Section */}
      <ReviewAndPaymentSection
        pricingId={pricingOptions.selectedPricingTier}
        duration={pricingOptions.durationMonths || 1}
        autoRenew={pricingOptions.autoRenew || false}
        jobDetails={jobDetails}
        pricingOptions={pricingOptions}
        onValidationError={(msg) => console.error(msg)}
      />
    </div>
  );
};

export default JobPost;
