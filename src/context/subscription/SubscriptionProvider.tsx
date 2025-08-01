
import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { SubscriptionContext } from "./SubscriptionContext";
import { SubscriptionPlan, SubscriptionState } from "./types";
import { basePlans, getPlansForRole } from "./plans";

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const auth = useAuth();
  const { user, userRole } = auth || { user: null, userRole: null };
  
  const [state, setState] = useState<SubscriptionState>({
    currentPlan: null,
    isLoading: true,
    isSubscribing: false,
    error: null,
    hasActiveSubscription: false
  });

  // Fetch the user's subscription status when the user changes
  useEffect(() => {
    if (user) {
      refreshSubscriptionStatus();
    } else {
      setState({
        currentPlan: null,
        isLoading: false,
        isSubscribing: false,
        error: null,
        hasActiveSubscription: false
      });
    }
  }, [user]);

  const refreshSubscriptionStatus = async () => {
    if (!user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Call the real Stripe subscription checking edge function
      const { data, error } = await supabase.functions.invoke('check-subscription-status');
      
      if (error) {
        console.error("Error checking subscription status:", error);
        throw new Error("Failed to verify subscription status");
      }
      
      const { subscribed, subscription_tier, subscription_end } = data;
      const plans = getPlansForRole(userRole || undefined);
      
      // Find the current plan based on subscription status
      let currentPlan;
      if (subscribed && subscription_tier) {
        currentPlan = plans.find(plan => 
          plan.name.toLowerCase().includes(subscription_tier.toLowerCase())
        ) || plans.find(plan => plan.id === "premium") || basePlans[1];
      } else {
        currentPlan = plans.find(plan => plan.id === "free") || basePlans[0];
      }
      
      setState({
        currentPlan,
        isLoading: false,
        isSubscribing: false,
        error: null,
        hasActiveSubscription: subscribed
      });
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      
      // Fallback to free plan if there's an error
      const plans = getPlansForRole(userRole || undefined);
      const freePlan = plans.find(plan => plan.id === "free") || basePlans[0];
      
      setState({
        currentPlan: freePlan,
        isLoading: false,
        isSubscribing: false,
        error: "Failed to load subscription information",
        hasActiveSubscription: false
      });
    }
  };

  const upgradeSubscription = async (plan: SubscriptionPlan) => {
    if (!user) {
      toast.error("You must be logged in to subscribe");
      return;
    }

    setState(prev => ({ ...prev, isSubscribing: true, error: null }));
    
    try {
      // Call the real Stripe subscription checkout edge function
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: {
          planId: plan.id,
          planName: plan.name,
          priceAmount: plan.price,
          interval: "month" // Default to monthly billing
        }
      });
      
      if (error) {
        console.error("Error creating subscription checkout:", error);
        throw new Error("Failed to create subscription checkout");
      }
      
      if (data?.url) {
        // Redirect to Stripe checkout
        toast.info("Redirecting to Stripe checkout...");
        window.open(data.url, '_blank');
        toast.success("Stripe checkout opened in new tab");
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      setState(prev => ({ 
        ...prev, 
        isSubscribing: false, 
        error: "Failed to process subscription" 
      }));
      toast.error("Failed to process subscription");
    } finally {
      setState(prev => ({ ...prev, isSubscribing: false }));
    }
  };

  const cancelSubscription = async () => {
    if (!user) return;
    
    setState(prev => ({ ...prev, isSubscribing: true, error: null }));
    
    try {
      // Call the existing cancel subscription edge function
      const { data, error } = await supabase.functions.invoke('cancel-subscription');
      
      if (error) {
        console.error("Error canceling subscription:", error);
        throw new Error("Failed to cancel subscription");
      }
      
      // Refresh subscription status after cancellation
      await refreshSubscriptionStatus();
      toast.success("Subscription canceled successfully");
    } catch (error) {
      console.error("Error canceling subscription:", error);
      setState(prev => ({ 
        ...prev, 
        isSubscribing: false, 
        error: "Failed to cancel subscription" 
      }));
      toast.error("Failed to cancel subscription");
    }
  };

  return (
    <SubscriptionContext.Provider 
      value={{
        ...state,
        upgradeSubscription,
        cancelSubscription,
        refreshSubscriptionStatus
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
