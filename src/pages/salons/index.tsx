
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { getSalonListings } from '@/data/listings';
import { Skeleton } from '@/components/ui/skeleton';

const SalonsPage = () => {
  const listings = getSalonListings();

  return (
    <Layout>
      <Helmet>
        <title>Salon Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Browse available nail salons for sale and opportunities"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-2">
            Salon Listings
          </h1>
          <p className="text-gray-600 mb-8">
            Browse available nail salons and business opportunities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {listings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No salon listings available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalonsPage;
