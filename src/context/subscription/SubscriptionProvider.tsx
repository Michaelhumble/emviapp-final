
import { useState, useEffect, ReactNode } from "react";
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
  const { user, userRole } = useAuth();
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
      // In a real implementation, this would call a Supabase Edge Function
      // that would verify the subscription with Stripe
      // For now, we'll use a placeholder implementation that checks local storage
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if the user has saved subscription info in localStorage (demo only)
      const savedSubscription = localStorage.getItem(`subscription_${user.id}`);
      
      if (savedSubscription) {
        const { planId } = JSON.parse(savedSubscription);
        const plans = getPlansForRole(userRole || undefined);
        const currentPlan = plans.find(plan => plan.id === planId) || plans.find(plan => plan.id === "free") || basePlans[0];
        
        setState({
          currentPlan,
          isLoading: false,
          isSubscribing: false,
          error: null,
          hasActiveSubscription: planId !== "free"
        });
      } else {
        // Default to free plan
        const freePlan = getPlansForRole(userRole || undefined)[0];
        
        setState({
          currentPlan: freePlan,
          isLoading: false,
          isSubscribing: false,
          error: null,
          hasActiveSubscription: false
        });
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to load subscription information" 
      }));
    }
  };

  const upgradeSubscription = async (plan: SubscriptionPlan) => {
    if (!user) {
      toast.error("You must be logged in to subscribe");
      return;
    }

    setState(prev => ({ ...prev, isSubscribing: true, error: null }));
    
    try {
      // In a real implementation, this would call a Supabase Edge Function
      // that creates a checkout session with Stripe
      
      // For now, we'll use a placeholder implementation that saves to localStorage
      const subscriptionData = {
        planId: plan.id,
        price: plan.price,
        startDate: new Date().toISOString(),
        userId: user.id
      };
      
      localStorage.setItem(`subscription_${user.id}`, JSON.stringify(subscriptionData));
      
      // Set the current plan
      setState({
        currentPlan: plan,
        isLoading: false,
        isSubscribing: false,
        error: null,
        hasActiveSubscription: plan.id !== "free"
      });
      
      toast.success(`Successfully subscribed to ${plan.name} plan!`);
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      setState(prev => ({ 
        ...prev, 
        isSubscribing: false, 
        error: "Failed to process subscription" 
      }));
      toast.error("Failed to process subscription");
    }
  };

  const cancelSubscription = async () => {
    if (!user) return;
    
    setState(prev => ({ ...prev, isSubscribing: true, error: null }));
    
    try {
      // In a real implementation, this would call a Supabase Edge Function
      // that cancels the subscription with Stripe
      
      // For now, we'll use a placeholder that updates localStorage
      const freePlan = getPlansForRole(userRole || undefined)[0];
      
      localStorage.setItem(`subscription_${user.id}`, JSON.stringify({
        planId: "free",
        price: 0,
        startDate: new Date().toISOString(),
        userId: user.id
      }));
      
      setState({
        currentPlan: freePlan,
        isLoading: false,
        isSubscribing: false,
        error: null,
        hasActiveSubscription: false
      });
      
      toast.success("Subscription canceled");
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

