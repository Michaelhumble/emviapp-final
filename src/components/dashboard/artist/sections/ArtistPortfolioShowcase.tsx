import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UploadPhotoModal from '../modals/UploadPhotoModal';

const ArtistPortfolioShowcase = () => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const portfolioImages = [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=400", 
    "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
    "https://images.unsplash.com/photo-1599948128020-9a44d1f7e1b5?w=400",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400"
  ];

  const handleAddPhoto = () => {
    setShowUploadModal(true);
  };

  const handleViewAll = () => {
    navigate('/dashboard/artist/portfolio');
  };

  return (
    <div data-section="portfolio" className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
              Portfolio Gallery ✨
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Showcase your masterpieces • Curate your brand
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddPhoto}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Thêm Ảnh Mới
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-sm font-inter font-medium">Nail Art #{index + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">47</div>
              <div className="text-sm text-gray-600">Total Works</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">1.2K</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">94%</div>
              <div className="text-sm text-gray-600">Love Rate</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="group bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-200 hover:border-purple-300 px-8 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-all duration-300"
          >
            Xem Toàn Bộ
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      <UploadPhotoModal 
        open={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
};

export default ArtistPortfolioShowcase;
