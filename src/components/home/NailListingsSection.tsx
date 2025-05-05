
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSession } from '@/context/auth/hooks/useSession';
import ComingSoonModal from '@/components/common/ComingSoonModal';

const NailListingsSection: React.FC = () => {
  const [showComingSoonModal, setShowComingSoonModal] = React.useState(false);
  const { session } = useSession();

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Clawson, MI Listing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={handleCardClick}
            className="cursor-pointer"
          >
            <Card className="overflow-hidden border-0 shadow-lg rounded-xl h-full">
              <div className="relative h-72 w-full">
                <img 
                  src="https://dd2787bb-39ac-4d3f-ad8a-82ffdf26198a.lovableproject.com/lovable-uploads/ba3336a6-5d03-4522-85c0-05ff17e56a81.png" 
                  alt="Nail salon in Clawson, MI" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Clawson, MI</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Clawson, MI</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>$1,200 - $1,800/tuần</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                    Coming Soon
                  </Badge>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                    More Info
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Humble, TX Listing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={handleCardClick}
            className="cursor-pointer"
          >
            <Card className="overflow-hidden border-0 shadow-lg rounded-xl h-full">
              <div className="relative h-72 w-full">
                <img 
                  src="https://dd2787bb-39ac-4d3f-ad8a-82ffdf26198a.lovableproject.com/lovable-uploads/ba3336a6-5d03-4522-85c0-05ff17e56a81.png" 
                  alt="Milano Nail Spa in Humble, TX" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Humble, TX – Milano Nail Spa</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Humble, TX</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{">"} $2,000/tuần</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                    Coming Soon
                  </Badge>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                    More Info
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
