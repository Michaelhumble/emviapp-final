
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ListingPlanSelector, { ListingPlan } from './ListingPlanSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';

interface JobPostPaymentFlowProps {
  jobData: JobDetailsSubmission;
  onBack: () => void;
}

const JobPostPaymentFlow: React.FC<JobPostPaymentFlowProps> = ({ jobData, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<ListingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectPlan = (plan: ListingPlan) => {
    setSelectedPlan(plan);
    console.log("Selected plan:", plan);
  };

  const handleContinue = async () => {
    if (!selectedPlan) {
      toast.error(t("Please select a plan to continue", "Vui lòng chọn một gói để tiếp tục"));
      return;
    }

    setIsLoading(true);

    try {
      console.log("Proceeding with plan:", selectedPlan.id);
      
      // Calculate the final price with duration discounts
      const durationMonths = selectedPlan.duration / 30; // Convert days to months
      const { finalPrice } = calculateFinalPrice(
        selectedPlan.price,
        durationMonths,
        selectedPlan.id,
        false // No auto renewal for now
      );
      
      console.log("Final price calculated:", finalPrice);
      
      // For free plans, we don't need to create a checkout session
      if (selectedPlan.price === 0) {
        console.log("Free plan selected, creating job post directly");
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType: 'job',
            postDetails: jobData,
            pricingOptions: {
              selectedPricingTier: selectedPlan.id,
              durationMonths: durationMonths,
              autoRenew: false
            }
          }
        });

        if (error) {
          console.error("Error creating free job post:", error);
          throw error;
        }

        console.log("Free job post created:", data);
        navigate(`/post-success?free=true&post_id=${data.post_id}`);
        return;
      }

      // For paid plans, create a checkout session
      console.log("Creating checkout for paid plan");
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType: 'job', 
          postDetails: jobData,
          pricingOptions: {
            selectedPricingTier: selectedPlan.id,
            durationMonths: durationMonths,
            autoRenew: false
          },
          pricing: {
            tier: selectedPlan.id,
            amountInCents: Math.round(finalPrice * 100),
            mode: 'payment',
            durationMonths: durationMonths,
            autoRenew: false,
            basePrice: selectedPlan.price
          }
        }
      });

      if (error) {
        console.error("Error creating checkout:", error);
        throw error;
      }

      if (!data?.url) {
        console.error("No checkout URL received:", data);
        throw new Error("No checkout URL received");
      }

      console.log("Redirecting to checkout:", data.url);
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Payment flow error:", error);
      toast.error(t(
        "Failed to process your request",
        "Không thể xử lý yêu cầu của bạn"
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <ListingPlanSelector 
        onSelectPlan={handleSelectPlan} 
        selectedPlanId={selectedPlan?.id}
      />
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          {t("Back", "Quay lại")}
        </Button>
        
        <Button 
          onClick={handleContinue} 
          disabled={!selectedPlan || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("Processing...", "Đang xử lý...")}
            </>
          ) : (
            selectedPlan?.price === 0 
              ? t("Complete Free Listing", "Hoàn thành đăng tin miễn phí")
              : t("Proceed to Payment", "Tiến hành thanh toán")
          )}
        </Button>
      </div>
    </div>
  );
};

export default JobPostPaymentFlow;
