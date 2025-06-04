
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useReferralStatsDb } from "@/hooks/useReferralStatsDb";
import { Share2, Instagram, Facebook, Twitter, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

const BeautyJourneyShare = () => {
  const { userProfile } = useAuth();
  const { creditsEarned } = useReferralStatsDb();
  const [copied, setCopied] = useState(false);

  const shareText = `Just earned ${creditsEarned} credits on my EmviApp beauty journey! 💅✨ Join me and discover amazing nail artists in your area! #BeautyJourney #EmviApp #NailArt`;
  const shareUrl = `https://emvi.app/join?ref=${userProfile?.referral_code || 'EMVI'}`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'instagram':
        // Instagram doesn't support direct URL sharing
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success("Copied to clipboard! Share on your Instagram story! 📱");
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
        toast.success("Link copied to clipboard! 📋");
        setTimeout(() => setCopied(false), 3000);
        break;
    }

    // Award 5 credits for sharing (could be tracked in backend)
    toast.success("Thanks for sharing! +5 credits earned! 🎉");
  };

  return (
    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Share2 className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">Share Your Beauty Journey</h4>
          <p className="text-xs text-gray-600">+5 credits per share</p>
        </div>
        <Sparkles className="h-5 w-5 text-blue-500" />
      </div>

      {/* Journey Stats */}
      <div className="bg-white/60 rounded-lg p-3 mb-3 text-center">
        <div className="flex items-center justify-center space-x-1 mb-1">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="font-semibold text-gray-800">Your EmviApp Journey</span>
        </div>
        <div className="text-sm text-gray-600">
          {creditsEarned} Credits Earned • Beauty Enthusiast
        </div>
        {userProfile?.location && (
          <div className="text-xs text-gray-500 mt-1">
            📍 {userProfile.location}
          </div>
        )}
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('instagram')}
          className="flex items-center space-x-2 border-pink-200 hover:bg-pink-50"
        >
          <Instagram className="h-4 w-4 text-pink-600" />
          <span className="text-sm">Instagram</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex items-center space-x-2 border-blue-200 hover:bg-blue-50"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          <span className="text-sm">Facebook</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="flex items-center space-x-2 border-sky-200 hover:bg-sky-50"
        >
          <Twitter className="h-4 w-4 text-sky-600" />
          <span className="text-sm">Twitter</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('copy')}
          className="flex items-center space-x-2 border-gray-200 hover:bg-gray-50"
        >
          <Copy className="h-4 w-4 text-gray-600" />
          <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Share your journey and inspire others! 🌟
        </p>
      </div>
    </div>
  );
};

export default BeautyJourneyShare;
