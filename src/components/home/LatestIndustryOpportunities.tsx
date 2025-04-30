
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import OpportunityCard from './opportunities/OpportunityCard';
import { verifyListings, enhanceListingWithImage } from '@/utils/listingsVerification';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample data - in a real app, this would come from your API
const sampleOpportunities = [
  {
    id: '1',
    title: 'Senior Nail Technician',
    company: 'Luxury Nails & Spa',
    location: 'Los Angeles, CA',
    description: 'Looking for an experienced nail technician with at least 3 years of experience in luxury salon settings.',
    image: '/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png'
  },
  {
    id: '2',
    title: 'Full-Time Hair Stylist',
    company: 'Glamour Salon',
    location: 'Irvine, CA',
    description: 'Join our growing team of professional stylists. Great commission rates and regular clientele.',
    image: '/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png'
  },
  {
    id: '3',
    title: 'Booth Rental Available',
    company: 'Studio Beauty',
    location: 'Santa Monica, CA',
    description: 'Prime location booth rental for nail technicians in a busy shopping area. All amenities included.',
    image: '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png'
  }
];

const LatestIndustryOpportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Job[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now we'll use sample data with transformation to match Job type
    const enhancedOpportunities = sampleOpportunities.map(opportunity => {
      const enhanced = enhanceListingWithImage({
        ...opportunity,
        type: 'opportunity',
        created_at: new Date().toISOString(), // Required by Job type
        // Add any other required properties for Job type
      });
      
      return enhanced;
    });
    
    setOpportunities(enhancedOpportunities);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Latest Industry Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most recent openings and booth rentals in the beauty industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <div key={opportunity.id}>
              <OpportunityCard listing={opportunity} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/opportunities">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-medium">
              View All Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestIndustryOpportunities;
