
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

const ArtistReferralCenter = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const isVietnamese = userProfile?.preferred_language?.toLowerCase() === 'vietnamese';

  // Generate a referral link based on the user ID
  const referralLink = user ? `https://emviapp.com/join?ref=${user.id.substring(0, 8)}` : '';

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success(
        isVietnamese ? "Đã sao chép vào clipboard!" : "Copied to clipboard!",
        {
          description: isVietnamese 
            ? "Chia sẻ link này với bạn bè và đồng nghiệp" 
            : "Share this link with friends and colleagues"
        }
      );
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <Card className="border-purple-100 overflow-hidden relative">
        <motion.div 
          className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <CardHeader className="pb-2 relative overflow-hidden">
          <p className="text-gray-500 text-sm italic mb-2">
            <span className="block">
              {t({
                english: "Invite friends and earn rewards from Emvi.",
                vietnamese: "Giới thiệu bạn bè và nhận thưởng từ Emvi."
              })}
            </span>
          </p>
          
          <CardTitle className="text-xl font-serif flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-500" />
            {t({
              english: "Referral Program",
              vietnamese: "Chương Trình Giới Thiệu"
            })}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-gray-600 mb-4">
            {t({
              english: "Earn Emvi Credits when someone joins using your link. Credits can be redeemed for profile boosts and visibility upgrades.",
              vietnamese: "Nhận tín dụng Emvi khi ai đó tham gia bằng liên kết của bạn. Tín dụng có thể được sử dụng để tăng cường hồ sơ và nâng cao khả năng hiển thị."
            })}
          </p>
          
          <div className="relative mb-4 group">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative flex items-center bg-white border border-purple-100 rounded-lg p-3">
              <div className="flex-1 truncate text-sm text-purple-800 font-mono">
                {referralLink}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`ml-2 ${copied ? 'text-green-600 border-green-200' : 'text-purple-600'}`}
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {t({
                        english: "Copied!",
                        vietnamese: "Đã sao chép!"
                      })}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      {t({
                        english: "Copy Link",
                        vietnamese: "Sao chép"
                      })}
                    </>
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-600"
                  asChild
                >
                  <a href={`mailto:?subject=${encodeURIComponent(t({
                      english: "Join me on EmviApp!",
                      vietnamese: "Tham gia EmviApp cùng tôi!"
                    }))}&body=${encodeURIComponent(
                      t({
                        english: `Hey! I'm using EmviApp for my nail art business. Join using my referral link: ${referralLink}`,
                        vietnamese: `Chào! Tôi đang sử dụng EmviApp cho công việc nail của mình. Tham gia bằng link giới thiệu của tôi: ${referralLink}`
                      })
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {t({
                english: "Earn 3 credits per referral",
                vietnamese: "Nhận 3 tín dụng cho mỗi lần giới thiệu"
              })}
            </span>
            <span className="text-gray-500">
              {t({
                english: "Unlimited referrals",
                vietnamese: "Không giới hạn số lượng"
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistReferralCenter;
