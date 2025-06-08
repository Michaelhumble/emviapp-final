
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, shareToSocial, getProfileUrl } from '../utils/shareUtils';

const ArtistViralShare = () => {
  const [copied, setCopied] = useState(false);
  const profileUrl = getProfileUrl();

  const handleCopyLink = async () => {
    const success = await copyToClipboard(profileUrl);
    if (success) {
      setCopied(true);
      toast.success('Profile link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: 'instagram' | 'facebook' | 'tiktok') => {
    shareToSocial(platform, profileUrl);
    toast.success(`Opening ${platform} to share your profile!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Share2 className="h-7 w-7 text-purple-500" />
          Share Your Profile
        </h2>
        <p className="text-lg text-gray-600 font-inter">
          Grow your client base • Go viral
          <span className="block text-sm text-gray-500 mt-1">Chia sẻ hồ sơ để thu hút khách hàng</span>
        </p>
      </div>

      {/* Profile Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">Your Artist Profile</h3>
            <p className="text-gray-600">Premium Nail Artist • District 1</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-600 ml-2">4.9 • 247 reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Link */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Profile Link</label>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm">
            {profileUrl}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              copied 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Social Share Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('instagram')}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Instagram className="h-5 w-5" />
          <span className="font-medium">Share on Instagram</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('facebook')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Facebook className="h-5 w-5" />
          <span className="font-medium">Share on Facebook</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('tiktok')}
          className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Share on TikTok</span>
        </motion.button>
      </div>

      {/* Growth Stats */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
        <div className="text-center">
          <h3 className="text-lg font-bold text-emerald-700 mb-2">Growth Impact</h3>
          <p className="text-emerald-600 text-sm mb-4">
            Artists who share regularly get 3x more bookings
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl font-bold text-emerald-600">+127</div>
              <div className="text-xs text-gray-600">Profile Views</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-600">+23</div>
              <div className="text-xs text-gray-600">New Followers</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-600">+8</div>
              <div className="text-xs text-gray-600">New Bookings</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistViralShare;
