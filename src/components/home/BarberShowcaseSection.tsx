
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface BarberShowcase {
  title: string;
  imageUrl: string;
}

// Hardcoded barber showcase data
const barberShowcaseData: BarberShowcase[] = [
  {
    title: "Modern Barber Studio",
    imageUrl: "/lovable-uploads/d74b565f-1028-4a70-9b08-750b27e543a9.png"
  },
  {
    title: "Downtown Fade Shop",
    imageUrl: "/lovable-uploads/7e6893e2-81da-4237-a552-dedca51e03bb.png"
  }
];

const BarberShowcaseSection: React.FC = () => {
  return (
    <section className="py-16 bg-white w-full block min-h-[300px]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Premium Barber Shops
          </h2>
          <p className="text-gray-600">
            <em>Discover exclusive barbershops and grooming experiences. Coming soon to the EmviApp platform.</em>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barberShowcaseData.map((showcase, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback 
                    src={showcase.imageUrl}
                    alt={showcase.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    businessName={showcase.title}
                    category="Barber"
                  />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
                    Coming Soon
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">{showcase.title}</h3>
                <div className="flex items-center text-gray-500 my-1.5 text-sm">
                  <span className="opacity-75">Premium barber listing</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarberShowcaseSection;
