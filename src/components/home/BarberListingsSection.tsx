
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Define the barber shop images with your 3 new uploaded images
const barberShopImages = [
  "/lovable-uploads/9e288590-a5f0-4b19-b6ff-4c23c91dc40d.png", // First new image
  "/lovable-uploads/cc322576-0a6c-4be9-a292-1a0cc9e21d2f.png", // Second new image
  "/lovable-uploads/406f9179-5206-48bb-93ee-017acedaeae8.png", // Third new image
  "/lovable-uploads/e46083ac-d79b-46b0-97f4-8fbec83362e2.png", // Previous image
  "/lovable-uploads/baef37ea-b714-4178-8075-a9c8d181055a.png", // Previous image
];

const BarberListingsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Barber Shop Listings — Premium Spaces
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore luxury barber shop spaces and opportunities. Connect with premium establishments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {barberShopImages.map((imageSrc, index) => (
            <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="relative">
                <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                  <ImageWithFallback 
                    src={imageSrc} 
                    alt={`Premium Barber Studio ${index + 1}`}
                    className="w-full h-full object-cover"
                    fallbackImage="/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png"
                  />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
                    Premium
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold font-playfair mb-1">
                  Premium Barber Studio {index + 1}
                </h3>
                
                <p className="text-sm text-gray-500 mb-2">
                  Professional Barber Space
                </p>
                
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Elegant barber shop with premium finishes and state-of-the-art equipment.
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                  <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                    Premium
                  </Badge>

                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </Button>
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
