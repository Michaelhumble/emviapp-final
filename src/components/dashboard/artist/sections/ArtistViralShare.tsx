
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Instagram, Facebook } from 'lucide-react';
import { copyToClipboard, shareToSocial, getProfileUrl } from '../utils/shareUtils';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const ArtistViralShare = () => {
  const { user } = useAuth();
  const profileUrl = getProfileUrl(user?.id);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(profileUrl);
    if (success) {
      toast.success('Profile link copied to clipboard!');
    } else {
      toast.error('Failed to copy link');
    }
  };

  const shareButtons = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-rose-500',
      onClick: () => shareToSocial('instagram', profileUrl)
    },
    {
      name: 'Facebook', 
      icon: Facebook,
      color: 'from-blue-600 to-indigo-600',
      onClick: () => shareToSocial('facebook', profileUrl)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Share2 className="h-6 w-6 text-emerald-600" />
          Share Your Profile
        </h2>
        <p className="text-slate-600 font-inter">Grow your client base by sharing your work</p>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-6 border border-emerald-100 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Your Referral Link</h3>
            <p className="text-sm text-slate-600 truncate max-w-xs">{profileUrl}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className="bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Copy className="h-4 w-4" />
            Copy Link
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {shareButtons.map((button, index) => (
          <motion.button
            key={button.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.onClick}
            className={`bg-gradient-to-r ${button.color} hover:opacity-90 text-white p-4 rounded-xl font-inter font-medium flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <button.icon className="h-6 w-6" />
            <span>Share on {button.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600 mb-1">+127%</div>
          <div className="text-sm text-slate-600 mb-2">Artists who share get more bookings</div>
          <div className="text-xs text-slate-500">Share your profile to grow your client base faster</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistViralShare;
