
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { JobPricingTier, PricingOptions } from "@/utils/posting/types";

interface JobPricingStepProps {
  onSubmit: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep: React.FC<JobPricingStepProps> = ({ onSubmit, isLoading = false }) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>("free");
  const [selectedDuration, setSelectedDuration] = useState<number>(1); // 1 month default
  const [autoRenew, setAutoRenew] = useState<boolean>(false);
  
  // Pricing details
  const pricingTiers = [
    {
      id: "free",
      name: "Basic Listing",
      price: 0,
      description: "Simple job post with limited visibility",
      features: ["7-day listing", "Standard search placement", "Basic job details"],
    },
    {
      id: "premium",
      name: "Premium",
      price: 59,
      description: "Enhanced visibility for faster hiring",
      features: ["Highlighted placement", "30-day listing", "Detailed job post", "Applicant tracking"]
    },
    {
      id: "diamond",
      name: "Diamond",
      price: 129,
      description: "Maximum exposure, elite placement",
      features: ["Featured placement", "60-day listing", "Nationwide boost", "Candidate prioritization", "Direct access to top talent"]
    }
  ];

  // Duration discounts
  const durationOptions = [
    { months: 1, label: "1 Month", vietnameseLabel: "1 Tháng", discount: 0 },
    { months: 3, label: "3 Months", vietnameseLabel: "3 Tháng", discount: 10 },
    { months: 6, label: "6 Months", vietnameseLabel: "6 Tháng", discount: 20 },
    { months: 12, label: "12 Months", vietnameseLabel: "12 Tháng", discount: 30 }
  ];

  // Handle tier selection
  const handleTierChange = (value: string) => {
    setSelectedTier(value as JobPricingTier);
  };

  // Handle duration selection
  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
  };

  // Calculate price with discount
  const calculatePrice = () => {
    const tier = pricingTiers.find(tier => tier.id === selectedTier);
    if (!tier || tier.price === 0) return 0;
    
    const durationOption = durationOptions.find(option => option.months === selectedDuration);
    const discount = durationOption?.discount || 0;
    
    const basePrice = tier.price * selectedDuration;
    const discountedPrice = basePrice * (1 - discount / 100);
    
    return discountedPrice;
  };

  // Handle form submission
  const handleSubmit = () => {
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths: selectedDuration,
      autoRenew: autoRenew,
      totalPrice: calculatePrice()
    };
    
    onSubmit(pricingOptions);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Select Your Posting Plan</h2>
        <p className="text-muted-foreground">Choose the best option for your hiring needs</p>
      </div>
      
      {/* Pricing tier selection */}
      <div className="space-y-4">
        <RadioGroup value={selectedTier} onValueChange={handleTierChange} className="grid gap-4 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Label
              key={tier.id}
              htmlFor={tier.id}
              className={`relative flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors ${
                selectedTier === tier.id ? "border-primary bg-accent/50" : "border-muted"
              }`}
            >
              <RadioGroupItem
                value={tier.id}
                id={tier.id}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div className="font-medium">{tier.name}</div>
                {selectedTier === tier.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="mt-2 text-lg font-bold">
                {tier.price > 0 ? `$${tier.price}/mo` : "Free"}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.id === "diamond" && (
                <Badge className="absolute top-2 right-2 bg-amber-500">Limited</Badge>
              )}
            </Label>
          ))}
        </RadioGroup>
      </div>

      {selectedTier !== "free" && (
        <>
          {/* Duration selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Duration</CardTitle>
              <CardDescription>Longer durations provide bigger discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {durationOptions.map((option) => (
                  <Button
                    key={option.months}
                    type="button"
                    variant={selectedDuration === option.months ? "default" : "outline"}
                    className="h-auto py-3 flex flex-col items-center justify-center relative"
                    onClick={() => handleDurationChange(option.months)}
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs mt-1">{option.vietnameseLabel}</span>
                    {option.discount > 0 && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 bg-green-100 text-green-800">
                        {option.discount}% off
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Auto-renewal option */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Auto-renew plan</h3>
              <p className="text-sm text-muted-foreground">Keep your listing active after expiration</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={setAutoRenew}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">We'll automatically renew your listing when it expires using your payment method on file.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </>
      )}

      {/* Price summary */}
      {selectedTier !== "free" && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan</span>
                <span>{pricingTiers.find(tier => tier.id === selectedTier)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{selectedDuration} {selectedDuration === 1 ? "month" : "months"}</span>
              </div>
              {durationOptions.find(option => option.months === selectedDuration)?.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>{durationOptions.find(option => option.months === selectedDuration)?.discount}%</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t font-bold">
                <span>Total</span>
                <span>${calculatePrice()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            {autoRenew ? "Plan will auto-renew at the end of the period" : "Plan will not auto-renew"}
          </CardFooter>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default JobPricingStep;
