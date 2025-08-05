
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FeaturedSalonsShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4">
        {/* Section Number Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 rounded-full px-4 py-2">
            <span className="w-6 h-6 bg-purple-600 text-white text-sm font-semibold rounded-full flex items-center justify-center">
              5
            </span>
            <span className="text-purple-700 font-medium text-sm font-primary">
              Featured Opportunities
            </span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight">Featured Salons For Sale</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-primary">
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
