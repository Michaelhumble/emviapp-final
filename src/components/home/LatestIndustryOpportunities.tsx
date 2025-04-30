
import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import jobsData from '@/data/jobsData'; // Changed from named import to default import
import OpportunitiesSection from './opportunities/OpportunitiesSection';
import { Job } from '@/types/job';

/**
 * Enhanced LatestIndustryOpportunities section component
 * Shows curated job listings and opportunities
 */
const LatestIndustryOpportunities = () => {
  const [listings, setListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to load and process listings
    const loadListings = () => {
      setLoading(true);
      
      try {
        // Filter and limit listings to 6 items for display
        const filteredListings = jobsData
          .filter(job => 
            (job.title || job.company) && 
            job.location && 
            job.description
          )
          .slice(0, 6)
          .map(job => ({
            ...job,
            // Convert JobPosting to Job type with required fields
            id: job.id.toString(), // Convert number to string for Job interface
            created_at: new Date().toISOString(), // Add required created_at field
            image: job.image || '', // Ensure image is set
            imageUrl: job.image || '', // Map image to imageUrl
            type: 'opportunity'  // Default to opportunity type
          }));
        
        setListings(filteredListings as Job[]);
        console.log(`Loaded ${filteredListings.length} listings for display`);
      } catch (error) {
        console.error("Error loading opportunity listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  // This component should only render if we have valid listings to display
  if (listings.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6 font-playfair">
            Right Now on EmviApp — The Listings Everyone's Talking About
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exciting opportunities in the beauty industry, whether you're looking for your next job, 
            a new salon to work with, or a business opportunity.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="bg-gray-100 animate-pulse rounded-lg h-72"
              />
            ))}
          </div>
        ) : (
          <OpportunitiesSection diverseListings={listings} />
        )}
      </Container>
    </section>
  );
};

export default LatestIndustryOpportunities;
