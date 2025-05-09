
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { JobDetailsSubmission, PricingOptions } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';

export const useJobPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiateJobPayment = async (
    jobDetails: JobDetailsSubmission,
    pricingOptions?: PricingOptions
  ) => {
    setIsLoading(true);
    console.log("🔍 Job payment initiation started with options:", pricingOptions);
    
    try {
      // Handle free listings directly without going to Stripe
      if (pricingOptions?.selectedPricingTier === 'free') {
        console.log("Processing free job post...");
        
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType: 'job',
            postDetails: jobDetails,
            pricingOptions
          }
        });

        console.log("Free post response:", postData, "Error:", postError);

        if (postError) {
          console.error("Free post creation error:", postError);
          throw postError;
        }
        
        return { 
          success: true,
          redirect: `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`,
          data: postData
        };
      } 
      
      // For paid listings, create a Stripe checkout session
      console.log("Creating Stripe checkout for paid job listing...");

      // Create the request payload
      const payload = {
        postType: 'job',
        postDetails: jobDetails,
        pricingOptions
      };
      
      console.log("🚀 Calling create-checkout with payload:", JSON.stringify(payload, null, 2));
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: payload
      });

      console.log("📥 Stripe checkout full response:", data);
      
      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }
      
      if (!data) {
        console.error("No data returned from checkout");
        throw new Error('No data returned from payment service');
      }
      
      // Explicitly validate the URL
      if (!data.url) {
        console.error("⛔ No checkout URL received in response:", data);
        throw new Error('No checkout URL received from Stripe');
      }
      
      console.log("✅ Successfully received Stripe checkout URL:", data.url);
      
      // Return successful response with URL and data
      return { 
        success: true, 
        redirect: data.url,
        data: data,
        sessionId: data.session_id
      };
    } catch (error: any) {
      console.error('❌ Job payment initiation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { initiateJobPayment, isLoading };
};
