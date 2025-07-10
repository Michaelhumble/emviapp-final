import React from 'react';
import { motion } from 'framer-motion';
import { nailListings } from '@/data/industryListings';
import OpportunityCard from './OpportunityCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedOpportunities = () => {
  // Get premium and diamond nails listings for homepage
  const featuredNailListings = nailListings
    .filter(listing => listing.tier === 'diamond' || listing.tier === 'premium')
    .slice(0, 6)
    .map(listing => ({
      ...listing,
      type: 'job' as const,
      category: 'Nail Tech',
      created_at: new Date().toISOString(),
      descriptionPreview: listing.summary.substring(0, 120) + '...'
    }));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Featured Nails Opportunities
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            Discover exclusive nail technician positions at premium salons and spas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredNailListings.map((listing, index) => (
            <OpportunityCard 
              key={listing.id} 
              listing={listing} 
              index={index} 
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/nails">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-bold px-8 py-3 rounded-xl"
            >
              View All Nails Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;