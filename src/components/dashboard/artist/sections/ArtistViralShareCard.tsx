
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Instagram, Facebook, MessageCircle, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

const ArtistViralShareCard = () => {
  const { user, userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const artistUrl = `https://emviapp.com/artist/${user?.id}`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(artistUrl);
    setCopied(true);
    toast.success('Link copied! Share it everywhere! 🚀');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Check out my artist profile on EmviApp! Book with me: ${artistUrl}`;

  const shareOptions = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      action: () => {
        const instagramUrl = `https://www.instagram.com/`;
        window.open(instagramUrl, '_blank');
        toast.success('Post to your Instagram story! 📸');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(artistUrl)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-5 border-0 shadow-lg bg-gradient-to-br from-violet-50 to-pink-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-violet-100 rounded-full">
            <Share2 className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Share Your Artist Card 🎨</h3>
            <p className="text-sm text-gray-600">Get more clients, grow faster!</p>
          </div>
        </div>

        {/* Artist Preview Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-4 mb-4 border border-violet-100"
        >
          <div className="flex items-center gap-3">
            {userProfile?.avatar_url ? (
              <img 
                src={userProfile.avatar_url} 
                alt={userProfile.full_name}
                className="w-12 h-12 rounded-full border-2 border-violet-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 flex items-center justify-center text-white font-bold">
                {userProfile?.full_name?.charAt(0) || "A"}
              </div>
            )}
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{userProfile?.full_name || "Your Name"}</div>
              <div className="text-sm text-gray-600">{userProfile?.specialty || "Nail Artist"}</div>
              <div className="flex items-center gap-1 text-xs text-yellow-600">
                ⭐ 4.9 • 127 clients • ✨ Verified
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share Link */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 truncate">
            {artistUrl}
          </div>
          <Button 
            size="sm" 
            onClick={handleCopy}
            className={`${copied ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {shareOptions.map((option) => (
            <motion.button
              key={option.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={option.action}
              className={`p-3 ${option.bgColor} rounded-lg flex flex-col items-center gap-1 border border-gray-100`}
            >
              <option.icon className={`h-5 w-5 ${option.color}`} />
              <span className="text-xs font-medium text-gray-700">{option.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <div className="text-sm font-medium text-gray-800 mb-1">
            🔥 Sarah gained 23 new clients this week by sharing!
          </div>
          <div className="text-xs text-gray-600">
            Artists who share get 3x more bookings
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistViralShareCard;
