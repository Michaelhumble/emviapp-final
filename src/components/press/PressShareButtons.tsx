import React from 'react';
import { Share2, Linkedin, Facebook, Twitter, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PressShareButtonsProps {
  title: string;
  url: string;
  outlet?: string;
  className?: string;
}

const PressShareButtons: React.FC<PressShareButtonsProps> = ({
  title,
  url,
  outlet,
  className = ''
}) => {
  const { toast } = useToast();

  // Ensure URL is absolute for sharing
  const absoluteURL = url.startsWith('http') ? url : `https://www.emvi.app${url}`;
  const encodedUrl = encodeURIComponent(absoluteURL);
  const encodedTitle = encodeURIComponent(title);

  const shareText = outlet 
    ? `${title} - Featured on ${outlet} | EmviApp Press Coverage`
    : `${title} | EmviApp Press Coverage`;

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodeURIComponent(shareText)}&utm_source=share&utm_medium=social&utm_campaign=press_linkedin`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(shareText)}&utm_source=share&utm_medium=social&utm_campaign=press_facebook`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(shareText)}&hashtags=EmviApp,BeautyTech,Press&utm_source=share&utm_medium=social&utm_campaign=press_twitter`
  };

  const handleShare = (platform: string, shareUrl: string) => {
    // Track press share event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_social_share', {
        platform,
        outlet: outlet || 'unknown',
        url: absoluteURL
      });
    }

    const newWindow = window.open(
      shareUrl,
      `share-${platform}`,
      'width=600,height=500,location=no,menubar=no,toolbar=no,status=no,scrollbars=yes'
    );
    
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(absoluteURL);
      toast({
        title: "Link copied!",
        description: "Press article link has been copied to your clipboard.",
        duration: 3000
      });

      // Track copy event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'press_copy_link', {
          outlet: outlet || 'unknown',
          url: absoluteURL
        });
      }
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please manually copy from the address bar.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Share this coverage:</span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin', shareLinks.linkedin)}
          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
          <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook', shareLinks.facebook)}
          className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
          <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter', shareLinks.twitter)}
          className="text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
          <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Help spread the word about EmviApp's mission to transform the beauty industry
      </p>
    </div>
  );
};

export default PressShareButtons;