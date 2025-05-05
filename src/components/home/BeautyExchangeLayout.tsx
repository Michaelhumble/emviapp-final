
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, DollarSign, Lock } from 'lucide-react';
import { featuredNailsAds } from '@/utils/featuredNailsAds';
import NailSalonDetailModal from './NailSalonDetailModal';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
              
              {/* Updated card grid for better mobile layout - one per row on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {category === "Nails" ? (
                  // Display real nail salon listings with upgraded card styling
                  featuredNailsAds.map((listing) => (
                    <Card 
                      key={listing.id} 
                      className="overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative">
                        {/* Listing image (first photo in the array) */}
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={listing.photos[0]} 
                            alt={listing.title} 
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>
                      
                      {/* Card content */}
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                        
                        <div className="flex items-center text-gray-500 my-1.5 text-sm">
                          <MapPin className="h-4 w-4 mr-1 shrink-0" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-500 mb-3 text-sm">
                          <DollarSign className="h-4 w-4 mr-1 shrink-0" />
                          <span>{listing.price}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {listing.description.split('.')[0]}
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center text-sm text-gray-400">
                            <Lock className="h-3 w-3 mr-1" />
                            <span>Contact info locked</span>
                          </div>
                          
                          <Button 
                            onClick={() => handleViewDetails(listing)}
                            variant="outline" 
                            size="sm" 
                            className="flex items-center justify-center gap-1"
                          >
                            More Info
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  // Show placeholder cards for Tattoo category with matching styling
                  Array.from({ length: 5 }).map((_, cardIndex) => (
                    <Card 
                      key={cardIndex} 
                      className="overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Tattoo Studio Image</span>
                        </div>
                        
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
                            Coming Soon
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg truncate">Tattoo Studio {cardIndex + 1}</h3>
                        
                        <div className="flex items-center text-gray-500 my-1.5 text-sm">
                          <MapPin className="h-4 w-4 mr-1 shrink-0" />
                          <span className="truncate">Local Area, US</span>
                        </div>
                        
                        <div className="flex items-center text-gray-500 mb-3 text-sm">
                          <DollarSign className="h-4 w-4 mr-1 shrink-0" />
                          <span>$1,800-$3,000/week</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          Premium tattoo studio space with established clientele. Excellent opportunity for talented artists.
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center text-sm text-gray-400">
                            <Lock className="h-3 w-3 mr-1" />
                            <span>Contact info locked</span>
                          </div>
                          
                          <Link to="/jobs">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center justify-center gap-1"
                            >
                              More Info
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
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
