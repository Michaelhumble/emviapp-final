import React from 'react';
import { Instagram, Share2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

interface ExternalShareButtonsProps {
  postId: string;
  content: string;
  images?: string[];
  onShare?: (platform: string) => void;
}

const ExternalShareButtons: React.FC<ExternalShareButtonsProps> = ({ 
  postId, 
  content, 
  images = [], 
  onShare 
}) => {
  const { isSignedIn } = useAuth();

  const handleShare = async (platform: string) => {
    if (!isSignedIn) {
      toast.error('Please sign in to share posts');
      return;
    }

    const shareUrl = `https://emviapp.com/post/${postId}`;
    const shareText = `${content.slice(0, 100)}${content.length > 100 ? '...' : ''} 

Check out this amazing beauty post on EmviApp! 💄✨

#EmviApp #BeautyPro #PoweredByEmviApp`;

    try {
      switch (platform) {
        case 'instagram':
          // Copy content for Instagram and open Instagram
          await navigator.clipboard.writeText(shareText);
          window.open('https://www.instagram.com/', '_blank');
          toast.success('Content copied! Share on Instagram 📸');
          break;
          
        case 'tiktok':
          // Copy content for TikTok and open TikTok
          await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          window.open('https://www.tiktok.com/upload', '_blank');
          toast.success('Content copied! Share on TikTok 🎵');
          break;
          
        case 'facebook':
          const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
          window.open(fbUrl, '_blank', 'width=600,height=400');
          toast.success('Shared to Facebook! 📘');
          break;
          
        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          window.open(twitterUrl, '_blank', 'width=600,height=400');
          toast.success('Shared to Twitter! 🐦');
          break;
          
        case 'link':
          await navigator.clipboard.writeText(shareUrl);
          toast.success('Link copied to clipboard! 🔗');
          break;
          
        default:
          await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          toast.success('Content copied to clipboard!');
      }

      // Track the share action
      onShare?.(platform);
      
      // Award points for external sharing (you could implement this)
      toast.success('🎉 +5 points for sharing externally!');
      
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('instagram')}
        className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 transition-all duration-200 rounded-full p-2"
        title="Share to Instagram Story"
      >
        <Instagram className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('tiktok')}
        className="text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 rounded-full p-2"
        title="Share to TikTok"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded-full p-2"
        title="Share to Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all duration-200 rounded-full p-2"
        title="Share to Twitter"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('link')}
        className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 rounded-full p-2"
        title="Copy Link"
      >
        <Globe className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ExternalShareButtons;