
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Instagram, Facebook, Twitter, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ShareJourneyCard: React.FC = () => {
  const [shareText] = useState("Check out my EmviApp beauty journey! 💅✨ I've earned 145 credits and unlocked 3 badges. Join me on EmviApp! #BeautyJourney #EmviApp");

  const handleShare = (platform: string) => {
    const url = "https://emviapp.com"; // Replace with actual app URL
    
    switch (platform) {
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast.success("Copied to clipboard! Share on your Instagram story! ✨");
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        toast.success("Opening Facebook to share your journey!");
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
        toast.success("Opening Twitter to share your journey!");
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast.success("Link copied to clipboard! 📋");
        break;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-indigo-600" />
          Share My Journey
          <Badge className="bg-amber-100 text-amber-700 ml-auto">+10 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 mb-1">Your EmviApp Badge</div>
            <div className="text-xs text-gray-600">145 Credits • 3 Badges • 7 Day Streak</div>
          </div>
          
          <div className="text-sm text-gray-700 text-center">
            Share your beauty journey and earn <span className="font-semibold text-purple-600">10 credits</span> for each friend who joins!
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('instagram')}
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('copy')}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
          </div>
          
          <div className="text-xs text-center text-gray-500">
            Sharing your journey helps grow our beauty community! 🌟
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareJourneyCard;
