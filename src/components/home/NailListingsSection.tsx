
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';

const nailSalonImages = [
  "/lovable-uploads/17e65a2b-10a7-4b2a-a839-340a80da6903.png",
  "/lovable-uploads/0d50d1e2-4ac5-4520-8d66-dffc59da9302.png",
  "/lovable-uploads/b4f26c5f-97b6-4a68-9acf-1b370937ef1a.png",
  "/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png",
  "/lovable-uploads/a59ea036-184e-4057-b4ba-8a0f2ab2c365.png"
];

// Define destinations for each card
const cardDestinations = [
  { id: "nail-1", type: "salon", path: "/salons/nail-1" },
  { id: "nail-2", type: "job", path: "/jobs/nail-2" },
  { id: "nail-3", type: "salon", path: "/salons/nail-3" },
  { id: "nail-4", type: "job", path: "/jobs/nail-4" },
  { id: "nail-5", type: "salon", path: "/salons/nail-5" }
];

const NailListingsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Nail Salon Listings — Preview Spaces
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-3xl mx-auto">
            Explore premium nail salon jobs and spaces. Listings opening soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {nailSalonImages.map((imageSrc, index) => (
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
                    alt={`Nail Studio ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                    Nail Studio {index + 1}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2 font-inter">
                    Listing opening soon
                  </p>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                    Premium nail salon listing coming soon...
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <Badge className="bg-white text-black hover:bg-white rounded-full">
                      Coming Soon
                    </Badge>

                    <ValidatedLink 
                      to={cardDestinations[index].path}
                      listingId={cardDestinations[index].id}
                      listingType={cardDestinations[index].type as "salon" | "job"}
                      className="no-underline"
                    >
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-3.5 w-3.5" /> More Info
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

export default NailListingsSection;
