
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Use the newly uploaded barbershop images
const barberShopImages = [
  "/lovable-uploads/fb41198f-fd0f-4562-8338-ee94ac01a8f8.png",
  "/lovable-uploads/0bbbfeba-7132-4060-9a23-404a7859b082.png", 
  "/lovable-uploads/4edfaa59-6542-4bad-9e6b-1cd0d7ae9113.png",
  "/lovable-uploads/234cc568-7237-4f55-9ae3-272a74508d1c.png",
  "/lovable-uploads/e65d38e6-6072-4b4b-b6ed-0a81c2e1a44e.png"
];

const BarberListingsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Barber Listings — Premium Spaces
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
                    alt={`Premium Barber Space ${index + 1}`}
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
                <h3 className="font-semibold text-lg truncate">Premium Barber Space {index + 1}</h3>
                <div className="flex items-center text-gray-500 my-1.5 text-sm">
                  <span className="opacity-75">Luxury barbershop with premium finishes</span>
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
