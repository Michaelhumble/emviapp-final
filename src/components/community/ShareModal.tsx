import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShareCard from './ShareCard';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    user: {
      name: string;
      avatar: string;
      location: string;
    };
    content: string;
    type: string;
    image?: string;
  };
}

const ShareModal = ({ isOpen, onClose, post }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // Generate referral link (in real app, this would include user's unique referral code)
  const referralLink = `${window.location.origin}/community?ref=emvi${post.id}&invite=true`;
  const shareText = `Check out this amazing success story from ${post.user.name} on EmviApp! 🎉✨`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${referralLink}`);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      triggerConfetti();
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleShare = async (platform: string) => {
    let shareUrl = '';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(referralLink);

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      triggerConfetti();
      toast.success(`Shared to ${platform}!`);
    }

    // Check if native sharing is available for mobile
    if (navigator.share && platform === 'native') {
      try {
        await navigator.share({
          title: 'EmviApp Success Story',
          text: shareText,
          url: referralLink,
        });
        triggerConfetti();
        toast.success('Shared successfully!');
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    }
  };

  const socialPlatforms = [
    { name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700', emoji: '📘' },
    { name: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600', emoji: '🐦' },
    { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600', emoji: '📷' },
    { name: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800', emoji: '💼' },
    { name: 'WhatsApp', color: 'bg-green-600 hover:bg-green-700', emoji: '💬' },
    { name: 'Telegram', color: 'bg-blue-500 hover:bg-blue-600', emoji: '✈️' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-bold">Share Your Success</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Share Options */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Share to Social Media</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socialPlatforms.map((platform) => (
                        <Button
                          key={platform.name}
                          onClick={() => handleShare(platform.name.toLowerCase())}
                          className={`${platform.color} text-white h-12 flex items-center justify-center space-x-2 transition-all duration-200`}
                        >
                          <span className="text-lg">{platform.emoji}</span>
                          <span className="font-medium">{platform.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Native Share (Mobile) */}
                  {navigator.share && (
                    <Button
                      onClick={() => handleShare('native')}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white h-12"
                    >
                      <span className="mr-2">📱</span>
                      Share via Device
                    </Button>
                  )}

                  {/* Copy Link */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Or Copy Link</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-muted rounded-lg p-3 text-sm text-muted-foreground truncate">
                        {referralLink}
                      </div>
                      <Button
                        onClick={handleCopyLink}
                        className="px-4"
                        variant={copied ? "default" : "outline"}
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      💎 Includes your referral code - earn rewards when friends join!
                    </p>
                  </div>

                  {/* Share Card Preview Toggle */}
                  <Button
                    onClick={() => setShowCard(!showCard)}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {showCard ? 'Hide' : 'Preview'} Share Card
                  </Button>
                </div>

                {/* Share Card Preview */}
                <AnimatePresence>
                  {showCard && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-center"
                    >
                      <div className="scale-75 origin-center">
                        <ShareCard post={post} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;