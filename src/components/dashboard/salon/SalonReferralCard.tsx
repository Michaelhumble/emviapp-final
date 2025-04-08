
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const SalonReferralCard = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (!user?.id) return;
    
    // Set referral code from userProfile
    if (userProfile?.referral_code) {
      setReferralCode(userProfile.referral_code);
    }
    
    // Get referral count
    const fetchReferralCount = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
        
        if (!error && data) {
          // Fix: data is a single object, not an array
          setReferralCount(data.referral_count || 0);
        }
      } catch (err) {
        console.error("Error fetching referral count:", err);
      }
    };
    
    fetchReferralCount();
  }, [user, userProfile]);
  
  const handleCopyReferralCode = () => {
    if (!referralCode) return;
    
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success(t("Referral code copied to clipboard"));
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
  
  return (
    <Card className="border-blue-100">
      <CardHeader>
        {/* Vietnamese referral text for salons - making it more prominent */}
        <div className="mb-3 py-2 px-3 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-blue-700 text-sm font-medium">
            {t("Giới thiệu chủ tiệm khác để nhận thưởng từ Emvi.")} <span className="text-blue-500 text-xs block mt-1">{t("Invite other salon owners and earn Emvi rewards.")}</span>
          </p>
        </div>
        
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          {t("Salon Referral Program")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          {t("Invite other salons and earn free credits. Help grow our community!")}
        </p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("Your Referral Link")}</p>
            <div className="flex">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 p-2 text-sm border rounded-l-md bg-gray-50"
              />
              <Button
                size="sm"
                onClick={handleCopyReferralCode}
                className={`rounded-l-none ${copied ? 'bg-green-500' : ''}`}
              >
                {copied ? t("Copied!") : t("Copy")}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-md">
            <div>
              <p className="text-sm font-medium text-blue-700">{t("Your Referrals")}</p>
              <p className="text-xs text-blue-500">{t("Earn 20 credits per successful referral")}</p>
            </div>
            <div className="bg-white py-1 px-3 rounded-full text-blue-600 font-medium border border-blue-100">
              {referralCount}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonReferralCard;
