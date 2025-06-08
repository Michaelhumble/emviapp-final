import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Link2, Check } from 'lucide-react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { copyToClipboard, shareToSocial, getProfileUrl } from '../utils/shareUtils';
import { toast } from 'sonner';

const ArtistViralShare = () => {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState<string | null>(null);
  
  const profileUrl = getProfileUrl();

  const handleCopyLink = async () => {
    const success = await copyToClipboard(profileUrl);
    if (success) {
      setCopied(true);
      toast.success("Profile link copied to clipboard! 📋");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const handleSocialShare = async (platform: 'instagram' | 'facebook' | 'tiktok') => {
    setSharing(platform);
    shareToSocial(platform, profileUrl);
    
    if (platform === 'instagram' || platform === 'tiktok') {
      // For platforms without direct web sharing, show success message
      toast.success(`Content copied! Open ${platform} and paste to share 📱`);
    } else {
      toast.success(`Opening ${platform} to share your profile! 🚀`);
    }
    
    setTimeout(() => setSharing(null), 1500);
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Grow Your Empire</h2>
        <p className="text-gray-600 font-inter">Share your profile and earn rewards</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
            Chia Sẻ & Phát Triển 🚀
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Share your profile • Grow your client base • Go viral
          </p>
        </div>

        {/* Profile Link Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="h-6 w-6 text-purple-600" />
            <h3 className="font-inter font-bold text-gray-900">Your Profile Link</h3>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-purple-200 mb-4">
            <div className="text-sm text-gray-600 mb-2">Direct link to your portfolio:</div>
            <div className="font-mono text-sm text-purple-600 break-all">{profileUrl}</div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            disabled={copied}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-inter font-medium transition-all duration-300 ${
              copied 
                ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Đã Sao Chép!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy Link
              </>
            )}
          </motion.button>
        </div>

        {/* Social Share Section */}
        <div className="mb-6">
          <h3 className="font-inter font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-purple-600" />
            Share on Social Media
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialShare('instagram')}
              disabled={sharing === 'instagram'}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-4 rounded-2xl font-inter font-medium flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Instagram className="h-6 w-6" />
              {sharing === 'instagram' ? 'Sharing...' : 'Share Instagram'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialShare('facebook')}
              disabled={sharing === 'facebook'}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-2xl font-inter font-medium flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Facebook className="h-6 w-6" />
              {sharing === 'facebook' ? 'Sharing...' : 'Share Facebook'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialShare('tiktok')}
              disabled={sharing === 'tiktok'}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-6 py-4 rounded-2xl font-inter font-medium flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="h-6 w-6" />
              {sharing === 'tiktok' ? 'Sharing...' : 'Share TikTok'}
            </motion.button>
          </div>
        </div>

        {/* Share Stats */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
          <h3 className="font-inter font-bold text-gray-900 mb-4">📊 Viral Potential</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-600">147</div>
              <div className="text-sm text-gray-600">Profile Shares</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">2.3K</div>
              <div className="text-sm text-gray-600">Reach This Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">18%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-xl border border-emerald-200">
            <div className="text-center">
              <div className="text-emerald-700 font-inter font-medium">
                🔥 <strong>Hot trend:</strong> Nail artists who share regularly get 5x more bookings!
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistViralShare;
