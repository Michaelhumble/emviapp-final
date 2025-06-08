
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Instagram, Facebook, MessageCircle, Zap } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const ArtistViralShare = () => {
  const { user, userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  
  const profileUrl = `https://emviapp.com/artist/${user?.id}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success('Profile link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = async (platform: string) => {
    setSharing(true);
    
    const shareText = `Check out my artist profile on EmviApp! Book with me: ${profileUrl}`;
    
    try {
      if (navigator.share && platform === 'native') {
        await navigator.share({
          title: 'My EmviApp Artist Profile',
          text: shareText,
          url: profileUrl
        });
      } else {
        let shareUrl = '';
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
            break;
          case 'instagram':
            await navigator.clipboard.writeText(shareText);
            shareUrl = 'https://www.instagram.com/';
            toast.success('Content copied! Paste it in your Instagram story');
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      }
      
      toast.success('Shared successfully!');
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setTimeout(() => setSharing(false), 1000);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: handleCopyLink
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      action: () => handleShare('instagram')
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => handleShare('facebook')
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => handleShare('whatsapp')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-8 shadow-sm border border-violet-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full">
          <Share2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            Share Your Profile
          </h2>
          <p className="text-gray-600 font-inter">
            Grow your client base by sharing your artist profile
          </p>
        </div>
      </div>

      {/* Artist Preview Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-6 mb-6 border border-violet-200"
      >
        <div className="flex items-center gap-4">
          {userProfile?.avatar_url ? (
            <img 
              src={userProfile.avatar_url} 
              alt={userProfile.full_name}
              className="w-16 h-16 rounded-full border-2 border-violet-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
              {userProfile?.full_name?.charAt(0) || "A"}
            </div>
          )}
          <div className="flex-1">
            <div className="text-xl font-semibold text-gray-800">
              {userProfile?.full_name || "Your Artist Profile"}
            </div>
            <div className="text-gray-600">{userProfile?.specialty || "Professional Artist"}</div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 mt-1">
              <Zap className="h-4 w-4" />
              <span>4.9 rating • 127 bookings • Verified</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {shareOptions.map((option) => (
          <motion.button
            key={option.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={option.action}
            disabled={sharing}
            className={`p-4 ${option.bgColor} rounded-xl flex flex-col items-center gap-2 border border-gray-100 hover:shadow-md transition-all duration-300 disabled:opacity-50`}
          >
            <option.icon className={`h-6 w-6 ${option.color}`} />
            <span className="text-sm font-medium text-gray-700">{option.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Profile URL Display */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-1 text-sm text-gray-600 font-mono truncate">
            {profileUrl}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              copied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
      </div>

      {/* Social Proof */}
      <div className="text-center mt-6 p-4 bg-white/50 rounded-xl">
        <div className="text-sm font-medium text-gray-800 mb-1">
          Artists who share their profiles get 3x more bookings
        </div>
        <div className="text-xs text-gray-600">
          Start sharing to grow your client base today
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistViralShare;
