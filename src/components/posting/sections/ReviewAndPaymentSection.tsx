
import React from 'react';
import { Job } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PricingDisplay from '@/components/posting/PricingDisplay';
import SmartAdOptions from '@/components/posting/SmartAdOptions';
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PricingOptions } from '@/utils/posting/types';
import { generatePromotionalText } from '@/utils/posting/promotionalText';

interface ReviewAndPaymentSectionProps {
  details: Partial<Job>;
  isNationwide: boolean;
  setIsNationwide: (value: boolean) => void;
}

const ReviewAndPaymentSection = ({ 
  details,
  isNationwide,
  setIsNationwide
}: ReviewAndPaymentSectionProps) => {
  // Define default pricing options
  const pricingOptions: PricingOptions = {
    isNationwide,
    isFirstPost: true,  // This could be dynamic based on user history
    showAtTop: false,
    fastSalePackage: false,
    isRenewal: false
  };

  // Mock price - in a real app this would be calculated based on options
  const price = isNationwide ? 10 : 5;
  
  // Mock user stats for promotional text
  const mockUserStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    totalSupplyPosts: 0,
    referralCount: 0
  };

  // Generate promotional text
  const promotionalText = generatePromotionalText('job', mockUserStats, pricingOptions);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review & Payment</h2>
      <p className="text-muted-foreground">Review your job details before posting</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Job Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Job Title</p>
              <p className="text-muted-foreground">{details.title || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-muted-foreground">{details.location || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Employment Type</p>
              <p className="text-muted-foreground">{details.employment_type || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Compensation</p>
              <p className="text-muted-foreground">{details.compensation_details || "Not specified"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium">Description</p>
            <p className="text-muted-foreground line-clamp-3">{details.description || "Not provided"}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium">Requirements</p>
            <p className="text-muted-foreground line-clamp-3">{details.requirements || "Not provided"}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium">Contact</p>
            <p className="text-muted-foreground">{details.contact_info?.owner_name || "Not provided"} - {details.contact_info?.phone || "No phone"}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
        <Label htmlFor="nationwide" className="cursor-pointer">
          <div className="font-medium">Nationwide Listing</div>
          <p className="text-sm text-muted-foreground">Make your job visible across all locations</p>
        </Label>
        <Switch
          id="nationwide"
          checked={isNationwide}
          onCheckedChange={setIsNationwide}
        />
      </div>
      
      <SmartAdOptions 
        postType="job" 
        isFirstPost={true}
        onNationwideChange={setIsNationwide}
      />
      
      <PricingDisplay 
        postType="job" 
        price={price} 
        options={pricingOptions}
        promotionalText={promotionalText}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
