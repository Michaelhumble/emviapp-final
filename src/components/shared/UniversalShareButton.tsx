import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, MessageCircle, Copy, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UniversalShareButtonProps {
  title: string;
  description: string;
  image?: string;
  hashtags?: string[];
  customUrl?: string; // Optional custom URL, falls back to current page
  utmSource?: string; // For tracking which component/page initiated the share
  className?: string;
  variant?: 'button' | 'icon' | 'text';
  size?: 'sm' | 'default' | 'lg';
}

const UniversalShareButton: React.FC<UniversalShareButtonProps> = ({
  title,
  description,
  image,
  hashtags = [],
  customUrl,
  utmSource = 'page_share',
  className = '',
  variant = 'button',
  size = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNativeShareSupported] = useState(
    typeof navigator !== 'undefined' && 'share' in navigator
  );
  const { toast } = useToast();

  // Generate the share URL with proper tracking
  const generateShareUrl = (medium: string) => {
    const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://emvi.app';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const baseUrl = customUrl || `${currentDomain}${currentPath}`;
    
    // Add UTM parameters for analytics tracking
    const utmParams = new URLSearchParams({
      utm_source: medium,
      utm_medium: 'social',
      utm_campaign: 'content_sharing',
      utm_content: utmSource
    });
    
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${utmParams.toString()}`;
  };

  const shareUrl = generateShareUrl('direct');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = image ? encodeURIComponent(image.startsWith('http') ? image : `${typeof window !== 'undefined' ? window.location.origin : 'https://emvi.app'}${image}`) : '';
  const hashtagText = hashtags.length > 0 ? hashtags.join(',') : '';

  const shareLinks = {
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generateShareUrl('facebook'))}&quote=${encodedTitle}`,
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2'
    },
    messenger: {
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(generateShareUrl('messenger'))}&app_id=140586622674265&redirect_uri=${encodedUrl}`,
      name: 'Messenger',
      icon: MessageCircle,
      color: '#00B2FF'
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(generateShareUrl('twitter'))}&text=${encodedTitle}&hashtags=${hashtagText}`,
      name: 'X (Twitter)',
      icon: Twitter,
      color: '#000000'
    },
    linkedin: {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generateShareUrl('linkedin'))}&title=${encodedTitle}&summary=${encodedDescription}`,
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2'
    },
    whatsapp: {
      url: `https://wa.me/?text=${encodedTitle}%20${encodeURIComponent(generateShareUrl('whatsapp'))}`,
      name: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366'
    },
    email: {
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0D%0A%0D%0A${encodeURIComponent(generateShareUrl('email'))}`,
      name: 'Email',
      icon: Mail,
      color: '#6B7280'
    }
  };

  const handleNativeShare = async () => {
    if (!isNativeShareSupported) return;

    try {
      await navigator.share({
        title,
        text: description,
        url: generateShareUrl('native')
      });
      setIsOpen(false);
    } catch (err) {
      // User cancelled or error occurred, fall back to copy link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generateShareUrl('copy'));
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
        duration: 3000
      });
      setIsOpen(false);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try manually selecting the URL.",
        variant: "destructive"
      });
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(
      shareUrl,
      'share-window',
      'width=600,height=500,location=no,menubar=no,toolbar=no,status=no,scrollbars=yes'
    );
    setIsOpen(false);
  };

  const getButtonContent = () => {
    switch (variant) {
      case 'icon':
        return <Share2 className="h-4 w-4" />;
      case 'text':
        return 'Share';
      default:
        return (
          <>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </>
        );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className={`${className} transition-all duration-200`}
        >
          {getButtonContent()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* Native share first if supported */}
        {isNativeShareSupported && (
          <>
            <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
              <Share2 className="h-4 w-4 mr-3" />
              Native Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        {/* Social platforms */}
        {Object.entries(shareLinks).map(([platform, config]) => (
          <DropdownMenuItem
            key={platform}
            onClick={() => openShareWindow(config.url)}
            className="cursor-pointer"
          >
            <config.icon className="h-4 w-4 mr-3" style={{ color: config.color }} />
            {config.name}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {/* Copy link */}
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-3" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UniversalShareButton;