
import React from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import OpportunityCard from './OpportunityCard';
import AuthAction from '@/components/common/AuthAction';

interface OpportunitiesSectionProps {
  diverseListings: Job[];
}

const OpportunitiesSection = ({ diverseListings }: OpportunitiesSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">
            Industry Opportunities
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From established salons to thriving businesses for sale — discover your next career move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diverseListings.map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => true}
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
      </div>
    </section>
  );
};

export default OpportunitiesSection;
