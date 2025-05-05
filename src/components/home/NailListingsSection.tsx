
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

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
                <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-inter">Placeholder Image</span>
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold line-clamp-2 mb-1">
                    Nail Studio {index + 1}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2 font-inter">
                    Premium space
                  </p>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                    Premium nail salon listing coming soon...
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <Badge className="bg-white text-black hover:bg-white rounded-full">
                      Coming Soon
                    </Badge>

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

export default NailListingsSection;
