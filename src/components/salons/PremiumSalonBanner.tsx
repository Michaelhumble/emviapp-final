
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PremiumSalonBanner: React.FC = () => {
  useEffect(() => {
    // Enhanced debugging for image loading
    console.log('PremiumSalonBanner mounted - checking if image loads correctly');
    
    // Add an event listener to check if the image loads
    const img = new Image();
    img.onload = () => console.log('✅ Salon banner image loaded successfully');
    img.onerror = () => console.error('❌ Failed to load salon banner image: /salon-banner.png');
    img.src = '/salon-banner.png';
  }, []);

  return (
    <div 
      className="relative w-full"
      style={{ 
        height: 'clamp(360px, 40vh, 450px)',
        backgroundImage: 'url(/salon-banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Premium Salons for Sale — Ready to Own
        </h1>
        <p className="text-lg md:text-xl text-white max-w-3xl mb-8">
          Discover, list, and buy high-end beauty businesses with EmviApp
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/sell-salon">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
              Post Your Salon
            </Button>
          </Link>
          <Link to="#listings">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Browse Listings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumSalonBanner;
