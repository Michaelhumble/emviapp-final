
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const TattooListingsSection = () => {
  // Directly use only the 5 uploaded images with correct paths
  const tattooStudioImages = [
    "/lovable-uploads/6af7cc02-b6cf-4c54-9c03-9510d543d3f1.png",  // Image 1
    "/lovable-uploads/7af46f7a-c8f1-497f-a8e6-271856b882eb.png",  // Image 2  
    "/lovable-uploads/cd91684d-63c1-444f-baea-5814694edf50.png",  // Image 3
    "/lovable-uploads/f5696d4d-294d-42d6-b633-ab23dcacc6d2.png",  // Image 4
    "/lovable-uploads/1d1e2a21-2e5b-452d-a583-57240e114a67.png",  // Image 5
  ];

  console.log("Rendering TattooListingsSection with images:", tattooStudioImages);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Tattoo Listings — Preview Spaces</h2>
        <p className="text-center text-gray-600 mb-12">Discover top-rated tattoo studios and job opportunities. Listings opening soon.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tattooStudioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={image} 
                    alt={`Tattoo Studio ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white text-black hover:bg-white rounded-full">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold line-clamp-2 mb-1">
                    Tattoo Studio {index + 1}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    Listing opening soon
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      Preview
                    </span>

                    <Button size="sm" variant="outline" className="gap-1">
                      <Eye className="h-3.5 w-3.5" /> More Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TattooListingsSection;
