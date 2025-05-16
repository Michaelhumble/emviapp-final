
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Job } from '@/types/job';
import ValidatedSalonCard from './ValidatedSalonCard';

interface FeaturedListingsSectionProps {
  featuredListings: Job[];
  title?: string;
  subtitle?: string;
  className?: string;
  limit?: number;
  filter?: (listing: Job) => boolean;
  emptyMessage?: string;
  seeAllLink?: string;
  seeAllText?: string;
}

const FeaturedListingsSection = ({
  featuredListings,
  title = "Featured Salon Listings",
  subtitle,
  className = "",
  limit = 3,
  filter = () => true,
  emptyMessage = "No featured listings available at this time.",
  seeAllLink = "/salons",
  seeAllText = "Browse all salon listings"
}: FeaturedListingsSectionProps) => {
  // Apply filter and limit
  const filteredListings = featuredListings.filter(filter).slice(0, limit);
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
          </motion.div>
        </div>

        {filteredListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <ValidatedSalonCard
                  key={listing.id}
                  salon={{
                    id: listing.id,
                    title: listing.title,
                    location: listing.location,
                    imageUrl: listing.imageUrl || '',
                    description: listing.description,
                    price: typeof listing.asking_price === 'string' ? listing.asking_price : listing.asking_price?.toString() || '',
                    features: listing.salon_features || [],
                    status: listing.status || 'active',
                  }}
                  listingType={listing.type || 'salon'}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                to={seeAllLink} 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                {seeAllText}
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
