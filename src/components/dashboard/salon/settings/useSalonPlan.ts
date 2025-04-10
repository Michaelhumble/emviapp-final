
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useSalon } from "@/context/salon/SalonContext";
import { supabase } from "@/integrations/supabase/client";
import { SalonPlanType } from "./types";
import { toast } from "sonner";

// Define the salon plan options
const salonPlans: SalonPlanType[] = [
  {
    id: "solo",
    name: "Solo",
    description: "Perfect for individual salon owners",
    price: 49.95,
    staffLimit: 1,
    features: [
      "1 staff member",
      "Basic analytics",
      "Customer management",
      "3 boost credits per month",
      "Email support"
    ],
    hasTrial: true
  },
  {
    id: "small",
    name: "Small Team",
    description: "Great for small salons",
    price: 99,
    staffLimit: 5,
    features: [
      "Up to 5 staff members",
      "Advanced analytics",
      "Customer management",
      "10 boost credits per month",
      "Priority email support",
      "Custom booking page"
    ],
    hasTrial: true
  },
  {
    id: "medium",
    name: "Growing Team",
    description: "Ideal for medium-sized salons",
    price: 175,
    staffLimit: 10,
    features: [
      "Up to 10 staff members",
      "Advanced analytics with exports",
      "Customer management",
      "20 boost credits per month",
      "Priority email & chat support",
      "Custom booking page",
      "Team performance tracking"
    ]
  },
  {
    id: "unlimited",
    name: "Enterprise",
    description: "For large salons with multiple staff",
    price: 199.95,
    staffLimit: Infinity,
    features: [
      "Unlimited staff members",
      "Advanced analytics with exports",
      "Full customer relationship management",
      "30 boost credits per month",
      "Premium support with dedicated rep",
      "Custom booking page",
      "Team performance tracking",
      "API access for integrations"
    ]
  }
];

export function useSalonPlan() {
  const { user } = useAuth();
  const { currentSalon } = useSalon();
  const [currentPlan, setCurrentPlan] = useState<string>("solo");
  const [staffCount, setStaffCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Find the active plan based on current plan ID
  const activePlan = salonPlans.find(plan => plan.id === currentPlan);
  
  // Check if the salon needs to upgrade based on staff count
  const needsUpgrade = staffCount > (activePlan?.staffLimit || 0);
  
  // Fetch the current plan and staff count on mount
  useEffect(() => {
    const fetchPlanAndStaffCount = async () => {
      if (!user?.id || !currentSalon?.id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch the salon's current plan (this would be from a plans table in a real implementation)
        // For this MVP, we'll check if the user has a plan stored in localStorage
        const savedPlan = localStorage.getItem(`salon_plan_${currentSalon.id}`);
        
        if (savedPlan) {
          setCurrentPlan(savedPlan);
        }
        
        // Count staff members for the current salon
        const { data: staffData, error: staffError } = await supabase
          .from('salon_staff')
          .select('id')
          .eq('salon_id', currentSalon.id)
          .eq('status', 'active');
          
        if (staffError) throw staffError;
        
        setStaffCount(staffData?.length || 0);
      } catch (err) {
        console.error("Error fetching salon plan:", err);
        setError("Failed to load your subscription data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlanAndStaffCount();
  }, [user?.id, currentSalon?.id]);
  
  // Function to switch plans
  const switchPlan = async (planId: string) => {
    if (!currentSalon?.id) return;
    
    // In a real implementation, this would initiate a Stripe checkout
    // For this MVP, we'll just update localStorage
    try {
      localStorage.setItem(`salon_plan_${currentSalon.id}`, planId);
      setCurrentPlan(planId);
      
      // Show success message
      const newPlan = salonPlans.find(p => p.id === planId);
      toast.success(`Successfully switched to ${newPlan?.name} plan`);
    } catch (err) {
      console.error("Error switching plans:", err);
      toast.error("Failed to switch plans. Please try again.");
    }
  };
  
  return {
    currentPlan,
    activePlan,
    planOptions: salonPlans,
    staffCount,
    isLoading,
    error,
    needsUpgrade,
    switchPlan
  };
}
