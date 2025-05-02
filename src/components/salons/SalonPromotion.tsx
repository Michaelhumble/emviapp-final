
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const SalonPromotion: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm border border-blue-100 text-center mb-8">
      <h3 className="font-semibold text-lg mb-2">List Your Salon on EmviApp</h3>
      <p className="text-gray-700 mb-4">
        Reach thousands of potential clients and talented nail technicians looking for their next opportunity.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5 px-4">
          Standard Listing: $49
        </Badge>
        <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5 px-4">
          Featured Listing: $99
        </Badge>
        <Link to="/signup">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6">
            List Your Salon
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalonPromotion;
