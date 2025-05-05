
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import NailListingsSection from './NailListingsSection';
import HairListingsSection from './HairListingsSection';
import BarberPremiumListingsSection from './BarberPremiumListingsSection';

const BeautyExchangeSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Emvi Beauty Connections™
          </h2>
          <p className="text-lg text-gray-600">
            Connect with artists, salon owners, and clients through a shared vision of beauty and success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Artists</h3>
            <p className="text-gray-600 mb-4">
              Find clients who value your craft, set your own schedule, and grow your career.
            </p>
            <Link to="/auth/signup">
              <Button variant="outline" size="sm" className="inline-flex items-center">
                Join Today <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Salon Owners</h3>
            <p className="text-gray-600 mb-4">
              Find reliable talent, streamline operations, and build a thriving business.
            </p>
            <Link to="/auth/signup">
              <Button variant="outline" size="sm" className="inline-flex items-center">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Clients</h3>
            <p className="text-gray-600 mb-4">
              Discover talented artists, book with confidence, and enjoy seamless beauty services.
            </p>
            <Link to="/auth/signup">
              <Button variant="outline" size="sm" className="inline-flex items-center">
                Find Services <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* First, render the NailListingsSection */}
        <NailListingsSection />
        
        {/* Next, render the HairListingsSection */}
        <HairListingsSection />
        
        {/* Then, render the new BarberPremiumListingsSection */}
        <BarberPremiumListingsSection />
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
