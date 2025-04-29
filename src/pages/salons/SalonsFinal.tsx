
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { salonListings, vietnameseSalonListings } from '@/data/salonData';
import ValidatedSalonCard from '@/components/salons/ValidatedSalonCard';
import PremiumSalonBanner from '@/components/salons/PremiumSalonBanner';

const SalonsFinalsPage = () => {
  useEffect(() => {
    // Enhanced debugging - confirm this component is rendering properly
    console.log('SalonsFinal page rendered directly with PremiumSalonBanner - timestamp:', new Date().toISOString());
    
    // Force a reflow/repaint to ensure banner renders correctly
    const banner = document.querySelector('.bg-cover');
    if (banner) {
      banner.classList.add('force-repaint');
      setTimeout(() => banner.classList.remove('force-repaint'), 100);
    }
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

      {/* Premium Banner */}
      <PremiumSalonBanner />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Premium Listings Section - Immediately below the banner */}
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
