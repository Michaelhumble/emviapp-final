
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deductCredits } from "@/utils/credits";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Rocket, 
  Star, 
  Send, 
  UserPlus, 
  ArrowRight, 
  Check, 
  X 
} from "lucide-react";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const creditOptions = [
    {
      id: 'visibility_boost',
      title: 'Boost Salon Visibility',
      description: 'Get featured on homepage and artist feed',
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
          toast.success("Your salon is now boosted for 7 days!");
          await refreshCredits();
        }
      }
    },
    {
      id: 'local_offer',
      title: 'Send Local Customer Offer',
      description: 'Reach nearby professionals',
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
          toast.success("Promotion created and targeted!");
          await refreshCredits();
        }
      }
    },
    {
      id: 'referral_boost',
      title: 'Referral Boost',
      description: 'System invites 10 nearby professionals',
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
          toast.success("Referral boost initiated!");
          await refreshCredits();
        }
      }
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Smart Credit Usage</DialogTitle>
          <DialogDescription>
            You have {credits} credits. Choose how to spend them strategically!
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
                  toast.error(`Not enough credits. You need ${option.credits} credits.`);
                }
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{option.title}</CardTitle>
                {option.icon}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {option.description}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-primary">{option.credits} credits</span>
                  {credits >= option.credits ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
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
