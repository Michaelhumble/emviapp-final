
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <EnhancedJobPricingHero />
        
        {/* Pricing Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PremiumJobPricingCards 
            onPricingSelect={onPricingSelect}
            jobData={jobData}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default JobPricingTable;
