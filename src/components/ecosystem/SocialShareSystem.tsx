import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Copy,
  Check,
  Sparkles,
  Crown,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface SocialShareSystemProps {
  content: {
    type: 'profile' | 'post' | 'achievement' | 'job' | 'salon' | 'booking' | 'review';
    title: string;
    description: string;
    imageUrl?: string;
    url?: string;
    data?: any;
  };
  showBranding?: boolean;
  onShare?: (platform: string) => void;
  className?: string;
}

const SocialShareSystem: React.FC<SocialShareSystemProps> = ({
  content,
  showBranding = true,
  onShare,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate branded share content
  const generateShareContent = (platform: string) => {
    const baseUrl = window.location.origin;
    const shareUrl = content.url || window.location.href;
    
    const brandedMessages = {
      profile: {
        text: `🌟 Check out my EmviApp profile! ${content.title} - Connecting beauty professionals worldwide 💄✨`,
        hashtags: ['EmviApp', 'BeautyProfessional', 'NailArt', 'BeautyCommunity']
      },
      post: {
        text: `💫 ${content.title} via @EmviApp - The beauty community that gets it! 🎨`,
        hashtags: ['EmviApp', 'BeautyLife', 'Inspiration', 'Community']
      },
      achievement: {
        text: `🏆 Just achieved: ${content.title} on EmviApp! Join the beauty revolution 🚀`,
        hashtags: ['EmviApp', 'Achievement', 'BeautyGoals', 'Success']
      },
      job: {
        text: `💼 Amazing opportunity: ${content.title} - Find your dream job on EmviApp! 🌟`,
        hashtags: ['EmviApp', 'BeautyJobs', 'Hiring', 'Career']
      },
      salon: {
        text: `🏪 Featured salon: ${content.title} - Discover amazing salons on EmviApp! ✨`,
        hashtags: ['EmviApp', 'Salon', 'BeautyBusiness', 'Professional']
      },
      booking: {
        text: `📅 Booked my appointment: ${content.title} through EmviApp! Book yours today 💅`,
        hashtags: ['EmviApp', 'Booking', 'BeautyAppointment', 'Convenient']
      },
      review: {
        text: `⭐ ${content.title} - Sharing my experience on EmviApp! Rate your experiences too 🌟`,
        hashtags: ['EmviApp', 'Review', 'BeautyExperience', 'Feedback']
      }
    };

    const shareData = brandedMessages[content.type] || brandedMessages.post;
    const hashtagString = shareData.hashtags.map(tag => `#${tag}`).join(' ');
    
    return {
      text: shareData.text,
      url: shareUrl,
      hashtags: hashtagString,
      fullText: `${shareData.text}\n\n${shareUrl}\n\n${hashtagString}`
    };
  };

  const handleShare = async (platform: string) => {
    const shareData = generateShareContent(platform);
    
    try {
      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`,
            '_blank',
            'width=600,height=400'
          );
          break;
          
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}&hashtags=${encodeURIComponent(shareData.hashtags.replace(/#/g, ''))}`,
            '_blank',
            'width=600,height=400'
          );
          break;
          
        case 'instagram':
          // Instagram doesn't support direct sharing, copy to clipboard instead
          await navigator.clipboard.writeText(shareData.fullText);
          toast.success('Content copied! Paste it on Instagram 📸');
          break;
          
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(content.title)}&summary=${encodeURIComponent(shareData.text)}`,
            '_blank',
            'width=600,height=400'
          );
          break;
          
        case 'copy':
          await navigator.clipboard.writeText(shareData.fullText);
          setCopied(true);
          toast.success('Link copied to clipboard! 📋');
          setTimeout(() => setCopied(false), 2000);
          break;
          
        default:
          // Use Web Share API if available
          if (navigator.share) {
            await navigator.share({
              title: content.title,
              text: shareData.text,
              url: shareData.url
            });
          }
      }
      
      // Track share event
      onShare?.(platform);
      
      // Award sharing points (simulate)
      if (platform !== 'copy') {
        toast.success(`+5 EmviPoints for sharing! 🎉`, {
          description: 'Keep sharing to climb the leaderboard!'
        });
      }
      
    } catch (error) {
      toast.error('Sharing failed. Please try again.');
    }
    
    setIsOpen(false);
  };

  const shareButtons = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-blue-600 hover:bg-blue-700',
      platform: 'facebook'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      color: 'bg-sky-500 hover:bg-sky-600',
      platform: 'twitter'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      platform: 'instagram'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: 'bg-blue-700 hover:bg-blue-800',
      platform: 'linkedin'
    },
    { 
      name: copied ? 'Copied!' : 'Copy Link', 
      icon: copied ? Check : Copy, 
      color: copied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-700',
      platform: 'copy'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 hover:bg-purple-50 hover:border-purple-300"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
        {showBranding && <Sparkles className="h-3 w-3 text-purple-500" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full mt-2 right-0 z-50"
          >
            <Card className="p-4 shadow-lg border-purple-200 bg-white min-w-[300px]">
              {showBranding && (
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-100">
                  <Crown className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">Share via EmviApp</span>
                  <Award className="h-4 w-4 text-amber-500" />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                {shareButtons.map((button) => (
                  <Button
                    key={button.platform}
                    onClick={() => handleShare(button.platform)}
                    className={`${button.color} text-white flex items-center space-x-2 text-sm`}
                    size="sm"
                  >
                    <button.icon className="h-4 w-4" />
                    <span>{button.name}</span>
                  </Button>
                ))}
              </div>
              
              {showBranding && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500">
                    Earn <span className="font-semibold text-purple-600">+5 points</span> for each share! 🎯
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShareSystem;