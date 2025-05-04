
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { salonListings, vietnameseSalonListings } from '@/data/salonData';
import ValidatedSalonCard from '@/components/salons/ValidatedSalonCard';
import { Plus, Search } from 'lucide-react';
import HairBarberListingsSection from '@/components/salons/HairBarberListingsSection';

const SalonsFinalsPage = () => {
  useEffect(() => {
    // Simple debug log to confirm rendering
    console.log('SalonsFinal page rendered - timestamp:', new Date().toISOString());
    
    // Add an image loading debug
    const img = new Image();
    img.onload = () => console.log('✅ Salon banner image loaded successfully');
    img.onerror = () => console.error('❌ Failed to load salon banner image');
    img.src = '/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png';
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium salons for sale. Find your next business opportunity with EmviApp." 
        />
      </Helmet>

      {/* Hero banner with overlay, text and buttons - increased height */}
      <div className="w-full relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Main image with object-cover to fill the space while maintaining aspect ratio */}
        <img 
          src="/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png" 
          alt="Luxury salon interior" 
          className="w-full h-full object-cover"
        />
        
        {/* Dark gradient overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35))',
          }} 
        />
        
        {/* Hero content - centered both vertically and horizontally */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-3">
            Premium Salons for Sale — Ready to Own
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl opacity-90">
            Discover, list, and buy high-end beauty businesses with EmviApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/sell-salon">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
              >
                <Plus className="w-5 h-5 mr-1" /> Post Your Salon
              </Button>
            </Link>
            <Link to="#listings">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white/10"
              >
                <Search className="w-5 h-5 mr-1" /> Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12" id="listings">
        <div className="max-w-7xl mx-auto">
          {/* Premium Listings Section */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
              Premium Salon Listings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salonListings.map((salon) => (
                <ValidatedSalonCard key={salon.id} salon={salon} listingType="salon" />
              ))}
            </div>
          </div>

          {/* Hair & Barber Listings Section - New section */}
          <HairBarberListingsSection />

          {/* Vietnamese Nail Listings Section - Restored section */}
          <div className="mb-16 border-t pt-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              💅 Tin Rao Vặt Tiệm Nail – Cộng Đồng Người Việt
            </h2>
            <p className="text-gray-600 mb-6">
              Vietnamese nail salon listings for our community
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vietnameseSalonListings.map((salon) => (
                <ValidatedSalonCard 
                  key={salon.id} 
                  salon={salon} 
                  listingType="salon" 
                />
              ))}
            </div>
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
