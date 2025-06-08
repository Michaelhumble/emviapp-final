
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Eye, Heart, Share, Upload, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArtistPortfolioShowcase = () => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Beauty/nail industry relevant portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "French Gradient Nails",
      image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
      likes: 156,
      views: 890,
      category: "Nail Art"
    },
    {
      id: 2,
      title: "Minimalist Line Art",
      image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
      likes: 203,
      views: 1240,
      category: "Nail Design"
    },
    {
      id: 3,
      title: "Pink Floral Design",
      image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
      likes: 178,
      views: 967,
      category: "Nail Art"
    },
    {
      id: 4,
      title: "Gel Manicure",
      image: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      likes: 134,
      views: 743,
      category: "Manicure"
    }
  ];

  const handleUploadWork = () => {
    setShowUploadModal(true);
    // Open upload dialog or navigate to upload page
  };

  const handleViewFullPortfolio = () => {
    navigate('/dashboard/artist/portfolio');
  };

  const totalLikes = portfolioItems.reduce((sum, item) => sum + item.likes, 0);
  const totalViews = portfolioItems.reduce((sum, item) => sum + item.views, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
            <Camera className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Showcase</h2>
            <p className="text-gray-600">展示你的杰作 • Showcase your masterpieces</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUploadWork}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Upload className="h-5 w-5" />
          Add Work
        </motion.button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
        >
          <div className="text-2xl font-bold text-blue-600">{portfolioItems.length}</div>
          <div className="text-sm text-blue-700">Masterpieces</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100"
        >
          <div className="text-2xl font-bold text-pink-600">{totalLikes}</div>
          <div className="text-sm text-pink-700">Total Likes</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
        >
          <div className="text-2xl font-bold text-green-600">{totalViews}</div>
          <div className="text-sm text-green-700">Total Views</div>
        </motion.div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <div className="flex items-center gap-3 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {item.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.views}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay Actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all">
                <Share className="h-3 w-3 text-white" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOMO Message & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 mb-4"
      >
        <div className="text-center">
          <div className="text-purple-700 font-semibold text-sm mb-1">
            🔥 Artists with portfolios get 5x more bookings!
          </div>
          <div className="text-purple-600 text-xs">
            Don't miss out - upload your best work now! ✨
          </div>
        </div>
      </motion.div>

      {/* View Full Portfolio Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleViewFullPortfolio}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold border border-gray-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
      >
        View Full Portfolio
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
};

export default ArtistPortfolioShowcase;
