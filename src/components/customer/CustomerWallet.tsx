
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";

interface CustomerWalletProps {
  onBalanceUpdate?: (newBalance: number) => void;
}

const CustomerWallet: React.FC<CustomerWalletProps> = ({ onBalanceUpdate }) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Credits fallback
  const currentCredits = userProfile?.credits ?? 0;

  // Handle promo code apply
  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setLoading(true);

    // Step 1: Check promo code validity and availability
    const { data: code, error: codeErr } = await supabase
      .from("promo_codes")
      .select("*")
      .eq("code", promoCode.trim())
      .single();

    if (codeErr || !code) {
      toast({
        title: "Invalid code",
        description: "This promo code does not exist.",
        variant: "error",
      });
      setLoading(false);
      return;
    }
    if (!code.is_active) {
      toast({
        title: "Code expired",
        description: "This promo code is no longer active.",
        variant: "error",
      });
      setLoading(false);
      return;
    }
    // Check expiration (if set)
    if (code.expires_at && new Date(code.expires_at) < new Date()) {
      toast({
        title: "Code expired",
        description: "This promo code has expired.",
        variant: "error",
      });
      setLoading(false);
      return;
    }
    if (code.max_uses && code.used_count >= code.max_uses) {
      toast({
        title: "Code expired",
        description: "This promo code is no longer available.",
        variant: "error",
      });
      setLoading(false);
      return;
    }

    // Step 2: Check if this user has used it already
    const { data: rp, error: usageErr } = await supabase
      .from("promo_code_usages")
      .select("id")
      .eq("user_id", user?.id)
      .eq("promo_code_id", code.id)
      .maybeSingle();

    if (rp) {
      toast({
        title: "Code already used",
        description: "You have already used this code.",
        variant: "error",
      });
      setLoading(false);
      return;
    }

    // Step 3: Add credits and log usage in a transaction
    let errorOccurred = false;
    const { error: applyError } = await supabase.rpc("rpc_apply_promo_code_for_user", {
      p_user_id: user?.id,
      p_code: code.code,
    });

    if (applyError) {
      errorOccurred = true;
      toast({
        title: "Apply failed",
        description: "Could not apply this code. Please try again.",
        variant: "error",
      });
    }

    // Fallback: if custom function not available, do it in code:
    if (applyError || !applyError) {
      // Insert into promo_code_usages
      const { error: insError } = await supabase.from("promo_code_usages").insert({
        user_id: user?.id,
        promo_code_id: code.id,
      });
      if (insError) {
        errorOccurred = true;
        toast({
          title: "Error",
          description: "Failed to apply code. Please try again.",
          variant: "error",
        });
        setLoading(false);
        return;
      }
      // Update used count on code
      await supabase
        .from("promo_codes")
        .update({ used_count: code.used_count + 1 })
        .eq("id", code.id);

      // Add credits to user
      const { error: upError } = await supabase
        .from("users")
        .update({ credits: currentCredits + code.value })
        .eq("id", user?.id);

      if (upError) {
        errorOccurred = true;
        toast({
          title: "Error",
          description: "Could not update credits. Please contact support.",
          variant: "error",
        });
        setLoading(false);
        return;
      }
    }

    // Success toast & UI update
    setPromoCode("");
    setLoading(false);
    toast({
      title: "Promo applied!",
      description: `Promo applied! ${code.value} credits added.`,
      variant: "success",
    });
    // Refresh profile/balance
    if (onBalanceUpdate) {
      onBalanceUpdate(currentCredits + code.value);
    }
    if (refreshUserProfile) await refreshUserProfile();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <Wallet className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-xl font-semibold">Wallet</h3>
      </div>
      <div className="mb-2 text-gray-700 text-base">Your Credit Balance: <span className="font-bold">{currentCredits} credits</span></div>
      <form onSubmit={handleApplyPromoCode} className="flex flex-col sm:flex-row items-stretch gap-3 mt-4 max-w-md">
        <Input
          type="text"
          placeholder="Enter a promo code"
          className="text-base h-12 sm:w-64"
          value={promoCode}
          autoComplete="off"
          onChange={(e) => setPromoCode(e.target.value)}
          disabled={loading}
        />
        <Button 
          type="submit"
          className="h-12 text-base flex-shrink-0"
          disabled={!promoCode.trim() || loading}
        >
          {loading ? "Applying..." : "Apply Code"}
        </Button>
      </form>
    </div>
  );
};

export default CustomerWallet;
