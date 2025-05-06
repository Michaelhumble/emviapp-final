
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MakeupListingsSection: React.FC = () => {
  // Array of makeup studio images
  const makeupImages = [
    "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png", // Makeup/lash products with pink aesthetic
    "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png", // Luxury makeup salon with black and gold accents
    "/lovable-uploads/679284ba-17c3-460c-8a2a-6be27add5856.png", // Professional makeup workspace
    "/lovable-uploads/9e581dd6-e5a7-4794-aa3c-b4da59e2381a.png", // Makeup artist tools and brushes
    "/lovable-uploads/e1ce1662-fb69-4ad9-995a-364ee16e42f6.png"  // Elegant makeup display
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Makeup Studios & Artists
          </h2>
          <p className="text-gray-600">
            <em>Discover premium makeup artists and studios. Explore the beauty industry's finest.</em>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {makeupImages.map((imageUrl, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={`Makeup Studio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-pink-500 hover:bg-pink-600 text-white font-medium">
                    Premium
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">Premium Makeup Studio {index + 1}</h3>
                <div className="flex items-center text-gray-500 my-1.5 text-sm">
                  <span className="opacity-75">Professional Makeup Services</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MakeupListingsSection;
