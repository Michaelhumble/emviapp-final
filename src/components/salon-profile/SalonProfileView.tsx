
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Salon } from '@/types/salon';
import SalonProfileHeader from './SalonProfileHeader';
import SalonAboutSection from './SalonAboutSection';
import SalonServicesSection from './SalonServicesSection';
import SalonTeamSection from './SalonTeamSection';
import SalonContactSection from './SalonContactSection';
import SalonBookingFooter from './SalonBookingFooter';

interface SalonProfileViewProps {
  salon: Salon;
  loading?: boolean;
}

const SalonProfileView: React.FC<SalonProfileViewProps> = ({ salon, loading = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-8 max-w-7xl mx-auto px-4 py-8">
        <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-36 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-80 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen relative pb-20">
      <SalonProfileHeader salon={salon} />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-8 space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SalonAboutSection salon={salon} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <SalonServicesSection 
            salon={salon} 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <SalonTeamSection salon={salon} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <SalonContactSection salon={salon} />
        </motion.div>
      </motion.div>
      
      <SalonBookingFooter salon={salon} />
    </div>
  );
};

export default SalonProfileView;
