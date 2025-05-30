
import React, { useState } from 'react';
import { Job } from '@/types/job';
import { sampleSalonsForSale } from '@/data/sampleSalonsForSale';
import { SalonListings } from '@/components/salons/SalonListings';
import SalonPromotion from '@/components/salons/SalonPromotion';
import { Store, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

const SalonsFinal = () => {
  const [salons] = useState<Job[]>(sampleSalonsForSale);
  const navigate = useNavigate();
  const { user } = useAuth();

  const onListSalonClick = () => {
    if (user) {
      navigate("/post-salon");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Enhanced Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/salon-banner.png')",
          }}
        />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Salons for Sale
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-inter">
              Discover established nail salons ready for new ownership. Find your perfect business opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <span className="text-lg font-semibold text-white">{salons.length} Active Listings</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <span className="text-lg font-semibold text-white">$50K - $500K+ Range</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Promotion Section */}
        <SalonPromotion />
        
        {/* Listings Section */}
        <SalonListings salonsForSale={salons} />
      </div>

      {/* Floating List Salon CTA - similar to Jobs page */}
      <button 
        onClick={onListSalonClick}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-[#9A7B69] to-[#B8956A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-30 border-2 border-white/20"
        aria-label="List your salon for sale"
      >
        <Store className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SalonsFinal;
