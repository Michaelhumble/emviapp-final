
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { SalonPricingOptions, SALON_PRICING_PLANS } from "@/utils/posting/salonPricing";

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
  pricingOptions: SalonPricingOptions;
  onPricingChange: (options: SalonPricingOptions) => void;
}

export const SalonPricingStep = ({ 
  form, 
  pricingOptions, 
  onPricingChange 
}: SalonPricingStepProps) => {
  const handlePlanSelect = (tier: string) => {
    onPricingChange({
      ...pricingOptions,
      selectedPricingTier: tier as any
    });
  };

  const handleFeaturedToggle = () => {
    onPricingChange({
      ...pricingOptions,
      featuredAddon: !pricingOptions.featuredAddon
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h3>
        <p className="text-gray-600">
          Select how long you want your salon listing to be active
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SALON_PRICING_PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`cursor-pointer transition-all border-2 ${
              pricingOptions.selectedPricingTier === plan.tier
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => handlePlanSelect(plan.tier)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-2xl font-bold text-purple-600">
                ${plan.price}
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>VIP Featured Listing Add-on</span>
            <Badge variant="secondary">+$10</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Get 5x more visibility with premium placement
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Top of search results</li>
                <li>• Featured badge on your listing</li>
                <li>• Priority in recommendations</li>
              </ul>
            </div>
            <Button
              type="button"
              variant={pricingOptions.featuredAddon ? "default" : "outline"}
              onClick={handleFeaturedToggle}
            >
              {pricingOptions.featuredAddon ? "Added" : "Add"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPricingStep;
