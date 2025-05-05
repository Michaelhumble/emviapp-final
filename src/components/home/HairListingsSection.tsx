
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';

// Define the paths to the currently uploaded hair salon images
const hairSalonImages = [
  "/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png",
  "/lovable-uploads/d62af349-7eeb-443d-b168-7036cabfd2ac.png",
  "/lovable-uploads/b8f0c457-76d8-46e9-9ee6-4869928cbea6.png",
  "/lovable-uploads/05372b9b-5a24-4f86-82c8-e0681ed539eb.png", 
  "/lovable-uploads/402f947b-3877-4d57-8ced-7191eb207b9d.png"
];

// Define destinations for each card
const cardDestinations = [
  { id: "hair-1", type: "salon", path: "/salons/hair-1" },
  { id: "hair-2", type: "job", path: "/jobs/hair-2" },
  { id: "hair-3", type: "salon", path: "/salons/hair-3" },
  { id: "hair-4", type: "job", path: "/jobs/hair-4" },
  { id: "hair-5", type: "salon", path: "/salons/hair-5" }
];

const HairListingsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Hair Salon Listings — Premium Spaces
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-3xl mx-auto">
            Explore luxury hair salon spaces and opportunities. Connect with premium establishments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
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
                    src={hairSalonImages[index]} 
                    alt={`Luxury Hair Salon ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                    Luxury Hair Studio {index + 1}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2 font-inter">
                    Premium hair salon space
                  </p>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                    Elegant salon space with high-end finishes, crystal chandeliers, and luxurious styling chairs.
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                      Exclusive
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

export default HairListingsSection;
