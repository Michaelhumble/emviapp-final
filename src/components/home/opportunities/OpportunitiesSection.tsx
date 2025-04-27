
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Job } from '@/types/job';
import OpportunityCard from './OpportunityCard';
import AuthAction from '@/components/common/AuthAction';

interface OpportunitiesSectionProps {
  diverseListings: Job[];
}

const OpportunitiesSection = ({ diverseListings }: OpportunitiesSectionProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = async (job: Job): Promise<boolean> => {
    // Navigate to the dedicated opportunity detail page
    navigate(`/opportunities/${job.id}`);
    return true; // Return true to indicate successful navigation
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Opportunities Across Beauty & Business
          </h2>
          <p className="text-lg text-gray-600">
            From salons hiring to businesses for sale — discover what's available today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {diverseListings.map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => handleViewDetails(listing)}
              redirectPath={`/opportunities/${listing.id}`}
            >
              <OpportunityCard 
                key={listing.id} 
                listing={listing} 
                index={index}
              />
            </AuthAction>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="font-medium">
              <Briefcase className="mr-2 h-4 w-4" />
              Browse All Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
