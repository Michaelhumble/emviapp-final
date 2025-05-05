
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define the barber shop images you uploaded
const barberShopImages = [
  "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png",
  "/lovable-uploads/e14ee836-9ccb-41a0-9ad1-3b185275482f.png", 
  "/lovable-uploads/90e01456-efd5-4523-8034-5c1d321949be.png",
  "/lovable-uploads/bcbd2ff0-0df4-4249-b68e-2e5e0de0fbb1.png",
  "/lovable-uploads/91f0b5d3-f1ed-461a-8623-51fedf676fe2.png"
];

const BarberListingsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Barber Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            <em>Discover premium barber shops and spaces. Listings opening soon.</em>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {barberShopImages.map((imageSrc, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative">
                <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={imageSrc} 
                    alt={`Barber Space ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
                    Coming Soon
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">Barber Space {index + 1}</h3>
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

export default BarberListingsSection;
