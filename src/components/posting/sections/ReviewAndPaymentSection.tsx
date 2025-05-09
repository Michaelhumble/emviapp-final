
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PricingOptions, PostType } from "@/utils/posting/types";
import { Job } from "@/types/job";
import { jobPricingOptions } from "@/utils/posting/jobPricing";
import PricingDisplay from "@/components/posting/PricingDisplay";
import PaymentSummary from "@/components/posting/PaymentSummary";
import PricingCards from "@/components/posting/PricingCards";
import { AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ReviewAndPaymentSectionProps {
  formData: any;
  postType: PostType;
  onNextStep?: () => void;
  onPrevStep?: () => void;
  isFirstPost?: boolean;
  pricingOptions?: PricingOptions;
  onPricingChange?: (pricingId: string) => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  postType,
  onNextStep,
  onPrevStep,
  isFirstPost = false,
  pricingOptions = {},
  onPricingChange
}) => {
  const { t, isVietnamese } = useTranslation();
  
  const [activeTab, setActiveTab] = useState("review");
  const [selectedPricing, setSelectedPricing] = useState(pricingOptions?.selectedPricingTier || "standard");
  const [selectedDuration, setSelectedDuration] = useState(1); // Default to 1 month
  
  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
  };
  
  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
    if (onPricingChange) {
      onPricingChange(pricingId);
    }
  };
  
  // Map job field mapping
  const jobFields = {
    title: t("Job Title", "Chức danh"),
    location: t("Location", "Địa điểm"),
    employment_type: t("Employment Type", "Loại việc làm"),
    description: t("Job Description", "Mô tả công việc"),
    requirements: t("Requirements", "Yêu cầu"),
    compensation_details: t("Compensation Details", "Chi tiết lương"),
    compensation_type: t("Compensation Type", "Hình thức trả lương"),
  };

  // Format data for the summary
  const formatData = () => {
    if (postType === 'job') {
      // Format job data
      return Object.entries(formData)
        .filter(([key]) => key in jobFields && formData[key])
        .map(([key, value]) => ({
          label: jobFields[key as keyof typeof jobFields],
          value: Array.isArray(value) ? (value as string[]).join(", ") : value as string
        }));
    }
    
    // Default empty format
    return [];
  };

  const formattedData = formatData();
  
  // Get the selected pricing option details
  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="review">{t("Review", "Xem lại")}</TabsTrigger>
          <TabsTrigger value="payment">{t("Payment", "Thanh toán")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="review" className="space-y-6 pt-4">
          <h3 className="text-lg font-medium">{t("Review your submission", "Xem lại thông tin")}</h3>
          
          <div className="space-y-4">
            {formattedData.map((item, i) => (
              <div key={i} className="border-b pb-3">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button variant="outline" className="mr-2" onClick={onPrevStep}>
              {t("Edit Information", "Sửa thông tin")}
            </Button>
            <Button onClick={() => setActiveTab("payment")}>
              {t("Continue to Payment", "Tiếp tục thanh toán")}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("Select a Plan", "Chọn gói")}</CardTitle>
                <CardDescription>
                  {t("Choose the listing option that works best for you", "Chọn lựa chọn đăng tin phù hợp nhất với bạn")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PricingCards 
                  pricingOptions={jobPricingOptions}
                  selectedPricing={selectedPricing}
                  onChange={handlePricingChange}
                  selectedDuration={selectedDuration}
                  onDurationChange={handleDurationChange}
                />
              </CardContent>
            </Card>
            
            {selectedPricingOption && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("Your Selection", "Lựa chọn của bạn")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PricingDisplay 
                    postType="job" 
                    price={selectedPricingOption.price}
                    options={{...pricingOptions, selectedPricingTier: selectedPricing}}
                    originalPrice={selectedPricingOption.wasPrice}
                    duration={selectedDuration}
                    discountPercentage={selectedDuration === 3 ? 15 : selectedDuration === 6 ? 25 : 0}
                    promotionalText={t(
                      "This plan includes all you need to reach the right candidates quickly.",
                      "Gói này bao gồm tất cả những gì bạn cần để tiếp cận ứng viên phù hợp một cách nhanh chóng."
                    )}
                  />
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-end">
              <Button className="px-8" onClick={onNextStep}>
                {t("Continue to Checkout", "Tiếp tục thanh toán")}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewAndPaymentSection;
