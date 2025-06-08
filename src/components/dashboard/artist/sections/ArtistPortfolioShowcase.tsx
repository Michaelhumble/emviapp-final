
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Eye, Heart, Share2, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UploadPhotoModal from '../modals/UploadPhotoModal';

const ArtistPortfolioShowcase = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // For demonstration - in real app this would come from user data
  const portfolioImages: string[] = []; // Empty by default for new artists
  const hasPortfolio = portfolioImages.length > 0;

  const handleViewAll = () => {
    // Navigate to full portfolio page
    window.location.href = '/dashboard/artist/portfolio';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
        data-section="portfolio"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-playfair font-bold text-slate-900">Your Portfolio</h3>
          {hasPortfolio && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewAll}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View All
            </Button>
          )}
        </div>

        {hasPortfolio ? (
          <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-purple-50/30">
            <div className="p-6">
              {/* Portfolio Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {portfolioImages.slice(0, 6).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-lg"
                  >
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white text-sm">
                          <Heart className="h-4 w-4" />
                          <span>{Math.floor(Math.random() * 50) + 10}</span>
                        </div>
                        <Share2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{portfolioImages.length}</div>
                  <div className="text-sm text-slate-600">Portfolio Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">1.2K</div>
                  <div className="text-sm text-slate-600">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-600">89</div>
                  <div className="text-sm text-slate-600">Likes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => setShowUploadModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Photos
                </Button>
                <Button variant="outline" onClick={handleViewAll}>
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          // Empty State
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-2xl font-playfair font-bold text-slate-900 mb-3">
                  Your Portfolio Awaits
                </h4>
                <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                  Showcase your best work to attract clients and build your reputation. Artists with portfolios get <strong>5x more bookings</strong>.
                </p>
              </motion.div>

              <div className="space-y-4">
                <Button 
                  size="lg"
                  className="w-full max-w-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => setShowUploadModal(true)}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Your First Photos
                </Button>
                
                <div className="text-sm text-slate-500">
                  💡 Tip: High-quality photos with good lighting get 3x more engagement
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-6 p-4 bg-white/60 rounded-xl border border-purple-100">
                <div className="text-sm text-purple-700 font-medium">
                  ✨ Top artists upload 5-10 photos and see immediate booking increases
                </div>
              </div>
            </div>
          </Card>
        )}
      </motion.div>

      <UploadPhotoModal 
        open={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </>
  );
};

export default ArtistPortfolioShowcase;
