
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';
import { Users, Award, Rocket, Gift, Link, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createTranslation } from "@/components/dashboard/salon/SalonTranslationHelper";

const ReferralTracker = () => {
  const { t } = useTranslation();
  
  // Mock data - in a real implementation, this would come from props or a hook
  const referrals = {
    completed: 3,
    target: 10,
    percentage: 30
  };
  
  const metrics = [
    {
      icon: Users,
      label: createTranslation("People Referred", "Người đã mời"),
      value: referrals.completed
    },
    {
      icon: Award,
      label: createTranslation("Credits Earned", "Tín dụng đã nhận"),
      value: 45
    },
    {
      icon: Rocket,
      label: createTranslation("Boosts Used", "Lượt tăng đã dùng"),
      value: 2
    },
    {
      icon: Gift,
      label: createTranslation("Offers Sent", "Khuyến mãi đã gửi"),
      value: 5
    }
  ];

  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/join?ref=salon123`; // This should be dynamic
    navigator.clipboard.writeText(referralLink).then(() => {
      toast.success(t(createTranslation(
        "Referral link copied to clipboard!",
        "Đã sao chép liên kết giới thiệu!"
      )));
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Users className="h-5 w-5 mr-2 text-purple-500" />
          {t(createTranslation(
            "Referral Progress",
            "Theo dõi giới thiệu"
          ))}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg"
              >
                <metric.icon className="h-5 w-5 mb-2 text-purple-500" />
                <span className="text-2xl font-bold text-purple-700">
                  {metric.value}
                </span>
                <span className="text-xs text-gray-600 text-center">
                  {t(metric.label)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">
              {t(createTranslation(
                "Your referral link:",
                "Liên kết giới thiệu của bạn:"
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 p-2 rounded text-sm text-gray-700 truncate">
                {`${window.location.origin}/join?ref=salon123`}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {t(createTranslation(
                  "Copy Link",
                  "Sao chép liên kết"
                ))}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {t(createTranslation(
                "Share your link to earn free credits!",
                "Chia sẻ liên kết để nhận tín dụng miễn phí!"
              ))}
            </p>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{referrals.completed} / {referrals.target} {t(createTranslation(
                "referrals completed",
                "lượt giới thiệu hoàn thành"
              ))}</span>
              <span>{referrals.percentage}%</span>
            </div>
            <Progress value={referrals.percentage} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralTracker;
