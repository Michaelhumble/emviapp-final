
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ComingSoonModal from '@/components/common/ComingSoonModal';

const NailListingsSection: React.FC = () => {
  const [showComingSoonModal, setShowComingSoonModal] = React.useState(false);

  const handleCardClick = () => {
    setShowComingSoonModal(true);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Nail Salon Listings — Preview Spaces
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              onClick={handleCardClick}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl h-full">
                <div className="relative h-44 w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Placeholder Image</span>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-1">Nail Space {index + 1}</h3>
                  <div className="flex items-center text-gray-500 mb-3 text-sm">
                    <span>Preview listing</span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    Premium nail salon listing coming soon...
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                      Coming Soon
                    </Badge>
                    <div className="text-gray-500 text-sm">
                      Contact info locked
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        open={showComingSoonModal}
        onOpenChange={setShowComingSoonModal}
        featureName="Nail Listings"
      />
    </section>
  );
};

export default NailListingsSection;
