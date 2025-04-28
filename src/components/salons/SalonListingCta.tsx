
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SalonListingCta = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 flex-1">
          <h3 className="font-serif text-xl font-semibold mb-2">List Your Salon For Sale</h3>
          <p className="text-gray-600 max-w-md">
            Reach thousands of potential buyers and sell your salon faster on EmviApp's premium salon marketplace.
          </p>
        </div>
        <Link to="/salon-listing">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
            List Your Salon Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalonListingCta;
