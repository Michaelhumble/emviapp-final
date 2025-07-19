
import { useEffect, useState } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from "@/context/auth";

/**
 * Returns referral stats for the current user from the "referrals" table and their "credits".
 * - invitedCount: number of completed referrals (referrals by user)
 * - creditsEarned: how many credits the user currently has (from all sources)
 */
export function useReferralStatsDb() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [invitedCount, setInvitedCount] = useState(0);
  const [creditsEarned, setCreditsEarned] = useState(0);

  useEffect(() => {
    if (!user) return;

    async function fetchStats() {
      setLoading(true);

      // Get referral count from referrals table (where referrer_id = user.id)
      const { count, error } = await supabaseBypass
        .from("referrals")
        .select("*", { count: "exact", head: true })
        .eq("referrer_id" as any, user.id);

      if (!error) {
        setInvitedCount(count || 0);
      }

      // Get user credits
      const { data: udata, error: e2 } = await supabaseBypass
        .from("profiles")
        .select("credits")
        .eq("id" as any, user.id)
        .single();

      if (!e2) {
        setCreditsEarned(Number((udata as any)?.credits) || 0);
      }

      setLoading(false);
    }
    fetchStats();
  }, [user]);

  return { loading, invitedCount, creditsEarned };
}
