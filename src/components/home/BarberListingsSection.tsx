
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Placeholder Image</span>
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
