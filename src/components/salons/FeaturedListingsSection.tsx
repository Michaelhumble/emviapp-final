
import React from 'react';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";

interface FeaturedListingsSectionProps {
  featuredListings: Job[];
  onViewDetails: (salon: Job) => void;
}

const FeaturedListingsSection: React.FC<FeaturedListingsSectionProps> = ({
  featuredListings,
  onViewDetails
}) => {
  // Format price to currency
  const formatPrice = (price: string | number | undefined) => {
    if (!price) return "$0";
    
    if (typeof price === 'string') {
      // If already has dollar sign, return as is
      if (price.includes('$')) return price;
      
      // Try to parse it as a number
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
      if (isNaN(numericPrice)) return "$0";
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(numericPrice);
    }
    
    // If it's a number
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    }
    
    return "$0";
  };

  if (!featuredListings || featuredListings.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <h2 className="font-playfair text-2xl font-bold">Featured Listings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredListings.slice(0, 3).map((listing) => (
          <div 
            key={listing.id} 
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-purple-100"
          >
            <div 
              className="h-52 bg-cover bg-center relative" 
              style={{ 
                backgroundImage: `url(${listing.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80'})` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <Badge className="absolute top-3 right-3 bg-purple-600 text-white border-none font-medium px-2.5">
                  <Star className="h-3.5 w-3.5 mr-1 fill-white" /> Featured
                </Badge>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-playfair text-lg font-semibold mb-1 group-hover:text-purple-700 transition-colors">
                {listing.company || listing.title || "Premium Salon"}
              </h3>
              
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span className="truncate">{listing.location}</span>
              </div>
              
              <div className="flex items-center text-gray-800 font-medium mb-3">
                <DollarSign className="h-4 w-4 mr-0.5 text-green-600" /> 
                <span>{formatPrice(listing.asking_price)}</span>
              </div>
              
              {/* Feature Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {listing.salon_features && listing.salon_features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                    {feature}
                  </span>
                ))}
                {listing.has_housing && (
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    Housing Available
                  </span>
                )}
              </div>
              
              <Button 
                onClick={() => onViewDetails(listing)}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListingsSection;
