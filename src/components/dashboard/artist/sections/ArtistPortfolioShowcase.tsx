
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, ArrowRight, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const ArtistPortfolioShowcase = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [uploading, setUploading] = useState(false);

  // Show empty state if no portfolio images
  const portfolioImages = [];

  const handleAddPhoto = () => {
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast.success('Photo uploaded successfully!');
    }, 2000);
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
              Portfolio Gallery
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Showcase your masterpieces and build your brand
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddPhoto}
            disabled={uploading}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Add New Photo
              </>
            )}
          </motion.button>
        </div>

        {portfolioImages.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Portfolio Awaits</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Upload your best work to attract clients and showcase your skills. High-quality images perform best.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddPhoto}
              disabled={uploading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" />
                  Upload Your First Photo
                </>
              )}
            </motion.button>
          </div>
        ) : (
          <>
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

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewAll}
                className="group bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-200 hover:border-purple-300 px-8 py-3 rounded-2xl font-inter font-medium flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-all duration-300"
              >
                View All Portfolio
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </>
        )}

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{portfolioImages.length || 0}</div>
              <div className="text-sm text-gray-600">Total Works</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">0</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">--</div>
              <div className="text-sm text-gray-600">Love Rate</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistPortfolioShowcase;
