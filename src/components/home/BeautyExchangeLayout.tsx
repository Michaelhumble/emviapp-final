import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { nailSalonListings } from '@/utils/beautyExchangeImages';
import NailSalonDetailModal from './NailSalonDetailModal';

// Categories that will be displayed
const categories = [
  "Nails",
  "Hair & Barber",
  "Tattoo", 
  "Skincare & Spa",
  "Massage & Booth Rental"
];

const BeautyExchangeLayout = () => {
  // State for managing the selected listing and detail modal
  const [selectedListing, setSelectedListing] = useState<typeof nailSalonListings[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handler for opening the detail modal
  const handleViewDetails = (listing: typeof nailSalonListings[0]) => {
    setSelectedListing(listing);
    setIsDetailOpen(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Beauty Exchange Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore listings across multiple beauty industry categories
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-semibold border-b pb-2">{category}</h3>
              
              {/* Display real listings for Nails category, placeholders for other categories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category === "Nails" ? (
                  // Display real nail salon listings with uploaded images
                  nailSalonListings.map((listing) => (
                    <div 
                      key={listing.id} 
                      className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Listing image (first photo in the array) */}
                      <div className="h-40 overflow-hidden rounded-t-lg">
                        <img 
                          src={listing.photos[0]} 
                          alt={listing.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Card content */}
                      <div className="p-4">
                        <h4 className="font-medium mb-1 truncate">{listing.title}</h4>
                        <p className="text-gray-500 text-xs mb-2">{listing.location}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full flex items-center justify-center"
                          onClick={() => handleViewDetails(listing)}
                        >
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  // Show placeholder cards for other categories (unchanged)
                  Array.from({ length: 5 }).map((_, cardIndex) => (
                    <div 
                      key={cardIndex} 
                      className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Placeholder image box */}
                      <div className="h-40 bg-gray-100 rounded-t-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Placeholder Image</span>
                      </div>
                      
                      {/* Card content */}
                      <div className="p-4">
                        <h4 className="font-medium mb-2">Ad Coming Soon</h4>
                        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for displaying listing details */}
        <NailSalonDetailModal 
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          listing={selectedListing}
        />
      </div>
    </section>
  );
};

export default BeautyExchangeLayout;
