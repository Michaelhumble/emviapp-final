import React from 'react';
import { Job } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PricingDisplay from '@/components/posting/PricingDisplay';
import SmartAdOptions from '@/components/posting/SmartAdOptions';

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
      
      <SmartAdOptions />
      
      <PricingDisplay />
    </div>
  );
};

export default ReviewAndPaymentSection;
