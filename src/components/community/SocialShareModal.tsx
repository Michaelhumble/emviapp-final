import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Download } from 'lucide-react';
import { toast } from 'sonner';
import { CommunityPost } from '@/hooks/useCommunityPosts';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: CommunityPost;
}

interface SocialPlatform {
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
  action: (post: CommunityPost) => void;
}

const SocialShareModal = ({ isOpen, onClose, post }: SocialShareModalProps) => {
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  // Generate shareable content with EmviApp branding
  const generateShareableContent = (post: CommunityPost, platform: string) => {
    const brandingText = "\n\n✨ Powered by EmviApp - Connect with beauty professionals";
    const hashtags = "\n\n#BeautyProfessional #EmviApp #BeautyCommunity";
    
    let content = post.content;
    
    // Platform-specific formatting
    switch (platform) {
      case 'Instagram':
        content += hashtags + brandingText;
        break;
      case 'Twitter':
        // Twitter has character limits
        const maxLength = 280 - brandingText.length - hashtags.length;
        content = content.length > maxLength 
          ? content.substring(0, maxLength - 3) + "..." 
          : content;
        content += hashtags + brandingText;
        break;
      case 'Facebook':
        content += brandingText;
        break;
      case 'TikTok':
        content += hashtags + brandingText;
        break;
    }
    
    return content;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Content copied to clipboard!');
  };

  const openInNewTab = (url: string) => {
    // Add a small delay to ensure clipboard operations complete
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 100);
  };

  const socialPlatforms: SocialPlatform[] = [
    {
      name: 'Instagram Stories',
      icon: '📸',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-white',
      action: (post) => {
        const shareableContent = generateShareableContent(post, 'Instagram');
        copyToClipboard(shareableContent);
        toast.success('Content copied! Paste it in your Instagram Story');
      }
    },
    {
      name: 'TikTok',
      icon: '🎵',
      bgColor: 'bg-black',
      textColor: 'text-white',
      action: (post) => {
        const shareableContent = generateShareableContent(post, 'TikTok');
        copyToClipboard(shareableContent);
        openInNewTab('https://www.tiktok.com/upload');
      }
    },
    {
      name: 'Facebook',
      icon: '👥',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      action: (post) => {
        const shareableContent = generateShareableContent(post, 'Facebook');
        const encodedText = encodeURIComponent(shareableContent);
        openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=&quote=${encodedText}`);
      }
    },
    {
      name: 'Twitter',
      icon: '🐦',
      bgColor: 'bg-blue-400',
      textColor: 'text-white',
      action: (post) => {
        const shareableContent = generateShareableContent(post, 'Twitter');
        const encodedText = encodeURIComponent(shareableContent);
        openInNewTab(`https://twitter.com/intent/tweet?text=${encodedText}`);
      }
    }
  ];

  const handlePlatformShare = async (platform: SocialPlatform) => {
    setIsGeneratingContent(true);
    try {
      await platform.action(post);
    } catch (error) {
      toast.error('Failed to share content. Please try again.');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const copyPostLink = () => {
    const postUrl = `${window.location.origin}/community/post/${post.id}`;
    copyToClipboard(postUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Share to Social Media
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Post Preview */}
          <div className="p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600 overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as any
            }}>
              {post.content}
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              ✨ Will include EmviApp branding
            </Badge>
          </div>

          {/* Social Platforms */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Choose Platform:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  onClick={() => handlePlatformShare(platform)}
                  disabled={isGeneratingContent}
                  className={`${platform.bgColor} ${platform.textColor} hover:opacity-90 h-auto py-3 px-4 flex flex-col sm:flex-row items-center gap-2 transition-all duration-200`}
                >
                  <span className="text-2xl sm:text-xl">{platform.icon}</span>
                  <span className="text-sm font-medium text-center sm:text-left">{platform.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700">Other Options:</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyPostLink}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const content = generateShareableContent(post, 'General');
                  copyToClipboard(content);
                }}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-1" />
                Copy Text
              </Button>
            </div>
          </div>

          {/* Branding Notice */}
          <div className="text-xs text-gray-500 text-center p-2 bg-purple-50 rounded">
            <p>Shared content automatically includes EmviApp branding to help grow our community! 💜</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;