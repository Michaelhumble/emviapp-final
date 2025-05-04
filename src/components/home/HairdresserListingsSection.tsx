
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HairdresserListing {
  id: number;
  title: string;
  imageUrl: string;
}

const hairdresserListings: HairdresserListing[] = [
  {
    id: 1,
    title: "Luxury Hair Lounge",
    imageUrl: "/lovable-uploads/2287d94c-f20d-4357-9d16-3fb51bde5935.png"
  },
  {
    id: 2,
    title: "Uptown Hair Lab",
    imageUrl: "/lovable-uploads/634c2c48-154b-4a6c-9f6b-f6bca32ad5c7.png"
  },
  {
    id: 3,
    title: "Glow & Grace Hair Spa",
    imageUrl: "/lovable-uploads/226e80b3-9566-4226-8e74-ea1df92f6b1c.png"
  }
];

const HairdresserListingsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Hairdresser Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            <em>Explore premium spaces in the hair styling industry. Listings opening soon.</em>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hairdresserListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      console.error(`Failed to load image: ${listing.imageUrl}`);
                      e.currentTarget.src = '/placeholder.svg'; // Fallback to placeholder
                    }}
                  />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
                    Coming Soon
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                <div className="flex items-center text-gray-500 my-1.5 text-sm">
                  <span className="opacity-75">Placeholder listing</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HairdresserListingsSection;
