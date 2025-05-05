
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OpportunityCard from '@/components/home/opportunities/OpportunityCard';
import { useSession } from '@/context/auth/hooks/useSession';
import ComingSoonModal from '@/components/common/ComingSoonModal';

const NailListingsSection: React.FC = () => {
  const [showComingSoonModal, setShowComingSoonModal] = React.useState(false);
  const { session } = useSession();

  // Setup placeholder listings
  const placeholderListings = Array.from({ length: 5 }, (_, i) => ({
    id: `nail-placeholder-${i + 1}`,
    title: `Nail Space ${i + 1}`,
    location: 'Preview listing',
    description: 'This nail listing will be available soon. Check back for updates on nail services, opportunities, and salon listings.',
    type: 'opportunity' as const,
    price: '',
    created_at: new Date().toISOString(),
    image: '',
    descriptionPreview: 'This nail listing will be available soon. Check back for updates.',
    hideLink: true,
    buttonText: 'Coming Soon'
  }));

  const handleCardClick = () => {
    setShowComingSoonModal(true);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              Nail Listings
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover nail salon opportunities, job openings, and spaces for sale.
              New listings coming soon.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
              Coming Soon
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {placeholderListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={handleCardClick}
              className="cursor-pointer"
            >
              <OpportunityCard listing={listing} index={index} />
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
