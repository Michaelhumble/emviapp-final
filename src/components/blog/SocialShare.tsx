import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Linkedin, Mail, Link as LinkIcon, MessageCircle, Heart, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  hashtags?: string[];
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'horizontal' | 'vertical' | 'minimal';
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description,
  image,
  hashtags = [],
  className = '',
  size = 'default',
  variant = 'horizontal'
}) => {
  const [isNativeShareSupported] = useState(
    typeof navigator !== 'undefined' && 'share' in navigator
  );
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = image ? encodeURIComponent(image) : '';
  const hashtagText = hashtags.length > 0 ? encodeURIComponent(hashtags.join(' ')) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=140586622674265&redirect_uri=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0D%0A%0D%0A${encodedUrl}`
  };

  const handleNativeShare = async () => {
    if (!isNativeShareSupported) return;

    try {
      await navigator.share({
        title,
        text: description,
        url
      });
    } catch (err) {
      // User cancelled or error occurred, fall back to copy link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
        duration: 3000
      });
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
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      onClick: () => openShareWindow(shareLinks.facebook),
      className: 'hover:bg-blue-600 hover:text-white border-blue-200 text-blue-600',
      color: '#1877F2'
    },
    {
      name: 'Messenger',
      icon: MessageCircle,
      onClick: () => openShareWindow(shareLinks.messenger),
      className: 'hover:bg-blue-500 hover:text-white border-blue-200 text-blue-500',
      color: '#00B2FF'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      onClick: () => openShareWindow(shareLinks.twitter),
      className: 'hover:bg-black hover:text-white border-gray-300 text-gray-900',
      color: '#000000'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      onClick: () => openShareWindow(shareLinks.linkedin),
      className: 'hover:bg-blue-700 hover:text-white border-blue-200 text-blue-700',
      color: '#0A66C2'
    },
    {
      name: 'Pinterest',
      icon: Heart,
      onClick: () => openShareWindow(shareLinks.pinterest),
      className: 'hover:bg-red-600 hover:text-white border-red-200 text-red-600',
      color: '#E60023'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => openShareWindow(shareLinks.whatsapp),
      className: 'hover:bg-green-600 hover:text-white border-green-200 text-green-600',
      color: '#25D366'
    },
    {
      name: 'Email',
      icon: Mail,
      onClick: () => window.location.href = shareLinks.email,
      className: 'hover:bg-gray-600 hover:text-white border-gray-300 text-gray-600',
      color: '#6B7280'
    },
    {
      name: 'Copy Link',
      icon: Copy,
      onClick: handleCopyLink,
      className: 'hover:bg-primary hover:text-white border-primary/20 text-primary',
      color: 'var(--primary)'
    }
  ];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {isNativeShareSupported ? (
          <Button
            variant="outline"
            size={size}
            onClick={handleNativeShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        ) : (
          <Button
            variant="outline"
            size={size}
            onClick={handleCopyLink}
            className="gap-2"
          >
            <LinkIcon className="h-4 w-4" />
            Copy Link
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <p className="text-sm font-semibold text-muted-foreground mb-2">Share this article</p>
        {shareButtons.map((button) => (
          <Button
            key={button.name}
            variant="outline"
            size={size}
            onClick={button.onClick}
            className={`justify-start gap-3 ${button.className} transition-all duration-200`}
          >
            <button.icon className={sizeClasses[size]} />
            {button.name}
          </Button>
        ))}
        {isNativeShareSupported && (
          <Button
            variant="default"
            size={size}
            onClick={handleNativeShare}
            className="justify-start gap-3 bg-primary hover:bg-primary/90"
          >
            <Share2 className={sizeClasses[size]} />
            Native Share
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-sm font-semibold text-muted-foreground">Share:</span>
      {shareButtons.map((button) => (
        <Button
          key={button.name}
          variant="outline"
          size={size}
          onClick={button.onClick}
          className={`${button.className} transition-all duration-200 rounded-full ${sizeClasses[size]}`}
          title={`Share on ${button.name}`}
        >
          <button.icon className="h-4 w-4" />
          <span className="sr-only">Share on {button.name}</span>
        </Button>
      ))}
      {isNativeShareSupported && (
        <Button
          variant="default"
          size={size}
          onClick={handleNativeShare}
          className={`bg-primary hover:bg-primary/90 rounded-full ${sizeClasses[size]}`}
          title="Native Share"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Native Share</span>
        </Button>
      )}
    </div>
  );
};

export default SocialShare;