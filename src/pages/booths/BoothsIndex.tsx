
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BoothsIndex = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Booth Rentals</h1>
        <p className="text-lg text-gray-600 mb-8">
          Find the perfect booth rental for your beauty business
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-blue-800 mb-4">
            Booth rental listings are coming soon! Check back later for available spaces.
          </p>
          <Link to="/jobs">
            <Button>Browse Job Listings Instead</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoothsIndex;
