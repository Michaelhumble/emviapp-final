
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { ListingPlan } from '@/components/posting/ListingPlanSelector';
import PricingCards from '@/components/posting/PricingCards';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { supabase } from '@/integrations/supabase/client';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';

const PostJobPricingPage: React.FC = () => {
  const [jobData, setJobData] = useState<JobDetailsSubmission | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<ListingPlan | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(1); // Default to 1 month
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Load job form data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem('jobPostFormData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setJobData(parsedData);
      } catch (error) {
        console.error("Error parsing job form data:", error);
        toast.error(t("Error loading form data", "Lỗi khi tải dữ liệu biểu mẫu"));
        navigate('/post-job/form');
      }
    } else {
      // If no form data found, redirect back to the form
      toast.error(t("Please fill out the job form first", "Vui lòng điền vào biểu mẫu công việc trước"));
      navigate('/post-job/form');
    }
  }, [navigate, t]);

  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
    
    // If a plan is already selected, update it with the new duration
    if (selectedPlan) {
      setSelectedPlan({
        ...selectedPlan,
        duration: months * 30 // Convert months to days
      });
    }
  };

  const handlePlanSelect = (planId: string) => {
    const selectedPlan = jobPricingOptions.find(plan => plan.id === planId);
    if (selectedPlan) {
      setSelectedPlan({
        ...selectedPlan,
        duration: selectedDuration * 30 // Convert months to days
      });
    }
  };

  const handleBack = () => {
    navigate('/post-job/form');
  };

  const handleContinue = async () => {
    if (!selectedPlan) {
      toast.error(t("Please select a plan to continue", "Vui lòng chọn một gói để tiếp tục"));
      return;
    }
    
    if (!jobData) {
      toast.error(t("Job data is missing", "Dữ liệu công việc bị thiếu"));
      navigate('/post-job/form');
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
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t("Choose Your Listing Plan", "Chọn Gói Đăng Tin")}
        </h1>

        <Card className="p-6">
          <div className="w-full max-w-6xl mx-auto">
            <PricingCards 
              pricingOptions={jobPricingOptions}
              selectedPricing={selectedPlan?.id || ''}
              onChange={handlePlanSelect}
              selectedDuration={selectedDuration}
              onDurationChange={handleDurationChange}
            />
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack}>
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
        </Card>
      </div>
    </Layout>
  );
};

export default PostJobPricingPage;
