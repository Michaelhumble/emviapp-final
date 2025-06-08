
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Eye, Share } from 'lucide-react';
import UploadPhotoModal from '../modals/UploadPhotoModal';
import { useNavigate } from 'react-router-dom';

const ArtistPortfolioShowcase = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();

  const portfolioImages = [
    "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A long, luxurious nail salon-1.png",
    "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A long, luxurious nail salon-2.png",
    "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A long, luxurious nail salon-3.png"
  ];

  const handleViewAll = () => {
    navigate('/dashboard/artist/portfolio');
  };

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
          {portfolioImages.map((image, index) => (
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
              <div className="text-2xl font-bold text-amber-600">24</div>
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
