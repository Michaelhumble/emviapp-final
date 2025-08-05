
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FeaturedSalonsShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">Featured Salons For Sale</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Discover premium salon opportunities in your area
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link to="/salons">
            <Button variant="outline" size="lg" className="font-medium">
              View All Salon Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSalonsShowcase;
