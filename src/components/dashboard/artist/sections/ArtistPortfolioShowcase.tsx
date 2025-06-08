
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Eye, Share, Upload } from 'lucide-react';
import UploadPhotoModal from '../modals/UploadPhotoModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

const ArtistPortfolioShowcase = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  // Check if user has portfolio images
  const portfolioImages = userProfile?.portfolio_urls || [];
  const hasPortfolio = portfolioImages.length > 0;

  const handleViewAll = () => {
    // Navigate to portfolio page or open portfolio modal
    navigate('/dashboard/artist/portfolio');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my portfolio!',
          text: 'See my latest work on EmviApp',
          url: window.location.origin + '/artist/' + userProfile?.id
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.origin + '/artist/' + userProfile?.id);
      // Toast notification would go here
    }
  };

  if (!hasPortfolio) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
          data-section="portfolio"
        >
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
                <Camera className="h-6 w-6 text-purple-600" />
                Your Portfolio
              </h2>
              <p className="text-slate-600 font-inter">Showcase your best work to attract clients</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-12 mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Start Building Your Portfolio</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Upload photos of your best work to attract clients and showcase your talent. High-quality images get 3x more bookings.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
              >
                <Upload className="h-5 w-5" />
                Upload Your First Photo
              </motion.button>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
              <div className="text-center">
                <div className="text-sm text-slate-600">
                  Artists with portfolios get <span className="font-bold text-amber-600">5x more bookings</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <UploadPhotoModal 
          open={showUploadModal} 
          onClose={() => setShowUploadModal(false)} 
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
        data-section="portfolio"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Camera className="h-6 w-6 text-purple-600" />
              Your Portfolio
            </h2>
            <p className="text-slate-600 font-inter">Showcase your best work</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Add New Photo
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {portfolioImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-medium">Professional Work</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-600">{portfolioImages.length}</div>
              <div className="text-sm text-slate-600">Total Works</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">1.2K</div>
              <div className="text-sm text-slate-600">Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-600">156</div>
              <div className="text-sm text-slate-600">Likes</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Eye className="h-4 w-4" />
            View All Portfolio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-md"
          >
            <Share className="h-4 w-4 text-slate-600" />
          </motion.button>
        </div>
      </motion.div>

      <UploadPhotoModal 
        open={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </>
  );
};

export default ArtistPortfolioShowcase;
