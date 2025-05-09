
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
import { DurationOption } from '@/types/pricing';
import { AlertCircle } from 'lucide-react';

interface ReviewAndPaymentSectionProps {
  formData: any;
  postType: PostType;
  onNextStep?: () => void;
  onPrevStep?: () => void;
  isFirstPost?: boolean;
  pricingOptions?: PricingOptions;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  postType,
  onNextStep,
  onPrevStep,
  isFirstPost = false,
  pricingOptions = {}
}) => {
  const [activeTab, setActiveTab] = useState("review");
  const [selectedPricing, setSelectedPricing] = useState("standard");
  const [selectedDuration, setSelectedDuration] = useState(1); // Default to 1 month
  
  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
  };
  
  // Map job field mapping
  const jobFields = {
    title: "Job Title",
    location: "Location",
    employment_type: "Employment Type",
    description: "Job Description",
    requirements: "Requirements",
    compensation_details: "Compensation Details",
    compensation_type: "Compensation Type",
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

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="review" className="space-y-6 pt-4">
          <h3 className="text-lg font-medium">Review your submission</h3>
          
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
              Edit Information
            </Button>
            <Button onClick={() => setActiveTab("payment")}>
              Continue to Payment
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select a Plan</CardTitle>
                  <CardDescription>
                    Choose the listing option that works best for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PricingCards 
                    pricingOptions={jobPricingOptions}
                    selectedPricing={selectedPricing}
                    onChange={setSelectedPricing}
                    selectedDuration={selectedDuration}
                    onDurationChange={handleDurationChange}
                  />
                </CardContent>
              </Card>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  🕒 All listings expire after 30 days. Auto-renew saves up to {selectedDuration >= 12 ? "30" : selectedDuration >= 6 ? "20" : selectedDuration >= 3 ? "10" : "0"}%.
                </AlertDescription>
              </Alert>
            </div>
            
            <div>
              <PaymentSummary 
                postType={postType}
                pricingOptions={{
                  ...pricingOptions,
                  isFirstPost: isFirstPost
                }}
              />
              
              <Button className="w-full mt-4">
                Continue to Checkout
              </Button>
              
              <div className="mt-6 pt-4 text-center text-sm text-muted-foreground border-t">
                <p>Need help? <a href="#" className="text-primary underline">Contact support</a></p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewAndPaymentSection;
