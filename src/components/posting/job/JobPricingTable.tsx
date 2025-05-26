
import React from 'react';
import { motion } from 'framer-motion';
import EnhancedJobPricingHero from './EnhancedJobPricingHero';
import PremiumJobPricingCards from './PremiumJobPricingCards';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  return (
    <div className="min-h-screen">
      {/* Pricing Cards Section */}
      <PremiumJobPricingCards 
        onPricingSelect={onPricingSelect}
        jobData={jobData}
      />
    </div>
  );
};

export default JobPricingTable;
