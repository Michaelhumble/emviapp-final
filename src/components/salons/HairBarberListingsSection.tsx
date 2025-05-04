
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HairBarberListing {
  id: number;
  title: string;
  imageUrl: string;
}

const hairBarberListings: HairBarberListing[] = [
  {
    id: 1,
    title: "Modern Barber Studio",
    imageUrl: "/lovable-uploads/d74b565f-1028-4a70-9b08-750b27e543a9.png"
  },
  {
    id: 2,
    title: "Luxury Hair Lounge",
    imageUrl: "/lovable-uploads/0a3c6500-a5cf-46ca-a7b0-b759c83307f0.png"
  },
  {
    id: 3,
    title: "Downtown Fade Shop",
    imageUrl: "/lovable-uploads/7e6893e2-81da-4237-a552-dedca51e03bb.png"
  },
  {
    id: 4,
    title: "Blowout & Color Salon",
    imageUrl: "/lovable-uploads/c41a1ba3-c5f5-45fa-a797-86dbbf65235a.png"
  },
  {
    id: 5,
    title: "Men's Grooming Club",
    imageUrl: "/lovable-uploads/7f26c1ad-9582-4834-8b99-f0023aa48e11.png"
  }
];

const HairBarberListingsSection: React.FC = () => {
  return (
    <div className="mb-16 border-t pt-12">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
        Hair & Barber Listings
      </h2>
      <p className="text-gray-600 mb-6">
        <em>Preview available spaces in the hair & barber category — listing soon.</em>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hairBarberListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="relative">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
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
  );
};

export default HairBarberListingsSection;
