
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Image } from 'lucide-react';
import ArtistPortfolioGrid from './components/ArtistPortfolioGrid';
import ArtistPortfolioUploader from './components/ArtistPortfolioUploader';
import { useArtistData } from './context/ArtistDataContext';
import { motion } from 'framer-motion';

const ArtistPortfolio = () => {
  const [showUploader, setShowUploader] = useState(false);
  const { portfolioImages, loadingPortfolio } = useArtistData();
  
  const hasImages = portfolioImages.length > 0;
  
  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif flex items-center">
          <Image className="h-5 w-5 mr-2 text-purple-500" />
          Portfolio
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {showUploader ? (
          <ArtistPortfolioUploader onComplete={() => setShowUploader(false)} />
        ) : (
          <>
            {hasImages ? (
              <ArtistPortfolioGrid images={portfolioImages} isLoading={loadingPortfolio} />
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center py-8 text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-purple-50 p-4 rounded-full mb-4">
                  <Image className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">Showcase your work</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Upload photos of your best work to attract clients and showcase your talent.
                </p>
                
                {/* Vietnamese booking text addition */}
                <div className="text-gray-500 text-sm italic mb-4 max-w-md bg-purple-50/50 p-3 rounded-lg">
                  <p className="mb-1">Bạn có thể nhận lịch hẹn từ khách — tính năng này sắp ra mắt!</p>
                  <p>You'll be able to take bookings from clients — feature coming soon!</p>
                </div>
                
                <Button 
                  onClick={() => setShowUploader(true)} 
                  className="min-h-[44px] min-w-[200px]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Portfolio Images
                </Button>
              </motion.div>
            )}
            
            {hasImages && (
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={() => setShowUploader(true)}
                  className="min-h-[44px]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Images
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolio;
