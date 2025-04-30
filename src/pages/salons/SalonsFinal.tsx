
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { salonListings, vietnameseSalonListings } from '@/data/salonData';
import ValidatedSalonCard from '@/components/salons/ValidatedSalonCard';
import { Plus, Search } from 'lucide-react';

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

      {/* Enhanced hero banner with responsive sizing and better visual impact */}
      <div className="container mx-auto px-4 py-6">
        <div className="w-full relative overflow-hidden rounded-2xl shadow-lg min-h-[350px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px]">
          {/* Main image with improved sizing and positioning */}
          <img 
            src="/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png" 
            alt="Luxury salon interior" 
            className="w-full h-full absolute inset-0 object-cover object-center"
          />
          
          {/* Improved gradient overlay with better fade effect */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6))',
            }} 
          />
          
          {/* Hero content with improved spacing and responsiveness */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-3 md:mb-4 max-w-3xl mx-auto leading-tight">
              Premium Salons for Sale — Ready to Own
            </h1>
            <p className="text-white text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90 font-light">
              Discover, list, and buy high-end beauty businesses with EmviApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md mx-auto">
              <Link to="/sell-salon" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 shadow-md"
                >
                  <Plus className="w-5 h-5 mr-1" /> Post Your Salon
                </Button>
              </Link>
              <Link to="#listings" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-2 border-white text-white bg-transparent hover:bg-white/10 shadow-md"
                >
                  <Search className="w-5 h-5 mr-1" /> Browse Listings
                </Button>
              </Link>
            </div>
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
