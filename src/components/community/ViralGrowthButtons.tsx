
// COMMUNITY PAGE UPDATE - Viral growth buttons for sharing and invites
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, UserPlus, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ViralGrowthButtons = () => {
  const handleInviteFriend = () => {
    // Simulate invite functionality
    navigator.clipboard.writeText('Join me on EmviApp - the exclusive beauty community! https://emviapp.com/invite')
      .then(() => toast.success('Invite link copied! Share with your beauty friends 💅'))
      .catch(() => toast.success('Invite your friends to join EmviApp!'));
  };

  const handleSocialShare = (platform: string) => {
    const message = encodeURIComponent('Just discovered EmviApp - the most exclusive beauty community! 💄✨');
    const url = encodeURIComponent('https://emviapp.com');
    
    let shareUrl = '';
    switch (platform) {
      case 'instagram':
        toast.info('Copy this and share on your Instagram story! 📸');
        navigator.clipboard.writeText('EmviApp - exclusive beauty community! #EmviApp #BeautyPro');
        return;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        break;
      default:
        navigator.clipboard.writeText(`${decodeURIComponent(message)} ${decodeURIComponent(url)}`);
        toast.success('Share link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Love EmviApp? Spread the Word! 💕
        </h3>
        <p className="text-gray-600 mb-6">
          Help us build the most trusted beauty community. Early supporters get exclusive perks!
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={handleInviteFriend}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
          
          <Button
            onClick={() => handleSocialShare('instagram')}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </Button>
          
          <Button
            onClick={() => handleSocialShare('facebook')}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          
          <Button
            onClick={() => handleSocialShare('twitter')}
            variant="outline"
            className="border-sky-300 text-sky-600 hover:bg-sky-50"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-500 mt-4"
        >
          🎁 For every friend who joins, you both get premium credits!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ViralGrowthButtons;
