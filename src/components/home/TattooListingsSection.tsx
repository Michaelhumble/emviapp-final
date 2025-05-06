
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { tattooStudioImages } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const TattooListingsSection = () => {
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
                  <ImageWithFallback 
                    src={image} 
                    alt={`Tattoo Studio ${index + 1}`} 
                    className="w-full h-full object-cover"
                    category="tattoo"
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
