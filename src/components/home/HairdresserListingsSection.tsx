
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';

// Define the paths to the uploaded hairdresser images
const hairdresserImages = [
  "/lovable-uploads/362c9477-1040-49d9-a35a-639dc7d4d856.png",
  "/lovable-uploads/b34098ed-061e-4489-9386-ea67869b55fc.png",
  "/lovable-uploads/b8f0c457-76d8-46e9-9ee6-4869928cbea6.png", // Using the previously uploaded image
  "/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png", // Using the previously uploaded image
  "/lovable-uploads/d62af349-7eeb-443d-b168-7036cabfd2ac.png"  // Using the previously uploaded image
];

// Define destinations for each card (following same pattern as other sections)
const cardDestinations = [
  { id: "hairdresser-1", type: "salon", path: "/salons/hairdresser-1" },
  { id: "hairdresser-2", type: "job", path: "/jobs/hairdresser-2" },
  { id: "hairdresser-3", type: "salon", path: "/salons/hairdresser-3" },
  { id: "hairdresser-4", type: "job", path: "/jobs/hairdresser-4" },
  { id: "hairdresser-5", type: "salon", path: "/salons/hairdresser-5" }
];

const HairdresserListingsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Hairdresser Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            <em>Explore premium spaces in the hair styling industry. Listings opening soon.</em>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {hairdresserImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={imageSrc} 
                    alt={`Luxury Hairdresser Studio ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                    Luxury Hairdresser Studio {index + 1}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2 font-inter">
                    Premium hair styling space
                  </p>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                    Elegant salon space with premium styling chairs, luxury finishes, and top-tier amenities.
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                      Coming Soon
                    </Badge>

                    <ValidatedLink 
                      to={cardDestinations[index].path}
                      listingId={cardDestinations[index].id}
                      listingType={cardDestinations[index].type as "salon" | "job"}
                      className="no-underline"
                    >
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-3.5 w-3.5" /> View Details
                      </Button>
                    </ValidatedLink>
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

export default HairdresserListingsSection;
