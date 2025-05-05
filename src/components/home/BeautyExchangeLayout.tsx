
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { featuredNailsAds } from '@/utils/featuredNailsAds';
import NailSalonDetailModal from './NailSalonDetailModal';
import { Link } from 'react-router-dom';

// Updated categories - removed Skincare & Spa
const categories = [
  "Nails",
  "Tattoo"
];

const BeautyExchangeLayout = () => {
  // State for managing the selected listing and detail modal
  const [selectedListing, setSelectedListing] = useState<typeof featuredNailsAds[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handler for opening the detail modal
  const handleViewDetails = (listing: typeof featuredNailsAds[0]) => {
    setSelectedListing(listing);
    setIsDetailOpen(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Replaced the general title with the Nail Salon specific title using Hairdresser section styling */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Nail Salon Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            <em>Explore premium nail salon jobs and spaces. Listings opening soon.</em>
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              {/* For Nails category, don't show the heading since we've moved it to the top */}
              {category === "Nails" ? (
                <></>
              ) : category === "Tattoo" ? (
                <>
                  {/* Updated Tattoo heading to match Hairdresser styling */}
                  <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2 text-center">
                    Tattoo Listings — Preview Spaces
                  </h2>
                  <p className="text-gray-600 text-center">
                    <em>Discover top-rated tattoo studios and job opportunities. Listings opening soon.</em>
                  </p>
                </>
              ) : (
                <h3 className="text-2xl font-semibold border-b pb-2">{category}</h3>
              )}
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category === "Nails" ? (
                  // Display real nail salon listings with uploaded images
                  featuredNailsAds.map((listing) => (
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
                        <p className="text-gray-500 text-xs mb-2">{listing.location} • {listing.price}</p>
                        
                        {/* Link to Jobs page with Vietnamese tab selected */}
                        <Link to="/jobs">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full flex items-center justify-center"
                          >
                            View Jobs
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  // Show placeholder cards for other categories
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
