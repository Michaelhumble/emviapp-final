
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { salonListings } from '@/data/salonData';
import SimpleSalonCard from '@/components/salons/SimpleSalonCard';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

const SalonsFinalsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium salons for sale. Find your next business opportunity with EmviApp." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Luxury Hero Banner - Using new image */}
          <div className="relative w-full mb-10 overflow-hidden rounded-lg">
            <ImageWithFallback
              src="/lovable-uploads/98f473d0-0359-4114-9bcc-c9aea3c6fcf6.png"
              alt="Luxury beauty salon entrance with FOR SALE sign"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button variant="outline" className="rounded-full">
              All Locations
            </Button>
            <Button variant="outline" className="rounded-full">
              Under $200K
            </Button>
            <Button variant="outline" className="rounded-full">
              $200K - $500K
            </Button>
            <Button variant="outline" className="rounded-full">
              Over $500K
            </Button>
            <Button variant="outline" className="rounded-full">
              Recently Added
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salonListings.map((salon) => (
              <SimpleSalonCard key={salon.id} salon={salon} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="font-playfair text-2xl font-semibold mb-4">
              Have a salon you want to sell?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              List your salon with EmviApp to reach thousands of potential buyers in the beauty industry.
            </p>
            <Link to="/sell-salon">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                List Your Salon
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonsFinalsPage;
