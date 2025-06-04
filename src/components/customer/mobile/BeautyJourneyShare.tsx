
import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";

const BeautyJourneyShare = () => {
  const handleShare = (platform: string) => {
    const shareText = "Check out my beauty journey on EmviApp! 💅✨";
    const url = "https://emviapp.com";
    
    switch (platform) {
      case 'instagram':
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast.success("Copied to clipboard! Share on your Instagram story! ✨");
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <Share2 className="h-4 w-4 text-pink-600" />
        <span className="font-medium text-pink-800">Share Your Beauty Journey</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('instagram')}
          className="text-xs"
        >
          <Instagram className="h-3 w-3 mr-1" />
          IG
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('facebook')}
          className="text-xs"
        >
          <Facebook className="h-3 w-3 mr-1" />
          FB
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('twitter')}
          className="text-xs"
        >
          <Twitter className="h-3 w-3 mr-1" />
          X
        </Button>
      </div>
      
      <p className="text-xs text-pink-600 mt-2">
        Earn 10 credits for each share! 🌟
      </p>
    </div>
  );
};

export default BeautyJourneyShare;
