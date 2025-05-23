
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePricing } from "@/context/pricing/PricingProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Check, Star, ShieldCheck, Zap } from "lucide-react";
import { jobPricingOptions } from "@/utils/posting";
import { useTranslation } from "@/hooks/useTranslation";
import { JobPricingTier } from "@/utils/posting/types";

interface JobPricingStepProps {
  onSubmit: (pricingOptions: any) => void;
  isLoading?: boolean;
}

const JobPricingStep: React.FC<JobPricingStepProps> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslation();
  const { pricingOptions, setPricingOptions, priceData } = usePricing();
  
  // Duration options for the job posting
  const durationOptions = [
    { value: 1, label: "1 month" },
    { value: 3, label: "3 months (10% discount)" },
    { value: 6, label: "6 months (15% discount)" },
    { value: 12, label: "12 months (20% discount)" }
  ];

  // Handle pricing tier selection
  const handleTierSelect = (tier: JobPricingTier) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier
    });
  };

  // Handle duration selection
  const handleDurationChange = (duration: string) => {
    setPricingOptions({
      ...pricingOptions,
      durationMonths: parseInt(duration)
    });
  };

  // Handle auto-renew toggle
  const handleAutoRenewToggle = (checked: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      autoRenew: checked
    });
  };

  // Handle nationwide toggle
  const handleNationwideToggle = (checked: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      isNationwide: checked
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(pricingOptions);
  };
  
  // Filter visible pricing options (hide any that have hidden=true)
  const visiblePricingOptions = jobPricingOptions.filter(option => !option.hidden);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Select Your Pricing Plan</h2>
        <p className="text-muted-foreground">
          Choose the plan that fits your needs. All plans include our quality service.
        </p>
      </div>

      <RadioGroup 
        value={pricingOptions.selectedPricingTier} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onValueChange={(value) => handleTierSelect(value as JobPricingTier)}
      >
        {visiblePricingOptions.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.tier}
              id={option.id}
              className="sr-only"
            />
            <Label
              htmlFor={option.id}
              className="cursor-pointer"
            >
              <Card className={`h-full transition-all ${pricingOptions.selectedPricingTier === option.tier 
                ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                : 'border-border hover:border-primary/50'}`}
              >
                {option.recommended && (
                  <div className="absolute -top-3 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {option.tier === 'premium' && <Star className="h-5 w-5 mr-1 text-yellow-500 fill-yellow-500" />}
                        {option.tier === 'standard' && <ShieldCheck className="h-5 w-5 mr-1 text-blue-500" />}
                        {option.tier === 'gold' && <Zap className="h-5 w-5 mr-1 text-amber-500" />}
                        {option.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {option.description}
                      </CardDescription>
                    </div>
                    {pricingOptions.selectedPricingTier === option.tier && (
                      <div className="bg-primary/10 p-1 rounded-full">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold">
                      ${option.price.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground ml-1 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {option.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={pricingOptions.selectedPricingTier === option.tier ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleTierSelect(option.tier)}
                  >
                    {pricingOptions.selectedPricingTier === option.tier ? "Selected" : "Select"}
                  </Button>
                </CardFooter>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Posting Options</CardTitle>
          <CardDescription>Configure your posting duration and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Duration selection */}
          <div className="space-y-2">
            <Label htmlFor="duration">Posting Duration</Label>
            <Select 
              value={pricingOptions.durationMonths.toString()}
              onValueChange={handleDurationChange}
            >
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="auto-renew" 
                checked={pricingOptions.autoRenew}
                onCheckedChange={handleAutoRenewToggle}
              />
              <div>
                <Label htmlFor="auto-renew">Auto-renew my posting</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically renew this posting when it expires
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nationwide" 
                checked={pricingOptions.isNationwide}
                onCheckedChange={handleNationwideToggle}
              />
              <div>
                <Label htmlFor="nationwide">Nationwide listing (+$5)</Label>
                <p className="text-sm text-muted-foreground">
                  Show your post to candidates across the entire country
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full border-t pt-4 mb-4">
            <div className="flex justify-between">
              <span className="font-medium">Original Price:</span>
              <span>${priceData.originalPrice.toFixed(2)}</span>
            </div>
            {priceData.discountPercentage > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{priceData.discountLabel}:</span>
                <span>-${priceData.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mt-2 text-lg font-bold">
              <span>Total:</span>
              <span>${priceData.finalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Continue to Payment${priceData.finalPrice <= 0 ? ' (Free)' : ''}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobPricingStep;
