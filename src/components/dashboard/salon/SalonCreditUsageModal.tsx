
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deductCredits } from "@/utils/credits";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Rocket, 
  Star, 
  Send, 
  UserPlus
} from "lucide-react";
import { createTranslation } from "@/components/dashboard/salon/SalonTranslationHelper";

interface SalonCreditUsageModalProps {
  isOpen: boolean;
  credits: number;
  onClose: () => void;
  refreshCredits: () => Promise<void>;
}

const SalonCreditUsageModal: React.FC<SalonCreditUsageModalProps> = ({
  isOpen, 
  credits, 
  onClose, 
  refreshCredits
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const creditOptions = [
    {
      id: 'visibility_boost',
      title: createTranslation(
        "Boost Salon Visibility",
        "Tăng độ nhận diện của salon"
      ),
      description: createTranslation(
        "Get featured on homepage and artist feed",
        "Được giới thiệu trên trang chủ và nguồn cấp dữ liệu nghệ sĩ"
      ),
      credits: 25,
      icon: <Rocket className="h-6 w-6 text-blue-500" />,
      action: async () => {
        if (!user?.id) return;
        
        const success = await deductCredits({
          userId: user.id,
          amount: 25,
          reason: 'Salon visibility boost'
        });

        if (success) {
          toast.success(t(createTranslation(
            "Your salon is now boosted for 7 days!",
            "Salon của bạn đã được tăng cường trong 7 ngày!"
          )));
          await refreshCredits();
        }
      }
    },
    {
      id: 'local_offer',
      title: createTranslation(
        "Send Local Customer Offer",
        "Gửi ưu đãi cho khách hàng địa phương"
      ),
      description: createTranslation(
        "Reach nearby professionals",
        "Tiếp cận các chuyên gia gần đó"
      ),
      credits: 20,
      icon: <Send className="h-6 w-6 text-green-500" />,
      action: async () => {
        if (!user?.id) return;
        
        const success = await deductCredits({
          userId: user.id,
          amount: 20,
          reason: 'Local customer promotion'
        });

        if (success) {
          toast.success(t(createTranslation(
            "Promotion created and targeted!",
            "Chương trình khuyến mãi đã được tạo và nhắm mục tiêu!"
          )));
          await refreshCredits();
        }
      }
    },
    {
      id: 'referral_boost',
      title: createTranslation(
        "Referral Boost",
        "Tăng cường giới thiệu"
      ),
      description: createTranslation(
        "System invites 10 nearby professionals",
        "Hệ thống mời 10 chuyên gia gần đó"
      ),
      credits: 15,
      icon: <UserPlus className="h-6 w-6 text-purple-500" />,
      action: async () => {
        if (!user?.id) return;
        
        const success = await deductCredits({
          userId: user.id,
          amount: 15,
          reason: 'Referral network boost'
        });

        if (success) {
          toast.success(t(createTranslation(
            "Referral boost initiated!",
            "Đã bắt đầu tăng cường giới thiệu!"
          )));
          await refreshCredits();
        }
      }
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t(createTranslation(
            "Smart Credit Usage",
            "Sử dụng Credit thông minh"
          ))}</DialogTitle>
          <DialogDescription>
            {t(createTranslation(
              `You have ${credits} credits. Choose how to spend them strategically!`,
              `Bạn có ${credits} credit. Hãy chọn cách sử dụng chúng một cách chiến lược!`
            ))}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-4">
          {creditOptions.map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer hover:border-primary transition-colors ${
                selectedOption === option.id ? 'border-primary' : ''
              } ${credits < option.credits ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (credits >= option.credits) {
                  setSelectedOption(option.id);
                  option.action();
                } else {
                  toast.error(t(createTranslation(
                    `Not enough credits. You need ${option.credits} credits.`,
                    `Không đủ credit. Bạn cần ${option.credits} credit.`
                  )));
                }
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t(option.title)}</CardTitle>
                {option.icon}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {t(option.description)}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-primary">
                    {t(createTranslation(
                      `${option.credits} credits`,
                      `${option.credits} credit`
                    ))}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonCreditUsageModal;
