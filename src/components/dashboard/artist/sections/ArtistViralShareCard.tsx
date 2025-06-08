
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Instagram, Facebook, MessageCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ArtistViralShareCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const profileUrl = `https://emviapp.com/artists/my-profile`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success("🎉 Your artist link copied! Share it everywhere!", {
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const shareText = "Check out my beauty services on EmviApp! Book with me for amazing results ✨";
    const profileUrl = "https://emviapp.com/artists/my-profile";
    
    let shareUrl = "";
    switch (platform) {
      case 'instagram':
        // Instagram doesn't support direct URL sharing, copy text instead
        navigator.clipboard.writeText(`${shareText} ${profileUrl}`);
        toast.success("📋 Share text copied for Instagram Stories!");
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`;
        window.open(shareUrl, '_blank');
        break;
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Share2 className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <CardTitle className="text-lg font-bold">Share Your Artist Card 🎨</CardTitle>
            <p className="text-sm text-gray-600">Get more clients by sharing your profile!</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Preview Card */}
        <div className="p-4 bg-white/80 rounded-xl border-2 border-dashed border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <div>
              <h4 className="font-semibold">Your Artist Profile</h4>
              <p className="text-sm text-gray-500">Beautiful • Professional • Trusted</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 h-16 rounded-lg bg-purple-100"></div>
            <div className="w-16 h-16 rounded-lg bg-pink-100"></div>
            <div className="w-16 h-16 rounded-lg bg-orange-100"></div>
          </div>
        </div>

        {/* Copy Link Button */}
        <Button
          onClick={handleCopyLink}
          className={`w-full h-12 font-semibold transition-all ${
            copied 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          {copied ? (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Copied! Share It Now 🚀
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Your Artist Link
            </>
          )}
        </Button>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialShare('instagram')}
            className="h-12 border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <Instagram className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialShare('facebook')}
            className="h-12 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialShare('whatsapp')}
            className="h-12 border-green-300 text-green-600 hover:bg-green-50"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="text-center p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <p className="text-sm font-semibold text-purple-700 mb-1">
            📈 Artists who share get 3x more bookings!
          </p>
          <p className="text-xs text-gray-600">
            127 artists shared their profile this week
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistViralShareCard;
