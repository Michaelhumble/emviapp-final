
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralLinkProps {
  referralLink: string;
  onCopy: () => void;
  copied: boolean;
}

const ReferralLink = ({ referralLink, onCopy, copied }: ReferralLinkProps) => {
  const { userProfile } = useAuth();
  const [justCopied, setJustCopied] = useState(false);
  const { t, isVietnamese } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      onCopy();
      setJustCopied(true);
      
      if (!localStorage.getItem('referral_link_copied')) {
        // Set a flag for confetti animation on next dashboard load
        localStorage.setItem('salon_success', 'referral_copied');
        localStorage.setItem('referral_link_copied', 'true');
      }
      
      toast.success(t({
        english: "Referral link copied to clipboard!", 
        vietnamese: "Đã sao chép đường dẫn giới thiệu!"
      }));
    });
  };

  useEffect(() => {
    if (justCopied) {
      const timer = setTimeout(() => {
        setJustCopied(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [justCopied]);

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm text-gray-600">
        {t({
          english: "Your referral link:", 
          vietnamese: "Liên kết giới thiệu của bạn:"
        })}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="p-2 border border-gray-200 rounded-md w-full text-sm bg-gray-50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={justCopied ? { opacity: 1, y: -10 } : { opacity: 0, y: 0 }}
            className="absolute -top-6 left-0 right-0 text-center text-green-600 text-xs font-medium"
          >
            {t({
              english: "Copied!", 
              vietnamese: "Đã sao chép!"
            })}
          </motion.div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          className={copied ? "bg-green-50 text-green-600 border-green-200" : ""}
        >
          <Copy className="h-4 w-4 mr-1" /> 
          {t({
            english: "Copy", 
            vietnamese: "Sao chép"
          })}
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        {t({
          english: "Share this link with other salon owners to earn rewards.", 
          vietnamese: "Chia sẻ liên kết này với các chủ tiệm khác để nhận thưởng."
        })}
      </p>
    </div>
  );
};

export default ReferralLink;
