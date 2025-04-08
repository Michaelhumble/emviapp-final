
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import ReferralHeader from "./referral/ReferralHeader";
import ReferralLink from "./referral/ReferralLink";
import ReferralStats from "./referral/ReferralStats";

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
          // Get the first element if data is an array, otherwise use data directly
          const statsObject = Array.isArray(data) ? data[0] : data;
          setReferralCount(statsObject.referral_count || 0);
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
    <Card className="border-blue-100" id="referral-card">
      <CardHeader>
        <ReferralHeader />
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          {t("Invite other salons and earn free credits. Help grow our community!")}
        </p>
        
        <div className="space-y-4">
          <ReferralLink 
            referralLink={referralLink}
            onCopy={handleCopyReferralCode}
            copied={copied}
          />
          
          <ReferralStats referralCount={referralCount} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonReferralCard;
