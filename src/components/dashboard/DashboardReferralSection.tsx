
import { ReferralCard } from "@/components/referral/ReferralCard";
import { ReferralNotification } from "@/components/referral/ReferralNotification";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export const DashboardReferralSection = () => {
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [earnedCredits, setEarnedCredits] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Subscribe to notifications for referral credits
    const channel = supabase
      .channel('referral-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id} AND type=eq.referral_success`
        },
        (payload) => {
          const credits = payload.new.metadata?.credits_earned || 10;
          setEarnedCredits(credits);
          setShowNotification(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ReferralCard />
      <ReferralNotification
        show={showNotification}
        credits={earnedCredits}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};
