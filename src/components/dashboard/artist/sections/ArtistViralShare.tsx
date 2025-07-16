
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Instagram, Facebook, MessageCircle, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const ArtistViralShare = () => {
  const { user, userProfile } = useAuth();
  const artistName = userProfile?.full_name || userProfile?.display_name || 'Artist';
  const profileUrl = `${window.location.origin}/a/${user?.id || 'profile'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success('✨ Profile link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareMessage = `Check out ${artistName}'s amazing work on EmviApp! Book your appointment: ${profileUrl}`;

  const shareButtons = [
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'from-gray-600 to-gray-700',
      onClick: handleCopyLink
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      onClick: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-rose-500',
      onClick: () => {
        handleCopyLink();
        toast.success('Link copied! Paste it in your Instagram story 📸');
        window.open('https://www.instagram.com/', '_blank');
      }
    },
    {
      name: 'Facebook', 
      icon: Facebook,
      color: 'from-blue-600 to-indigo-600',
      onClick: () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}&quote=${encodeURIComponent(shareMessage)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    }
  ];

  return (
    <Card className="card-luxury">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Share2 className="h-6 w-6 text-purple-600" />
          Share Your Profile
        </CardTitle>
        <p className="text-muted-foreground">Grow your client base by sharing your work</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile URL Display */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1">Your Profile Link</h3>
              <p className="text-sm text-gray-600 truncate">{profileUrl}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="ml-4 flex-shrink-0"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        {/* Share Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          {shareButtons.map((button, index) => (
            <motion.div
              key={button.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={`w-full h-16 bg-gradient-to-r ${button.color} text-white border-0 hover:opacity-90 flex flex-col gap-1`}
                onClick={button.onClick}
              >
                <button.icon className="h-5 w-5" />
                <span className="text-xs">{button.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* QR Code Button */}
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => toast.info("QR Code generator coming soon!")}
        >
          <QrCode className="w-4 h-4" />
          Generate QR Code
        </Button>

        {/* Growth Stats */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">+127%</div>
            <div className="text-sm text-gray-600 mb-2">Artists who share get more bookings</div>
            <div className="text-xs text-gray-500">Share your profile to grow your client base faster</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistViralShare;
